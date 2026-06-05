import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { JsonLd } from "@/components/JsonLd";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.sumsa.com.ar";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "64x64", type: "image/png" },
    ],
    apple: "/images/logo_blanco.png",
  },
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
    images: [
      {
        url: `${siteUrl}/images/logo_blanco.png`,
        width: 1200,
        height: 630,
        alt: "SUM Servicios de Emergencia Médica",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SUM | Servicios de Emergencia Médica",
    description:
      "Servicios de emergencia médica premium en La Plata. Atención inmediata las 24 hs.",
    images: [`${siteUrl}/images/logo_blanco.png`],
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalOrganization",
    name: "SUM S.A.",
    alternateName: "SUM Servicios de Urgencias Médicas",
    url: siteUrl,
    logo: `${siteUrl}/images/logo_blanco.png`,
    telephone: ["(0221) 421-1226", "(0221) 421-2234"],
    email: "info@sumsa.com.ar",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Plaza Italia 183",
      addressLocality: "La Plata",
      addressRegion: "Buenos Aires",
      addressCountry: "AR",
    },
    areaServed: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: -34.9211,
        longitude: -57.9544,
      },
      geoRadius: "100000",
    },
    openingHours: "Mo-Su 00:00-24:00",
    sameAs: [
      "https://www.facebook.com/sumsaargentina",
      "https://www.instagram.com/sumsaargentina",
    ],
  };

  return (
    <html lang="es" className="scroll-smooth">
      <body
        suppressHydrationWarning
        className={`${inter.variable} ${poppins.variable} antialiased selection:bg-primary selection:text-white`}
      >
        <JsonLd data={organizationSchema} />
        <div className="flex min-h-screen flex-col">
          {children}
        </div>
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
