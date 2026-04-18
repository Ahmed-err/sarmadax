import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 8,
          background: "linear-gradient(135deg, #0ea5e9, #14b8a6)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            color: "white",
            fontSize: 14,
            fontWeight: 700,
            fontFamily: "monospace",
            letterSpacing: -1,
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
