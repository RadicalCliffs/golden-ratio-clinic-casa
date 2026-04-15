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
          background: "#ECE4D5",
          borderRadius: 6,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width="20" height="20" viewBox="0 0 20 20">
          <path
            d="M3 18 A7 7 0 0 1 17 18"
            fill="none"
            stroke="#563E3B"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx="10" cy="6" r="3" fill="none" stroke="#D4A43A" strokeWidth="1.5" />
          <line x1="10" y1="3" x2="10" y2="1.5" stroke="#D4A43A" strokeWidth="1" strokeLinecap="round" />
          <line x1="13" y1="4" x2="14" y2="2.8" stroke="#D4A43A" strokeWidth="1" strokeLinecap="round" />
          <line x1="7" y1="4" x2="6" y2="2.8" stroke="#D4A43A" strokeWidth="1" strokeLinecap="round" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
