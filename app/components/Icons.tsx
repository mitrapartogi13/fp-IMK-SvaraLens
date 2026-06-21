/**
 * Inline SVG icons. Each sizes to 1em and inherits `currentColor`, so they
 * follow text color and the user's font scale. (Spec allows lucide-react or
 * inline SVGs; inline keeps the app dependency-free.)
 */
type IconProps = React.SVGProps<SVGSVGElement>;

const base = (props: IconProps) => ({
  width: "1em",
  height: "1em",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2.2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  focusable: false,
  ...props,
});

export function BackIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M15 5 8 12l7 7" />
    </svg>
  );
}

export function SettingsIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" />
    </svg>
  );
}

export function ChevronRightIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="m9 6 6 6-6 6" />
    </svg>
  );
}

export function ChevronDownIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function MicIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="9" y="2" width="6" height="12" rx="3" fill="currentColor" stroke="none" />
      <path d="M5 11a7 7 0 0 0 14 0M12 18v3" />
    </svg>
  );
}

export function WaveformIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M4 10v4M8 7v10M12 4v16M16 7v10M20 10v4" />
    </svg>
  );
}

export function SearchIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

export function SearchXIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5M9 9l4 4M13 9l-4 4" />
    </svg>
  );
}

export function CalendarIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 9h18M8 3v4M16 3v4" />
    </svg>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="m5 12 5 5 9-11" />
    </svg>
  );
}

export function PlayIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M7 5v14l12-7L7 5Z" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function PauseIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="6" y="5" width="4" height="14" rx="1" fill="currentColor" stroke="none" />
      <rect x="14" y="5" width="4" height="14" rx="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function SkipIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M5 5v14l9-7-9-7Z" fill="currentColor" stroke="none" />
      <path d="M19 5v14" />
    </svg>
  );
}

export function RefreshIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M20 11a8 8 0 1 0-.6 4M20 4v5h-5" />
    </svg>
  );
}

export function SpeakerIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M11 5 6 9H3v6h3l5 4V5Z" fill="currentColor" stroke="none" />
      <path d="M15.5 8.5a5 5 0 0 1 0 7" />
      <path d="M18.5 6a9 9 0 0 1 0 12" />
    </svg>
  );
}

export function VolumeIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M11 5 6 9H3v6h3l5 4V5Z" fill="currentColor" stroke="none" />
      <path d="M16 9.5a4 4 0 0 1 0 5" />
    </svg>
  );
}

export function CameraIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M3 8.5A1.5 1.5 0 0 1 4.5 7h2L8 5h8l1.5 2h2A1.5 1.5 0 0 1 21 8.5v9A1.5 1.5 0 0 1 19.5 19h-15A1.5 1.5 0 0 1 3 17.5v-9Z" />
      <circle cx="12" cy="13" r="3.5" />
    </svg>
  );
}

export function HistoryIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M3 12a9 9 0 1 0 3-6.7M3 5v3h3" />
      <path d="M12 8v4l3 2" />
    </svg>
  );
}

export function DocumentIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M7 3h7l4 4v14H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" />
      <path d="M14 3v4h4M9.5 12h6M9.5 15.5h6" />
    </svg>
  );
}

export function PillIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="3" y="8" width="18" height="8" rx="4" />
      <path d="M12 8v8" />
    </svg>
  );
}

export function PackageIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M6 3h12a1 1 0 0 1 1 1v17l-7-3.5L5 21V4a1 1 0 0 1 1-1Z" />
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M6 6 18 18M18 6 6 18" />
    </svg>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M4 12h16M14 6l6 6-6 6" />
    </svg>
  );
}

export function LogoIcon(props: IconProps) {
  // Stylized "lens + sound wave" mark.
  return (
    <svg {...base(props)} strokeWidth={1.8}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.2-3.2" />
      <path d="M9 11h.01M11.5 8.5v5M14 7v9" />
    </svg>
  );
}

export function AssistantIcon(props: IconProps) {
  // AI assistant avatar (friendly robot head).
  return (
    <svg {...base(props)}>
      <rect x="4" y="7" width="16" height="12" rx="3" />
      <path d="M12 3v4M8.5 12h.01M15.5 12h.01M9 16h6" />
    </svg>
  );
}

/* ---- Gesture tutorial illustrations ---- */
export function TapGestureIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="5" r="2.5" />
      <path d="M12 8v6M12 14l-2.5-1.5a1.6 1.6 0 0 0-2 2.4l3 4a4 4 0 0 0 3 1.6h2.5a4 4 0 0 0 4-4v-3a1.8 1.8 0 0 0-3.6 0M15.6 13v-1a1.8 1.8 0 0 0-3.6 0" />
    </svg>
  );
}

export function SwipeGestureIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M3 12h18M3 12l4-4M3 12l4 4M21 12l-4-4M21 12l-4 4" />
    </svg>
  );
}

export function HoldGestureIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="12" r="9" strokeDasharray="3 3" />
      <circle cx="12" cy="11" r="2" />
      <path d="M12 13v5M12 18l-1.5-1a1.4 1.4 0 0 0-1.8 2l1.8 2.2" />
    </svg>
  );
}

export function PinchGestureIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M8 8 4 4M4 4v4M4 4h4M16 16l4 4M20 20v-4M20 20h-4" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

/* ---- Brutalist gesture/UI icons ---- */

/** Friendly waving / open hand. Used in dashboard tip bar. */
export function HandWaveIcon(props: IconProps) {
  return (
    <svg {...base(props)} strokeWidth={2.4}>
      <path d="M9 11V5.5a1.5 1.5 0 0 1 3 0V11" />
      <path d="M12 11V4.5a1.5 1.5 0 0 1 3 0V11" />
      <path d="M15 11V6a1.5 1.5 0 0 1 3 0v8a6 6 0 0 1-6 6h-1a6 6 0 0 1-5.2-3l-2.3-4a1.5 1.5 0 0 1 2.6-1.5L8 13.5V8a1.5 1.5 0 0 1 3 0v3" />
    </svg>
  );
}


/** Big bold checkmark — for "selesai" success state. */
export function BigCheckIcon(props: IconProps) {
  return (
    <svg {...base(props)} strokeWidth={3.2}>
      <path d="m5 12.5 5 5 9-11" />
    </svg>
  );
}

/** 7-bar audio waveform — used for the splash audio visualizer. */
export function AudioBarsIcon(props: IconProps) {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 56 32"
      fill="currentColor"
      aria-hidden
      focusable={false}
      {...props}
    >
      <rect x="0"  y="11" width="6" height="10" rx="3" />
      <rect x="8"  y="7"  width="6" height="18" rx="3" />
      <rect x="16" y="3"  width="6" height="26" rx="3" />
      <rect x="24" y="0"  width="6" height="32" rx="3" />
      <rect x="32" y="3"  width="6" height="26" rx="3" />
      <rect x="40" y="7"  width="6" height="18" rx="3" />
      <rect x="48" y="11" width="6" height="10" rx="3" />
    </svg>
  );
}

export function WarningIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 3 2 20h20L12 3Z" />
      <path d="M12 10v4M12 17h.01" />
    </svg>
  );
}
