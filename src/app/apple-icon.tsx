import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/**
 * Apple touch icon — rasterises the same Ø brand mark as icon.svg into a
 * 180×180 PNG, which is the format iOS expects for home-screen icons
 * (Next's app-icon convention does not accept apple-icon.svg).
 */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#050507",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg
          width="100"
          height="100"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="50"
            cy="50"
            r="32"
            fill="none"
            stroke="#2f7bff"
            strokeWidth="11"
          />
          <line
            x1="22"
            y1="78"
            x2="78"
            y2="22"
            stroke="#2f7bff"
            strokeWidth="11"
            strokeLinecap="round"
          />
        </svg>
      </div>
    ),
    size,
  );
}
