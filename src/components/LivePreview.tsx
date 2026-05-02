"use client";

import { useState } from "react";

interface LivePreviewProps {
  url: string;
  title: string;
}

export default function LivePreview({ url, title }: LivePreviewProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [activeDevice, setActiveDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");

  const deviceWidths = {
    desktop: "100%",
    tablet: "768px",
    mobile: "375px",
  };

  return (
    <div 
      className="w-full mx-auto transition-all duration-500 ease-in-out"
      style={{ maxWidth: deviceWidths[activeDevice] }}
    >
      {/* Browser Chrome */}
      <div className="bg-mantle rounded-t-xl border border-card-border border-b-0">
        {/* Title bar with traffic lights */}
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500"></span>
            <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
            <span className="w-3 h-3 rounded-full bg-green-500"></span>
          </div>

          {/* URL Bar */}
          <div className="flex-1 mx-2 sm:mx-4 min-w-0">
            <div className="flex items-center gap-1.5 sm:gap-2 bg-crust rounded-lg px-2 sm:px-3 py-1.5 text-xs text-muted max-w-lg mx-auto">
              <LockIcon />
              <span className="truncate flex-1 min-w-0">{url}</span>
            </div>
          </div>

          {/* Device Switcher */}
          <div className="flex items-center gap-1 bg-crust rounded-lg p-1">
            <button
              onClick={() => setActiveDevice("desktop")}
              className={`p-1.5 rounded transition-colors ${
                activeDevice === "desktop"
                  ? "bg-accent/20 text-accent"
                  : "text-muted hover:text-foreground"
              }`}
              title="Desktop view"
            >
              <DesktopIcon />
            </button>
            <button
              onClick={() => setActiveDevice("tablet")}
              className={`p-1.5 rounded transition-colors ${
                activeDevice === "tablet"
                  ? "bg-accent/20 text-accent"
                  : "text-muted hover:text-foreground"
              }`}
              title="Tablet view"
            >
              <TabletIcon />
            </button>
            <button
              onClick={() => setActiveDevice("mobile")}
              className={`p-1.5 rounded transition-colors ${
                activeDevice === "mobile"
                  ? "bg-accent/20 text-accent"
                  : "text-muted hover:text-foreground"
              }`}
              title="Mobile view"
            >
              <MobileIcon />
            </button>
          </div>
        </div>
      </div>

      {/* Iframe Container */}
      <div
        className="relative bg-crust border border-card-border rounded-b-xl overflow-hidden transition-all duration-500 ease-in-out"
        style={{ height: activeDevice === "desktop" ? "75vh" : activeDevice === "tablet" ? "800px" : "667px" }}
      >
        {/* Loading Skeleton */}
        {isLoading && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-crust">
            <div className="relative w-10 h-10">
              <div className="absolute inset-0 rounded-full border-2 border-card-border"></div>
              <div className="absolute inset-0 rounded-full border-2 border-accent border-t-transparent animate-spin"></div>
            </div>
            <p className="text-xs text-muted animate-pulse">Loading live preview…</p>
          </div>
        )}

        {/* Iframe */}
        <div className="w-full h-full">
          <iframe
            src={url}
            title={`Live preview of ${title}`}
            className="w-full h-full border-0"
            onLoad={() => setIsLoading(false)}
            sandbox="allow-scripts allow-same-origin allow-popups"
            loading="lazy"
          />
        </div>

        {/* Visit Site Overlay */}
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-3 right-3 z-20 inline-flex items-center gap-1.5 px-3 py-1.5 bg-accent text-white text-xs font-medium rounded-lg hover:bg-accent/80 transition-all shadow-lg shadow-accent/20 hover:scale-105"
        >
          <ExternalLinkIcon />
          Visit Site
        </a>
      </div>
    </div>
  );
}

function LockIcon() {
  return (
    <svg className="w-3 h-3 text-green-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
  );
}

function ExternalLinkIcon() {
  return (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
  );
}

function DesktopIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}

function TabletIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
  );
}

function MobileIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
  );
}
