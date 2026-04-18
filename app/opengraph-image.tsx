import { ImageResponse } from "next/og";

export const alt = "Sarmadax — We Build Digital Products That Scale";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: "#050a0f",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Grid pattern overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(#1a2a3a 1px, transparent 1px), linear-gradient(90deg, #1a2a3a 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            opacity: 0.3,
            display: "flex",
          }}
        />

        {/* Gradient blobs */}
        <div
          style={{
            position: "absolute",
            top: -120,
            right: -80,
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(14,165,233,0.18), transparent 70%)",
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
            background: "radial-gradient(circle, rgba(20,184,166,0.15), transparent 70%)",
            display: "flex",
          }}
        />

        {/* Logo row */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, position: "relative" }}>
          {/* Icon mark */}
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 12,
              background: "linear-gradient(135deg, #0ea5e9, #14b8a6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                color: "white",
                fontSize: 20,
                fontWeight: 700,
                fontFamily: "monospace",
                letterSpacing: -1,
              }}
            >
              {"</>"}
            </div>
          </div>

          {/* Wordmark */}
          <div
            style={{
              color: "#f0f4f8",
              fontSize: 28,
              fontWeight: 700,
              fontFamily: "sans-serif",
              letterSpacing: -0.5,
            }}
          >
            Sarmadax
          </div>
        </div>

        {/* Main content */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24, position: "relative" }}>
          {/* Eyebrow */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(14,165,233,0.12)",
              border: "1px solid rgba(14,165,233,0.25)",
              borderRadius: 100,
              padding: "8px 20px",
              width: "fit-content",
            }}
          >
            <div
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "#34d399",
              }}
            />
            <div
              style={{
                color: "#0ea5e9",
                fontSize: 15,
                fontWeight: 500,
                fontFamily: "sans-serif",
              }}
            >
              Digital Agency · Available for new projects
            </div>
          </div>

          {/* Headline */}
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
            We Build Digital{"\n"}
            <span style={{ color: "#0ea5e9" }}>Products That Scale.</span>
          </div>

          {/* Subtitle */}
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
          <div style={{ color: "#475569", fontSize: 16, fontFamily: "sans-serif" }}>
            sarmadax.com
          </div>
          <div
            style={{
              display: "flex",
              gap: 32,
              color: "#475569",
              fontSize: 16,
              fontFamily: "sans-serif",
            }}
          >
            {["Fixed Pricing", "Full Ownership", "Fast Delivery"].map((t) => (
              <div key={t} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div
                  style={{
                    width: 5,
                    height: 5,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #0ea5e9, #14b8a6)",
                  }}
                />
                {t}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
