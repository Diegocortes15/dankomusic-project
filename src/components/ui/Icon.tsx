import type { SVGProps } from "react";

export type IconName =
  | "play"
  | "pause"
  | "arrow-up-right"
  | "arrow-down"
  | "arrow-left"
  | "chevron-right"
  | "chevron-down"
  | "chevron-left"
  | "calendar"
  | "map-pin"
  | "mail"
  | "instagram"
  | "soundcloud"
  | "youtube"
  | "spotify"
  | "volume"
  | "clock"
  | "heart"
  | "whatsapp"
  | "palette"
  | "x"
  | "check"
  | "external"
  | "ticket"
  | "sliders";

type Props = { name: IconName; size?: number } & Omit<SVGProps<SVGSVGElement>, "name">;

/**
 * Lucide-style inline SVG icons. 1.75px stroke, currentColor.
 * Inlined to avoid CDN/runtime overhead and keep the bundle stable.
 */
export function Icon({ name, size = 18, ...rest }: Props) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.75,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": "true" as const,
    ...rest,
  };

  switch (name) {
    case "play":
      return <svg {...common}><polygon points="5 3 19 12 5 21 5 3" /></svg>;
    case "pause":
      return <svg {...common}><rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" /></svg>;
    case "arrow-up-right":
      return <svg {...common}><line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" /></svg>;
    case "arrow-down":
      return <svg {...common}><line x1="12" y1="5" x2="12" y2="19" /><polyline points="19 12 12 19 5 12" /></svg>;
    case "arrow-left":
      return <svg {...common}><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>;
    case "chevron-right":
      return <svg {...common}><polyline points="9 18 15 12 9 6" /></svg>;
    case "chevron-down":
      return <svg {...common}><polyline points="6 9 12 15 18 9" /></svg>;
    case "chevron-left":
      return <svg {...common}><polyline points="15 18 9 12 15 6" /></svg>;
    case "calendar":
      return (
        <svg {...common}>
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      );
    case "map-pin":
      return (
        <svg {...common}>
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      );
    case "mail":
      return (
        <svg {...common}>
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      );
    case "instagram":
      return (
        <svg {...common}>
          <rect x="2" y="2" width="20" height="20" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      );
    case "soundcloud":
      return (
        <svg {...common}>
          <path d="M3 14v4" /><path d="M6 11v7" /><path d="M9 9v9" />
          <path d="M12 6v12" /><path d="M15 9v9" />
          <path d="M18 12c2 0 3 1 3 3s-1 3-3 3h-3" />
        </svg>
      );
    case "youtube":
      return (
        <svg {...common}>
          <rect x="2" y="5" width="20" height="14" rx="3" />
          <polygon points="10 9 16 12 10 15 10 9" fill="currentColor" stroke="none" />
        </svg>
      );
    case "spotify":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="10" />
          <path d="M7 9c3-1 8-1 11 1" />
          <path d="M7 13c2.5-.8 6.5-.8 9 .8" />
          <path d="M8 16c2-.6 5-.6 7 .6" />
        </svg>
      );
    case "volume":
      return (
        <svg {...common}>
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
        </svg>
      );
    case "clock":
      return <svg {...common}><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>;
    case "heart":
      return (
        <svg {...common}>
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      );
    case "whatsapp":
      return (
        <svg {...common}>
          <path d="M3 21l1.7-5A8.5 8.5 0 1 1 8 19.3L3 21z" />
          <path
            d="M9 9.5c0 3 2.5 5.5 5.5 5.5.4 0 .7-.3.7-.7v-1c0-.3-.2-.6-.6-.7l-1.2-.3c-.3-.1-.6 0-.8.2l-.3.3c-1-.5-1.8-1.3-2.3-2.3l.3-.3c.2-.2.3-.5.2-.8L10.9 8c-.1-.4-.4-.6-.7-.6h-1c-.4 0-.7.3-.7.7z"
            fill="currentColor"
            stroke="none"
          />
        </svg>
      );
    case "palette":
      return (
        <svg {...common}>
          <circle cx="13.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
          <circle cx="17" cy="10.5" r="1.2" fill="currentColor" stroke="none" />
          <circle cx="8.5" cy="7.5" r="1.2" fill="currentColor" stroke="none" />
          <circle cx="6.5" cy="12" r="1.2" fill="currentColor" stroke="none" />
          <path d="M12 2a10 10 0 0 0 0 20c1.1 0 2-.9 2-2 0-.5-.2-1-.5-1.3-.3-.4-.5-.8-.5-1.2 0-1 .8-1.5 1.8-1.5H16a6 6 0 0 0 6-6c0-4.4-4.5-8-10-8z" />
        </svg>
      );
    case "x":
      return <svg {...common}><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>;
    case "check":
      return <svg {...common}><polyline points="20 6 9 17 4 12" /></svg>;
    case "external":
      return (
        <svg {...common}>
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
          <polyline points="15 3 21 3 21 9" />
          <line x1="10" y1="14" x2="21" y2="3" />
        </svg>
      );
    case "ticket":
      return (
        <svg {...common}>
          <path d="M3 9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2 2 2 0 0 0 0 4 2 2 0 0 1-2 2H5a2 2 0 0 1-2-2 2 2 0 0 0 0-4z" />
          <line x1="9" y1="7" x2="9" y2="17" strokeDasharray="2 2" />
        </svg>
      );
    case "sliders":
      return (
        <svg {...common}>
          <line x1="4" y1="21" x2="4" y2="14" />
          <line x1="4" y1="10" x2="4" y2="3" />
          <line x1="12" y1="21" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12" y2="3" />
          <line x1="20" y1="21" x2="20" y2="16" />
          <line x1="20" y1="12" x2="20" y2="3" />
          <line x1="1" y1="14" x2="7" y2="14" />
          <line x1="9" y1="8" x2="15" y2="8" />
          <line x1="17" y1="16" x2="23" y2="16" />
        </svg>
      );
  }
}
