import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const alt = "Sarmadax — We Build Digital Products That Scale";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const runtime = "nodejs";

export default async function OGImage() {
  const wordmark = await readFile(
    path.join(process.cwd(), "public", "images", "logo", "wordmark.png"),
  );
  const wordmarkSrc = `data:image/png;base64,${wordmark.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "60px 70px",
          gap: 40,
          background:
            "linear-gradient(135deg, #050a0f 0%, #0a1118 60%, #0d1520 100%)",
          position: "relative",
          justifyContent: "space-between",
        }}
      >
        {/* Glow blobs */}
        <div
          style={{
            position: "absolute",
            top: -120,
            right: -80,
            width: 500,
            height: 500,
            borderRadius: "50%",
            background:
              "radial-gradient(circle,rgba(14,165,233,0.18),transparent 70%)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -120,
            left: 200,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background:
              "radial-gradient(circle,rgba(20,184,166,0.15),transparent 70%)",
            display: "flex",
          }}
        />

        {/* Logo row */}
        <div style={{ display: "flex", alignItems: "center", position: "relative" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={wordmarkSrc} alt="Sarmadax" style={{ height: 46, width: "auto" }} />
        </div>

        {/* Main content */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24, position: "relative" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(14,165,233,0.12)",
              border: "1px solid rgba(14,165,233,0.25)",
              borderRadius: 100,
              padding: "8px 20px",
              alignSelf: "flex-start",
            }}
          >
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#34d399" }} />
            <div style={{ color: "#0ea5e9", fontSize: 15, fontWeight: 500, fontFamily: "sans-serif" }}>
              Digital Agency · Available for new projects
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            <div
              style={{
                color: "#f0f4f8",
                fontSize: 72,
                fontWeight: 700,
                fontFamily: "sans-serif",
                lineHeight: 1.05,
                letterSpacing: -2,
              }}
            >
              We Build Digital
            </div>
            <div
              style={{
                color: "#0ea5e9",
                fontSize: 72,
                fontWeight: 700,
                fontFamily: "sans-serif",
                lineHeight: 1.05,
                letterSpacing: -2,
              }}
            >
              Products That Scale.
            </div>
          </div>
          <div
            style={{
              color: "#94a3b8",
              fontSize: 22,
              fontFamily: "sans-serif",
              fontWeight: 400,
              lineHeight: 1.4,
            }}
          >
            SaaS · Web Apps · Mobile · AI Integration · UI/UX Design
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "relative",
            borderTop: "1px solid #1a2a3a",
            paddingTop: 24,
          }}
        >
          <div style={{ color: "#475569", fontSize: 16, fontFamily: "sans-serif" }}>sarmadax.com</div>
          <div style={{ display: "flex", gap: 32, color: "#475569", fontSize: 16, fontFamily: "sans-serif" }}>
            {["Fixed Pricing", "Full Ownership", "Fast Delivery"].map((t) => (
              <div key={t} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div
                  style={{
                    width: 5,
                    height: 5,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg,#0ea5e9,#14b8a6)",
                  }}
                />
                {t}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
