"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { site } from "@/data/content";

type SecretContextValue = {
  matrix: boolean;
  flash: "granted" | "terminated" | null;
  toggle: () => void;
  registerLogoTap: () => void;
};

const SecretContext = createContext<SecretContextValue | null>(null);

const TAP_WINDOW_MS = 1600;
const D_WINDOW_MS = 1400;

export function SecretModeProvider({ children }: { children: ReactNode }) {
  const [matrix, setMatrix] = useState(false);
  const [flash, setFlash] = useState<"granted" | "terminated" | null>(null);
  const taps = useRef<number[]>([]);
  const dKeys = useRef<number[]>([]);
  const flashTimer = useRef<number | null>(null);

  const toggle = useCallback(() => {
    setMatrix((current) => {
      const next = !current;
      setFlash(next ? "granted" : "terminated");
      if (flashTimer.current) window.clearTimeout(flashTimer.current);
      flashTimer.current = window.setTimeout(() => setFlash(null), 1100);
      return next;
    });
  }, []);

  const registerLogoTap = useCallback(() => {
    const now = Date.now();
    taps.current = [...taps.current.filter((stamp) => now - stamp < TAP_WINDOW_MS), now];
    if (taps.current.length >= 2) {
      taps.current = [];
      toggle();
    }
  }, [toggle]);

  useEffect(() => {
    document.documentElement.dataset.mode = matrix ? "matrix" : "pro";
    document.title = matrix ? site.matrix.title : "Nica Daniel — Web Developer";
  }, [matrix]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "d" && event.key !== "D") return;
      const target = event.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable)) {
        return;
      }

      const now = Date.now();
      dKeys.current = [...dKeys.current.filter((stamp) => now - stamp < D_WINDOW_MS), now];
      if (dKeys.current.length >= 3) {
        dKeys.current = [];
        toggle();
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [toggle]);

  useEffect(() => {
    return () => {
      if (flashTimer.current) window.clearTimeout(flashTimer.current);
    };
  }, []);

  const value = useMemo(
    () => ({ matrix, flash, toggle, registerLogoTap }),
    [matrix, flash, toggle, registerLogoTap],
  );

  return <SecretContext.Provider value={value}>{children}</SecretContext.Provider>;
}

export function useSecretMode() {
  const context = useContext(SecretContext);
  if (!context) {
    throw new Error("useSecretMode trebuie folosit în SecretModeProvider");
  }
  return context;
}
