"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useTheme, accentColors, type ThemeFlavor, type AccentColor } from "@/context/ThemeContext";

export default function Nav() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { flavor, setFlavor, accent, setAccent, backgroundEffect, setBackgroundEffect } = useTheme();

  const renderPath = () => {
    if (pathname === "/") {
      return <span>~/home</span>;
    }

    const segments = pathname.split("/").filter(Boolean);
    return (
      <>
        ~/<Link href="/" className="text-accent hover:text-foreground transition-colors">home</Link>
        {segments.map((segment, index) => {
          const isLast = index === segments.length - 1;
          const href = "/" + segments.slice(0, index + 1).join("/");
          return isLast ? (
            <span key={segment}>/{segment}</span>
          ) : (
            <span key={segment}>/<Link href={href} className="text-accent hover:text-foreground transition-colors">{segment}</Link></span>
          );
        })}
      </>
    );
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/projects", label: "Projects" },
    { href: "/resume", label: "Resume" },
  ];

  const moreLinks = [
    { href: "/notes", label: "Notes" },
    { href: "/terminal", label: "Terminal" },
  ];

  const flavorOptions: { value: ThemeFlavor; label: string }[] = [
    { value: "latte", label: "Latte" },
    { value: "frappe", label: "Frappé" },
    { value: "macchiato", label: "Macchiato" },
    { value: "mocha", label: "Mocha" },
  ];

  const accentOptions: AccentColor[] = [
    "rosewater", "flamingo", "pink", "mauve", "red", "maroon",
    "peach", "yellow", "green", "teal", "sky", "sapphire", "blue", "lavender",
  ];

  return (
    <>
      <header className="flex justify-between items-center mb-4">
        <div className="text-muted">
          {renderPath()} <span className="text-accent cursor-blink">|</span>
        </div>

        {/* Desktop nav - hidden on mobile */}
        <nav className="hidden md:flex gap-6 text-sm text-muted">
          <Link
            href="/"
            className={pathname === "/" ? "text-foreground" : "hover:text-foreground transition-colors"}
          >
            Home
          </Link>
          <Link
            href="/about"
            className={pathname === "/about" ? "text-foreground" : "hover:text-foreground transition-colors"}
          >
            About
          </Link>
          <Link
            href="/projects"
            className={pathname === "/projects" ? "text-foreground" : "hover:text-foreground transition-colors"}
          >
            Projects
          </Link>
          <Link
            href="/resume"
            className={pathname === "/resume" ? "text-foreground" : "hover:text-foreground transition-colors"}
          >
            Resume
          </Link>
          <button
            onClick={() => setIsOpen(true)}
            className="hover:text-foreground transition-colors cursor-pointer"
          >
            More...
          </button>
        </nav>

        {/* Mobile hamburger button - hidden on desktop */}
        <button
          onClick={() => setIsOpen(true)}
          className="md:hidden text-muted hover:text-foreground transition-colors p-1"
          aria-label="Open menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </header>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Navigation Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-mantle z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-accent text-lg font-medium">Navigation</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="text-muted hover:text-foreground transition-colors text-xl"
            >
              ×
            </button>
          </div>

          {/* Theme Section */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-muted">🎨</span>
              <span className="text-foreground text-sm">Theme</span>
            </div>

            {/* Flavor Buttons */}
            <div className="flex flex-wrap gap-2 mb-4">
              {flavorOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setFlavor(opt.value)}
                  className={`px-3 py-1 text-xs rounded border transition-colors ${
                    flavor === opt.value
                      ? "bg-accent text-crust border-accent"
                      : "border-surface text-muted hover:border-accent"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            {/* Accent Color Palette */}
            <div className="grid grid-cols-7 gap-2 mb-4">
              {accentOptions.map((color) => (
                <button
                  key={color}
                  onClick={() => setAccent(color)}
                  className={`w-6 h-6 rounded-full transition-transform hover:scale-110 ${
                    accent === color ? "ring-2 ring-white ring-offset-2 ring-offset-mantle" : ""
                  }`}
                  style={{ backgroundColor: accentColors[color][flavor] }}
                  title={color}
                />
              ))}
            </div>

            {/* Background Effect Toggle */}
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={backgroundEffect}
                onChange={(e) => setBackgroundEffect(e.target.checked)}
                className="w-4 h-4 accent-accent"
              />
              <span className="text-sm text-muted">Background effect:</span>
              <span className={`text-sm ${backgroundEffect ? "text-accent" : "text-muted"}`}>
                {backgroundEffect ? "on" : "off"}
              </span>
            </label>
          </div>

          {/* Divider */}
          <div className="border-t border-surface my-4" />

          {/* Navigation Links - all links shown on mobile, only "more" on desktop */}
          <nav className="space-y-3">
            {/* Main nav links - only visible in drawer on mobile */}
            <div className="md:hidden space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block text-sm transition-colors ${
                    pathname === link.href ? "text-accent" : "text-foreground hover:text-accent"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="border-t border-surface my-3" />
            </div>

            {/* More links - always visible in drawer */}
            <span className="text-xs text-muted uppercase tracking-wider">More</span>
            <div className="mt-3 space-y-3">
              {moreLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block text-sm transition-colors ${
                    pathname === link.href ? "text-accent" : "text-foreground hover:text-accent"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
