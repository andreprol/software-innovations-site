import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { appName } from "@/lib/env";
import { company } from "@/lib/content/company";
import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const siteUrl = "https://softwareinovations.com.br";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: appName,
    template: `%s | ${appName}`,
  },
  description: company.mission,
  openGraph: {
    siteName: appName,
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
