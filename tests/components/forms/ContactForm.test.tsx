import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import ContactForm from '@/components/forms/ContactForm'

describe('ContactForm', () => {
  beforeEach(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- mock de fetch, tipagem completa não vale a pena aqui
    global.fetch = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ ok: true }) }) as any
  })

  it('does not call fetch when the LGPD checkbox is unchecked', () => {
    render(<ContactForm />)
    fireEvent.change(screen.getByLabelText(/nome/i), { target: { value: 'Fulano' } })
    fireEvent.change(screen.getByLabelText(/e-mail/i), { target: { value: 'f@example.com' } })
    fireEvent.change(screen.getByLabelText(/mensagem/i), { target: { value: 'Oi' } })
    fireEvent.click(screen.getByRole('button', { name: /enviar/i }))
    expect(global.fetch).not.toHaveBeenCalled()
  })

  it('calls fetch when the form is fully valid and consent is checked', async () => {
    render(<ContactForm />)
    fireEvent.change(screen.getByLabelText(/nome/i), { target: { value: 'Fulano' } })
    fireEvent.change(screen.getByLabelText(/e-mail/i), { target: { value: 'f@example.com' } })
    fireEvent.change(screen.getByLabelText(/mensagem/i), { target: { value: 'Oi' } })
    fireEvent.click(screen.getByLabelText(/concordo/i))
    fireEvent.click(screen.getByRole('button', { name: /enviar/i }))
    await screen.findByText(/enviad/i)
    expect(global.fetch).toHaveBeenCalledWith('/api/contato', expect.objectContaining({ method: 'POST' }))
  })

  it('shows an error message, not a success message, when fetch fails', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- mock de fetch, tipagem completa não vale a pena aqui
    global.fetch = vi.fn().mockResolvedValue({ ok: false, json: async () => ({ error: 'fail' }) }) as any
    render(<ContactForm />)
    fireEvent.change(screen.getByLabelText(/nome/i), { target: { value: 'Fulano' } })
    fireEvent.change(screen.getByLabelText(/e-mail/i), { target: { value: 'f@example.com' } })
    fireEvent.change(screen.getByLabelText(/mensagem/i), { target: { value: 'Oi' } })
    fireEvent.click(screen.getByLabelText(/concordo/i))
    fireEvent.click(screen.getByRole('button', { name: /enviar/i }))
    await screen.findByText(/erro/i)
  })
})
