"use client";

import { useTheme, accentColors, type ThemeFlavor, type AccentColor } from "@/context/ThemeContext";

const flavorEmojis: Record<ThemeFlavor, string> = {
  latte: "☀️",
  frappe: "🌤️",
  macchiato: "🌙",
  mocha: "🌑",
};

const flavorList: ThemeFlavor[] = ["latte", "frappe", "macchiato", "mocha"];
const accentList: AccentColor[] = [
  "rosewater", "flamingo", "pink", "mauve", "red", "maroon",
  "peach", "yellow", "green", "teal", "sky", "sapphire", "blue", "lavender"
];

export default function ThemeCard() {
  const { flavor, setFlavor, accent, setAccent } = useTheme();

  const cycleTheme = () => {
    const currentIndex = flavorList.indexOf(flavor);
    const nextIndex = (currentIndex + 1) % flavorList.length;
    setFlavor(flavorList[nextIndex]);
  };

  return (
    <div className="card p-3! shadow-lg shadow-accent/10 hover:scale-[1.02] transition-transform h-full flex flex-col">
      <h3 className="font-bold mb-1 flex items-center gap-2 text-sm">
        <span>🎨</span> Theme
      </h3>
      <div className="grid grid-cols-7 gap-1 flex-1 content-center">
        {accentList.map((color) => (
          <button
            key={color}
            onClick={() => setAccent(color)}
            className={`w-4 h-4 rounded-full transition-transform ${accent === color ? "ring-2 ring-foreground scale-110" : "hover:scale-110"}`}
            style={{ backgroundColor: accentColors[color][flavor] }}
            title={color}
          />
        ))}
      </div>
      <button
        onClick={cycleTheme}
        className="block w-full bg-card-border hover:bg-muted text-white text-center py-1.5 rounded-lg text-xs transition-colors mt-auto"
      >
        {flavorEmojis[flavor]} Switch
      </button>
    </div>
  );
}
