import Link from "next/link";
import { cacheLife } from "next/cache";
import { company } from "@/lib/content/company";

function buildWhatsAppLink(whatsapp: string): string {
  const digits = whatsapp.replace(/\D/g, "");
  return `https://wa.me/${digits}`;
}

async function getCurrentYear(): Promise<number> {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}

export default async function Footer() {
  const year = await getCurrentYear();

  return (
    <footer className="border-t border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <div className="h-0.5 w-full bg-gradient-to-r from-purple-600 via-fuchsia-500 to-cyan-400" />

      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-10 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="bg-gradient-to-r from-purple-600 to-cyan-500 bg-clip-text text-lg font-bold tracking-tight text-transparent">
            {company.tradeName}
          </p>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            {company.city} - {company.state}
          </p>
        </div>

        <ul className="flex flex-col gap-2 text-sm text-zinc-600 dark:text-zinc-400">
          <li>
            <a
              href={buildWhatsAppLink(company.whatsapp)}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-purple-600 dark:hover:text-cyan-400"
            >
              WhatsApp: {company.whatsapp}
            </a>
          </li>
          <li>
            <a
              href={`mailto:${company.email}`}
              className="hover:text-purple-600 dark:hover:text-cyan-400"
            >
              {company.email}
            </a>
          </li>
          <li>
            <Link
              href="/privacidade"
              className="hover:text-purple-600 dark:hover:text-cyan-400"
            >
              Política de Privacidade
            </Link>
          </li>
        </ul>
      </div>

      <div className="border-t border-zinc-200 px-6 py-4 text-center text-xs text-zinc-500 dark:border-zinc-800 dark:text-zinc-500">
        © {year} {company.legalName}. Todos os direitos reservados.
      </div>
    </footer>
  );
}
