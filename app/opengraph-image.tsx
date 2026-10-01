import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "#090909",
        }}
      >
        <div style={{ color: "#f0c979", fontSize: 28, letterSpacing: 8 }}>
          C³ MEDIA CO. — DESIGN · DEVELOP · DELIVER
        </div>
        <div style={{ color: "#ffffff", fontSize: 72, fontWeight: 800, marginTop: 24, lineHeight: 1.05, display: "flex", flexDirection: "column" }}>
          <div>We build the digital side</div>
          <div>of ambitious ideas.</div>
        </div>
        <div style={{ color: "#a6a29b", fontSize: 28, marginTop: 24 }}>
          Websites · Apps · Brands · Motion · 3D
        </div>
      </div>
    ),
    { ...size }
  );
}
