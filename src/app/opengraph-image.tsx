import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";

import { EMERGENCY_PHONES_DISPLAY } from "@/lib/contact";

export const alt = "SUM Servicios de Emergencia Médica";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  const logoData = readFileSync(join(process.cwd(), "public/images/nuevoLogoBlanco.png"));
  const logoSrc = `data:image/png;base64,${logoData.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          background: "#004d8a",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Background blobs */}
        <div
          style={{
            position: "absolute",
            top: -120,
            right: -120,
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: "rgba(0,100,180,0.35)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -100,
            left: -100,
            width: 420,
            height: 420,
            borderRadius: "50%",
            background: "rgba(0,100,180,0.25)",
          }}
        />

        {/* Logo */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logoSrc}
          alt="SUM"
          style={{ width: 420, height: "auto", marginBottom: 36, objectFit: "contain" }}
        />

        {/* Tagline */}
        <div
          style={{
            fontSize: 26,
            color: "rgba(255,255,255,0.75)",
            fontWeight: 600,
            letterSpacing: "3px",
            textTransform: "uppercase",
            marginBottom: 32,
          }}
        >
          Servicios de Urgencias Médicas
        </div>

        {/* Divider */}
        <div
          style={{
            width: 80,
            height: 3,
            background: "#3399ff",
            borderRadius: 2,
            marginBottom: 32,
          }}
        />

        {/* Info */}
        <div style={{ fontSize: 28, color: "white", fontWeight: 700 }}>
          {EMERGENCY_PHONES_DISPLAY}
        </div>
        <div style={{ fontSize: 18, color: "rgba(255,255,255,0.5)", marginTop: 12 }}>
          La Plata, Buenos Aires · Emergencias 24H
        </div>
      </div>
    ),
    { ...size }
  );
}
