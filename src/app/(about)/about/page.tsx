import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn more about Christopher Rodriguez - a self-taught developer building clean, fast tools and websites with Next.js.",
};

export default function About() {
  return (
    <div className="p-6 max-w-6xl mx-auto flex-1">

      {/* About Me Section */}
      <section className="mb-12">
        <h1 className="text-3xl font-bold mb-4 text-center animate-fade-slide-up">
          <span className="text-accent">Christopher Rodriguez</span>
        </h1>

        <div className="card p-4 mb-6 shadow-lg shadow-accent/10 animate-pop-in delay-100">
          <div className="flex flex-row gap-4 md:gap-6">
            {/* Profile Image */}
            <div className="shrink-0 w-24 md:w-48 aspect-3/4 relative overflow-hidden rounded-lg animate-float">
              <Image
                src="/me.webp"
                alt="Christopher Rodriguez"
                fill
                className="object-cover"
              />
            </div>

            <p className="text-muted flex-1 text-sm animate-fade-slide-right delay-200">
              Self-taught developer with AI (yeah, I know... <em>kinda lame, sorry</em>).
              <br />
              I like building clean, fast tools and websites. Most of what I make ends up in{" "}
              <span className="text-accent font-medium">Next.js</span>, but I&apos;m always experimenting across the stack.
            </p>
          </div>
        </div>

        {/* About Me */}
        <div className="card p-4 shadow-lg shadow-accent/10 animate-pop-in delay-300 hover:scale-[1.01] transition-transform">
          <h2 className="font-bold mb-3 flex items-center gap-2">
            About Me
          </h2>
          <ul className="space-y-2 text-muted text-sm">
            <li className="animate-fade-slide-up delay-400">• Learning by doing small projects, random ideas; whatever keeps me improving</li>
            <li className="animate-fade-slide-up delay-500">• Working mainly with <span className="text-accent">Next.js</span>, <span className="text-accent">React</span>, and <span className="text-accent">Tailwind</span></li>
            <li className="animate-fade-slide-up delay-600">• Currently diving into API design, full-stack workflows, and deployment</li>
            <li className="animate-fade-slide-up delay-700">• Tools I actually use: <span className="text-accent">Kiro</span>, <span className="text-accent">Git/GitHub</span>, <span className="text-accent">Vercel</span></li>
          </ul>
        </div>
      </section>

      {/* My Cat Section */}
      <section id="mimi" className="card p-4 mb-12 shadow-lg shadow-accent/10 animate-fade-slide-up delay-800 hover:scale-[1.01] transition-transform">
        <h3 className="font-bold mb-4 flex items-center gap-2">
           My Cat Mimi!
        </h3>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="shrink-0 animate-float">
            <Image
              src="/mimi.webp"
              alt="Mimi the cat"
              width={200}
              height={200}
              className="w-48 h-48 rounded-lg object-cover"
            />
          </div>
          <p className="text-muted flex-1 text-sm">
            Mimi is a 3-year-old furball who demands attention{" "}
            <span className="text-accent font-medium">24/7</span> — and honestly, I don&apos;t mind one bit.
            Her absolute favorite treat is bacon, and she can somehow sense when I&apos;m cooking it from anywhere in the house.
            When she&apos;s not supervising my coding sessions from my keyboard, she&apos;s probably napping in the sunniest spot she can find.
          </p>
        </div>
      </section>
    </div>
  );
}
