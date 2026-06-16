"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

export type Theme = "light" | "dark";
export type AudioSpeed = "lambat" | "normal" | "cepat";

export type Settings = {
  theme: Theme;
  fontSize: number; // percentage, 80–200
  volume: number; // 0–100
  audioSpeed: AudioSpeed;
  hasVisited: boolean;
};

export const DEFAULT_SETTINGS: Settings = {
  theme: "light",
  fontSize: 100,
  volume: 60,
  audioSpeed: "normal",
  hasVisited: false,
};

const STORAGE_KEY = "svaralens:settings";

type SettingsContextValue = {
  settings: Settings;
  /** Whether settings have been hydrated from localStorage yet. */
  ready: boolean;
  update: (patch: Partial<Settings>) => void;
};

const SettingsContext = createContext<SettingsContextValue | null>(null);

/** Applies theme + font scale to the document root. */
function applyToDocument(settings: Settings) {
  const root = document.documentElement;
  root.classList.toggle("dark", settings.theme === "dark");
  root.style.setProperty("--font-scale", String(settings.fontSize / 100));
}

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const [ready, setReady] = useState(false);
  const loaded = useRef(false);

  // Hydrate once from localStorage on mount. This must run as a post-mount
  // effect (not a render-time initializer) so the server and first client
  // render agree — reading localStorage during render would cause an SSR
  // hydration mismatch. The setState here is intentional and runs only once.
  useEffect(() => {
    if (loaded.current) return;
    loaded.current = true;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const next = raw
        ? { ...DEFAULT_SETTINGS, ...(JSON.parse(raw) as Partial<Settings>) }
        : DEFAULT_SETTINGS;
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time hydration from persisted storage
      setSettings(next);
      applyToDocument(next);
    } catch {
      applyToDocument(DEFAULT_SETTINGS);
    }
    setReady(true);
  }, []);

  const update = useCallback((patch: Partial<Settings>) => {
    setSettings((prev) => {
      const next = { ...prev, ...patch };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        /* ignore quota / privacy-mode errors */
      }
      applyToDocument(next);
      return next;
    });
  }, []);

  return (
    <SettingsContext.Provider value={{ settings, ready, update }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useSettings must be used within SettingsProvider");
  return ctx;
}
