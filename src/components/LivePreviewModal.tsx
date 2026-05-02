"use client";

import { useState, useEffect } from "react";
import LivePreview from "./LivePreview";

interface LivePreviewModalProps {
  url: string;
  title: string;
}

export default function LivePreviewModal({ url, title }: LivePreviewModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!url) return null;

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-2 px-4 py-2 bg-surface text-foreground border border-card-border rounded-lg hover:bg-mantle hover:border-accent hover:text-accent transition-colors"
      >
        <EyeIcon />
        Live Preview
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-background/80 backdrop-blur-sm animate-fade-in">
          <div 
            className="absolute inset-0" 
            onClick={() => setIsOpen(false)}
            aria-label="Close modal"
          ></div>
          
          <div className="relative z-10 w-[95vw] lg:w-[75vw] max-w-[1600px] max-h-[90vh] flex flex-col animate-fade-slide-up">
            {/* Close Button Floating Outside */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute -top-12 right-0 p-2 text-muted hover:text-white bg-crust/50 hover:bg-accent/80 backdrop-blur-md rounded-full transition-all"
              aria-label="Close"
            >
              <CloseIcon />
            </button>
            
            <div className="w-full shadow-2xl rounded-xl">
              <LivePreview url={url} title={title} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function EyeIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}
