import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "SUM Servicios de Emergencia Médica";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#003366",
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
        {/* Accent blob */}
        <div
          style={{
            position: "absolute",
            top: -100,
            right: -100,
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: "rgba(0,85,164,0.4)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -80,
            left: -80,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "rgba(0,85,164,0.3)",
          }}
        />

        {/* Logo text */}
        <div
          style={{
            fontSize: 100,
            fontWeight: 900,
            color: "white",
            letterSpacing: "-4px",
            marginBottom: 16,
          }}
        >
          SUM
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 28,
            color: "rgba(255,255,255,0.7)",
            fontWeight: 600,
            letterSpacing: "2px",
            textTransform: "uppercase",
            marginBottom: 40,
          }}
        >
          Servicios de Urgencias Médicas
        </div>

        {/* Divider */}
        <div
          style={{
            width: 80,
            height: 4,
            background: "#0055a4",
            borderRadius: 2,
            marginBottom: 40,
          }}
        />

        {/* Phone */}
        <div
          style={{
            fontSize: 32,
            color: "white",
            fontWeight: 700,
          }}
        >
          (0221) 421-1226 / 421-2234
        </div>

        <div
          style={{
            fontSize: 18,
            color: "rgba(255,255,255,0.5)",
            marginTop: 12,
          }}
        >
          La Plata, Buenos Aires · Emergencias 24H
        </div>
      </div>
    ),
    { ...size }
  );
}
