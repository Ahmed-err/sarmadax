import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          borderRadius: 40,
          background: "linear-gradient(135deg, #0ea5e9, #14b8a6)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            color: "white",
            fontSize: 72,
            fontWeight: 700,
            fontFamily: "monospace",
            letterSpacing: -4,
            lineHeight: 1,
          }}
        >
          {"</>"}
        </div>
      </div>
    ),
    { ...size }
  );
}
