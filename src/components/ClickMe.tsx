"use client";

import { useState, useEffect } from "react";

export default function ClickMe() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    fetch('/api/clicks').then(r => r.json()).then(d => setCount(d.count));
  }, []);

  const handleClick = async () => {
    const res = await fetch('/api/clicks', { method: 'POST' });
    const data = await res.json();
    setCount(data.count);
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
        className="block w-full bg-card-border hover:bg-muted text-white text-center py-1.5 rounded-lg text-xs transition-colors mt-auto"
      >
        Click Me!
      </button>
    </div>
  );
}
