import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.sumsa.com.ar";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "SUM | Servicios de Emergencia Médica",
    template: "%s | SUM",
  },
  description:
    "Servicios de emergencia médica premium en La Plata. Atención inmediata las 24 hs, gestión autónoma para afiliados y planes de salud para toda la familia.",
  keywords: [
    "emergencia médica",
    "urgencias médicas",
    "La Plata",
    "ambulancia",
    "servicio médico",
    "SUM",
    "salud",
    "afiliados",
  ],
  authors: [{ name: "SUM S.A." }],
  creator: "SUM S.A.",
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: siteUrl,
    siteName: "SUM Servicios de Emergencia Médica",
    title: "SUM | Servicios de Emergencia Médica",
    description:
      "Servicios de emergencia médica premium en La Plata. Atención inmediata las 24 hs, gestión autónoma para afiliados.",
  },
  twitter: {
    card: "summary_large_image",
    title: "SUM | Servicios de Emergencia Médica",
    description:
      "Servicios de emergencia médica premium en La Plata. Atención inmediata las 24 hs.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  icons: {
    icon: "/images/logo_celeste.png",
    shortcut: "/images/logo_celeste.png",
    apple: "/images/logo_celeste.png",
  },
};

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
