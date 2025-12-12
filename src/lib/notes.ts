import type { TagColor } from "@/components/ProjectCard";

export interface Note {
  slug: string;
  title: string;
  summary: string;
  date: string;
  tags?: { name: string; color: TagColor }[];
  content: string[];
}

export const notes: Note[] = [
  {
    slug: "getting-started-with-nextjs",
    title: "Getting Started with Next.js 15",
    summary: "My notes on setting up a new Next.js project with the App Router and best practices.",
    date: "December 2025",
    tags: [
      { name: "Next.js", color: "blue" },
      { name: "React", color: "cyan" },
    ],
    content: [
      "Next.js 15 brings some exciting improvements to the framework, especially around the App Router and React Server Components.",
      "The new project structure with the app directory makes it much easier to organize routes and layouts. Route groups using parentheses like (public) help keep things tidy without affecting the URL structure.",
      "Server Components are the default now, which means better performance out of the box. Only add 'use client' when you actually need interactivity.",
    ],
  },
  {
    slug: "tailwind-tips",
    title: "Tailwind CSS Tips & Tricks",
    summary: "Useful patterns and utilities I've discovered while working with Tailwind.",
    date: "December 2025",
    tags: [
      { name: "CSS", color: "purple" },
      { name: "Tailwind", color: "cyan" },
    ],
    content: [
      "Tailwind CSS has become my go-to for styling. Here are some patterns I use frequently.",
      "The @apply directive is great for creating reusable utility classes in your globals.css. I use it for things like .card and .tag classes.",
      "CSS custom properties work great with Tailwind for theming. Define your colors as CSS variables and reference them in your tailwind config.",
    ],
  },
];

export function getNoteBySlug(slug: string): Note | undefined {
  return notes.find((n) => n.slug === slug);
}
