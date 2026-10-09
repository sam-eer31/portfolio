import { ImageResponse } from "next/og";

export const alt = "Sameer Shahid Siddiqui - Frontend Developer Portfolio";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          backgroundColor: "#040506",
          backgroundImage: "radial-gradient(circle at 25% 25%, #181B1E 0%, #040506 60%)",
          color: "#f8fafc",
          fontFamily: "system-ui, -apple-system, sans-serif",
          position: "relative",
        }}
      >
        {/* Ambient glow */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            right: "-100px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(249, 115, 22, 0.15) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-100px",
            left: "-100px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)",
          }}
        />

        {/* Top badge */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 20px",
              borderRadius: "9999px",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              backgroundColor: "rgba(255, 255, 255, 0.04)",
              fontSize: "16px",
              fontWeight: 600,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#f97316",
            }}
          >
            PORTFOLIO • FRONTEND DEVELOPER
          </div>
        </div>

        {/* Main Content */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div
            style={{
              fontSize: "76px",
              fontWeight: 800,
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              color: "#ffffff",
            }}
          >
            Sameer Shahid Siddiqui
          </div>
          <div
            style={{
              fontSize: "28px",
              color: "#94a3b8",
              lineHeight: 1.4,
              maxWidth: "900px",
            }}
          >
            Frontend Developer specializing in React, Next.js, TypeScript &amp; AI-Assisted Development
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            paddingTop: "24px",
            fontSize: "18px",
            color: "#64748b",
          }}
        >
          <div>Lucknow, India • Open to Opportunities</div>
          <div style={{ color: "#f8fafc", fontWeight: 600 }}>itssameer.me →</div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
