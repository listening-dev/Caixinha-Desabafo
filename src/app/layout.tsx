import type { Metadata } from "next";
import { Roboto_Mono } from "next/font/google";
import "./globals.css";

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Caixinha do Desabafo | Anônimo",
  description: "Canal seguro para feedback e sugestões anônimas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${robotoMono.variable} antialiased bg-brand-bg text-slate-900 font-mono selection:bg-brand-yellow selection:text-brand-orange`}
      >
        {children}
      </body>
    </html>
  );
}
