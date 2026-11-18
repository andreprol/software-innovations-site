import { ImageResponse } from "next/og";
import { company } from "@/lib/content/company";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${company.tradeName} — Desenvolvimento de Software sob Medida`;

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#09090b",
          backgroundImage: "linear-gradient(135deg, #9333ea 0%, #06b6d4 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 76,
            fontWeight: 700,
            color: "#ffffff",
            letterSpacing: "-0.02em",
          }}
        >
          {company.tradeName}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 28,
            fontSize: 30,
            color: "rgba(255, 255, 255, 0.85)",
          }}
        >
          Desenvolvimento de Software sob Medida
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
