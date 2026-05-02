import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terminal",
  description: "Interactive terminal experience by Christopher Rodriguez.",
};

export default function TerminalPage() {
  return (
    <main className="p-8 max-w-4xl mx-auto flex flex-col flex-1">
      <h1 className="text-2xl font-bold text-accent mb-6">Terminal</h1>
      <p className="text-muted flex-1">Interactive terminal coming soon...</p>
    </main>
  );
}
