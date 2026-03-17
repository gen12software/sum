import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SUM | Servicios de Emergencia Médica",
  description: "Servicios de emergencia premium y gestión autónoma para afiliados. Tu salud, nuestra prioridad.",
};

import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body
        className={`${inter.variable} ${outfit.variable} antialiased selection:bg-primary selection:text-white`}
      >
        <div className="flex min-h-screen flex-col">
          {children}
        </div>
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
