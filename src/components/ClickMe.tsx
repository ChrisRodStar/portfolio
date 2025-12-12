"use client";

import { useState, useEffect, useTransition } from "react";
import { getClicks, incrementClicks } from "@/lib/actions";

export default function ClickMe() {
  const [count, setCount] = useState<number | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    getClicks().then(setCount);
  }, []);

  const handleClick = () => {
    startTransition(async () => {
      const newCount = await incrementClicks();
      setCount(newCount);
    });
  };

  return (
    <div className="card p-3! shadow-lg shadow-accent/10 hover:scale-[1.02] transition-transform h-full flex flex-col">
      <h3 className="font-bold mb-1 flex items-center gap-2 text-sm">
        <span>🖱️</span> Clicks
      </h3>
      <p className="text-xs text-muted hidden sm:block">
        Global click counter
      </p>
      <p className="text-accent font-bold text-xl flex-1 flex items-center justify-center">
        {count === null ? '...' : count.toLocaleString()}
      </p>
      <button
        onClick={handleClick}
        disabled={isPending}
        className="block w-full bg-card-border hover:bg-muted text-white text-center py-1.5 rounded-lg text-xs transition-colors mt-auto disabled:opacity-50"
      >
        {isPending ? '...' : 'Click Me!'}
      </button>
    </div>
  );
}
