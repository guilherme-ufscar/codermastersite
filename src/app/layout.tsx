import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import WhatsAppButton from "@/components/ui/WhatsAppButton";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Coder Master - Criação de Sites, Sistemas e Aplicativos",
    template: "%s | Coder Master",
  },
  description:
    "Criação de sites profissionais, sistemas web, aplicativos, hospedagem e marketing digital. Transforme sua ideia em realidade digital com a Coder Master.",
  keywords: [
    "criação de sites",
    "desenvolvimento web",
    "sistemas",
    "aplicativos",
    "hospedagem",
    "marketing digital",
    "loja virtual",
    "site institucional",
  ],
  authors: [{ name: "Coder Master" }],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Coder Master",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
