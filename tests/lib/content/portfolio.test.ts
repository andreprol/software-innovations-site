import { describe, it, expect } from 'vitest'
import { portfolioItems } from '@/lib/content/portfolio'
import { serviceCategories } from '@/lib/content/services'

describe('portfolioItems', () => {
  it('every item has a non-empty name and description', () => {
    portfolioItems.forEach(item => {
      expect(item.name.length).toBeGreaterThan(0)
      expect(item.description.length).toBeGreaterThan(0)
    })
  })

  it('every item.url, when present, is a valid https URL', () => {
    portfolioItems.forEach(item => {
      if (item.url !== undefined) {
        expect(() => new URL(item.url!)).not.toThrow()
        expect(item.url!.startsWith('https://')).toBe(true)
      }
    })
  })

  it('every item.categorySlug matches a real service category', () => {
    const validSlugs = serviceCategories.map(c => c.slug)
    portfolioItems.forEach(item => {
      expect(validSlugs).toContain(item.categorySlug)
    })
  })
})
