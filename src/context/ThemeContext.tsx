"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type ThemeFlavor = "latte" | "frappe" | "macchiato" | "mocha";

type AccentColor =
  | "rosewater" | "flamingo" | "pink" | "mauve" | "red" | "maroon"
  | "peach" | "yellow" | "green" | "teal" | "sky" | "sapphire" | "blue" | "lavender";

interface ThemeContextType {
  flavor: ThemeFlavor;
  setFlavor: (flavor: ThemeFlavor) => void;
  accent: AccentColor;
  setAccent: (accent: AccentColor) => void;
  backgroundEffect: boolean;
  setBackgroundEffect: (enabled: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Catppuccin color palettes
const flavors = {
  latte: {
    base: "#eff1f5",
    mantle: "#e6e9ef",
    crust: "#dce0e8",
    text: "#4c4f69",
    subtext1: "#5c5f77",
    subtext0: "#6c6f85",
    overlay2: "#7c7f93",
    overlay1: "#8c8fa1",
    overlay0: "#9ca0b0",
    surface2: "#acb0be",
    surface1: "#bcc0cc",
    surface0: "#ccd0da",
  },
  frappe: {
    base: "#303446",
    mantle: "#292c3c",
    crust: "#232634",
    text: "#c6d0f5",
    subtext1: "#b5bfe2",
    subtext0: "#a5adce",
    overlay2: "#949cbb",
    overlay1: "#838ba7",
    overlay0: "#737994",
    surface2: "#626880",
    surface1: "#51576d",
    surface0: "#414559",
  },
  macchiato: {
    base: "#24273a",
    mantle: "#1e2030",
    crust: "#181926",
    text: "#cad3f5",
    subtext1: "#b8c0e0",
    subtext0: "#a5adcb",
    overlay2: "#939ab7",
    overlay1: "#8087a2",
    overlay0: "#6e738d",
    surface2: "#5b6078",
    surface1: "#494d64",
    surface0: "#363a4f",
  },
  mocha: {
    base: "#1e1e2e",
    mantle: "#181825",
    crust: "#11111b",
    text: "#cdd6f4",
    subtext1: "#bac2de",
    subtext0: "#a6adc8",
    overlay2: "#9399b2",
    overlay1: "#7f849c",
    overlay0: "#6c7086",
    surface2: "#585b70",
    surface1: "#45475a",
    surface0: "#313244",
  },
};

const accentColors = {
  rosewater: { latte: "#dc8a78", frappe: "#f2d5cf", macchiato: "#f4dbd6", mocha: "#f5e0dc" },
  flamingo: { latte: "#dd7878", frappe: "#eebebe", macchiato: "#f0c6c6", mocha: "#f2cdcd" },
  pink: { latte: "#ea76cb", frappe: "#f4b8e4", macchiato: "#f5bde6", mocha: "#f5c2e7" },
  mauve: { latte: "#8839ef", frappe: "#ca9ee6", macchiato: "#c6a0f6", mocha: "#cba6f7" },
  red: { latte: "#d20f39", frappe: "#e78284", macchiato: "#ed8796", mocha: "#f38ba8" },
  maroon: { latte: "#e64553", frappe: "#ea999c", macchiato: "#ee99a0", mocha: "#eba0ac" },
  peach: { latte: "#fe640b", frappe: "#ef9f76", macchiato: "#f5a97f", mocha: "#fab387" },
  yellow: { latte: "#df8e1d", frappe: "#e5c890", macchiato: "#eed49f", mocha: "#f9e2af" },
  green: { latte: "#40a02b", frappe: "#a6d189", macchiato: "#a6da95", mocha: "#a6e3a1" },
  teal: { latte: "#179299", frappe: "#81c8be", macchiato: "#8bd5ca", mocha: "#94e2d5" },
  sky: { latte: "#04a5e5", frappe: "#99d1db", macchiato: "#91d7e3", mocha: "#89dceb" },
  sapphire: { latte: "#209fb5", frappe: "#85c1dc", macchiato: "#7dc4e4", mocha: "#74c7ec" },
  blue: { latte: "#1e66f5", frappe: "#8caaee", macchiato: "#8aadf4", mocha: "#89b4fa" },
  lavender: { latte: "#7287fd", frappe: "#babbf1", macchiato: "#b7bdf8", mocha: "#b4befe" },
};

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [flavor, setFlavor] = useState<ThemeFlavor>("mocha");
  const [accent, setAccent] = useState<AccentColor>("flamingo");
  const [backgroundEffect, setBackgroundEffect] = useState(true);
  const [mounted, setMounted] = useState(false);

  // Load from localStorage after mount to avoid hydration mismatch
  useEffect(() => {
    const storedFlavor = localStorage.getItem("theme-flavor") as ThemeFlavor;
    const storedAccent = localStorage.getItem("theme-accent") as AccentColor;
    const storedBgEffect = localStorage.getItem("background-effect");

    if (storedFlavor) setFlavor(storedFlavor);
    if (storedAccent) setAccent(storedAccent);
    // Only override default if user has explicitly set a preference
    if (storedBgEffect !== null) setBackgroundEffect(storedBgEffect === "true");
    setMounted(true);
  }, []);

  useEffect(() => {
    // Only persist to localStorage after initial mount
    if (mounted) {
      localStorage.setItem("theme-flavor", flavor);
      localStorage.setItem("theme-accent", accent);
      localStorage.setItem("background-effect", String(backgroundEffect));
    }

    const colors = flavors[flavor];
    const accentColor = accentColors[accent][flavor];

    document.documentElement.style.setProperty("--background", colors.base);
    document.documentElement.style.setProperty("--foreground", colors.text);
    document.documentElement.style.setProperty("--card-bg", colors.surface0);
    document.documentElement.style.setProperty("--card-border", colors.surface1);
    document.documentElement.style.setProperty("--accent", accentColor);
    document.documentElement.style.setProperty("--muted", colors.subtext0);
    document.documentElement.style.setProperty("--surface", colors.surface0);
    document.documentElement.style.setProperty("--overlay", colors.overlay0);
    document.documentElement.style.setProperty("--mantle", colors.mantle);
    document.documentElement.style.setProperty("--crust", colors.crust);
    // For latte (light theme), use dark text for hover; for dark themes, use light text
    const hoverColor = flavor === "latte" ? colors.text : "#ffffff";
    document.documentElement.style.setProperty("--hover", hoverColor);
  }, [flavor, accent, backgroundEffect, mounted]);

  return (
    <ThemeContext.Provider value={{ flavor, setFlavor, accent, setAccent, backgroundEffect, setBackgroundEffect }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
}

export { accentColors, flavors };
export type { ThemeFlavor, AccentColor };
