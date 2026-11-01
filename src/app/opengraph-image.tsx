import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const alt = siteConfig.tagline;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Default social share image. Replace with the designer's artwork when ready. */
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
          background: "#ffffff",
          color: "#1c1917",
        }}
      >
        <div style={{ fontSize: 120, letterSpacing: 4, color: "#f07b4f" }}>{siteConfig.name}</div>
        <div style={{ fontSize: 44, marginTop: 24, maxWidth: 900 }}>{siteConfig.tagline}</div>
      </div>
    ),
    size,
  );
}
