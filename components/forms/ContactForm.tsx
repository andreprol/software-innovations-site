"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { validateContactPayload } from "@/lib/contact/validate";
import type { ContactPayload } from "@/lib/contact/types";

type Status = "idle" | "sending" | "sent" | "error";

type FormFields = {
  name: string;
  email: string;
  phone: string;
  message: string;
  consent: boolean;
};

const initialFields: FormFields = {
  name: "",
  email: "",
  phone: "",
  message: "",
  consent: false,
};

const GENERIC_ERROR_MESSAGE =
  "Erro ao enviar, tente de novo ou chame no WhatsApp.";

export default function ContactForm() {
  const [fields, setFields] = useState<FormFields>(initialFields);
  const [errors, setErrors] = useState<
    Partial<Record<keyof ContactPayload, string>>
  >({});
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string>(
    GENERIC_ERROR_MESSAGE,
  );

  function updateField<K extends keyof FormFields>(
    field: K,
    value: FormFields[K],
  ) {
    setFields((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const payload: unknown = {
      name: fields.name,
      email: fields.email,
      phone: fields.phone || undefined,
      message: fields.message,
      consent: fields.consent,
    };

    const result = validateContactPayload(payload);

    if (!result.ok) {
      setErrors(result.errors);
      setStatus("error");
      setErrorMessage(
        "Revise os campos destacados antes de enviar.",
      );
      return;
    }

    setErrors({});
    setStatus("sending");

    try {
      const response = await fetch("/api/contato", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });

      if (!response.ok) {
        // A API já sanitiza a mensagem de erro antes de responder (ver
        // app/api/contato/route.ts) — mas exibimos sempre esta mensagem fixa,
        // não o texto bruto do servidor, para nunca depender do conteúdo
        // exato de uma resposta de terceiro.
        setErrorMessage(GENERIC_ERROR_MESSAGE);
        setStatus("error");
        return;
      }

      setStatus("sent");
    } catch {
      setErrorMessage(GENERIC_ERROR_MESSAGE);
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div
        role="status"
        className="rounded-2xl border border-emerald-300 bg-emerald-50 p-6 text-emerald-800 dark:border-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300"
      >
        <p className="text-lg font-semibold">Mensagem enviada</p>
        <p className="mt-1 text-sm">
          Obrigado pelo contato. Em breve retornaremos.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
      {status === "error" && (
        <p
          role="alert"
          className="rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-950/40 dark:text-red-300"
        >
          {errorMessage}
        </p>
      )}

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="contact-name"
          className="text-sm font-medium text-zinc-800 dark:text-zinc-200"
        >
          Nome
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          value={fields.name}
          onChange={(event) => updateField("name", event.target.value)}
          className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-zinc-900 outline-none focus:border-purple-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
        />
        {errors.name && (
          <p className="text-sm text-red-600 dark:text-red-400">
            {errors.name}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="contact-email"
          className="text-sm font-medium text-zinc-800 dark:text-zinc-200"
        >
          E-mail
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          value={fields.email}
          onChange={(event) => updateField("email", event.target.value)}
          className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-zinc-900 outline-none focus:border-purple-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
        />
        {errors.email && (
          <p className="text-sm text-red-600 dark:text-red-400">
            {errors.email}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="contact-phone"
          className="text-sm font-medium text-zinc-800 dark:text-zinc-200"
        >
          Telefone (opcional)
        </label>
        <input
          id="contact-phone"
          name="phone"
          type="tel"
          value={fields.phone}
          onChange={(event) => updateField("phone", event.target.value)}
          className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-zinc-900 outline-none focus:border-purple-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
        />
        {errors.phone && (
          <p className="text-sm text-red-600 dark:text-red-400">
            {errors.phone}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="contact-message"
          className="text-sm font-medium text-zinc-800 dark:text-zinc-200"
        >
          Mensagem
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          value={fields.message}
          onChange={(event) => updateField("message", event.target.value)}
          className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-zinc-900 outline-none focus:border-purple-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
        />
        {errors.message && (
          <p className="text-sm text-red-600 dark:text-red-400">
            {errors.message}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <div className="flex items-start gap-2">
          <input
            id="contact-consent"
            name="consent"
            type="checkbox"
            checked={fields.consent}
            onChange={(event) =>
              updateField("consent", event.target.checked)
            }
            className="mt-1 h-4 w-4 shrink-0 rounded border-zinc-300 text-purple-600 focus:ring-purple-500 dark:border-zinc-700"
          />
          <label
            htmlFor="contact-consent"
            className="text-sm text-zinc-700 dark:text-zinc-300"
          >
            Concordo com a{" "}
            <Link
              href="/privacidade"
              className="font-medium text-purple-600 underline hover:text-purple-700 dark:text-cyan-400 dark:hover:text-cyan-300"
            >
              Política de Privacidade
            </Link>
          </label>
        </div>
        {errors.consent && (
          <p className="text-sm text-red-600 dark:text-red-400">
            {errors.consent}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {status === "sending" ? "Enviando…" : "Enviar"}
      </button>
    </form>
  );
}
