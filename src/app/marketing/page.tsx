import Link from "next/link";

export default function MarketingPage() {
  return (
    <main className="p-8 max-w-4xl mx-auto flex flex-col flex-1 items-center justify-center min-h-[80vh]">
      <h1 className="text-4xl font-bold mb-4">Web Design & <span className="text-accent">Marketing</span></h1>
      <p className="text-muted text-center max-w-lg mb-8">
        This section is currently under construction. Check back soon for my design portfolio and client services!
      </p>
      <Link href="/" className="px-6 py-2 rounded-full bg-accent text-crust font-medium hover:opacity-90 transition-opacity">
        ← Back to Home
      </Link>
    </main>
  );
}
