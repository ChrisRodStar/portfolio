import type { TagColor } from "@/components/ProjectCard";

export interface Contributor {
  login: string;
  avatar_url: string;
  html_url: string;
  contributions: number;
}

export interface Project {
  username: string;
  repo: string;
  description: string;
  stars?: number;
  forks?: number;
  contributors?: number;
  tags?: { name: string; color: TagColor }[];
  slug: string;
  date: string;
  fullDescription: string[];
}

export async function getContributors(
  username: string,
  repo: string
): Promise<Contributor[]> {
  try {
    const res = await fetch(
      `https://api.github.com/repos/${username}/${repo}/contributors?per_page=10`,
      {
        headers: process.env.GITHUB_TOKEN
          ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
          : {},
        next: { revalidate: 3600 }, // Cache for 1 hour
      }
    );
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export const projects: Project[] = [
  {
    username: "ChrisRodStar",
    repo: "four-brothers-outdoors",
    description:
      "Modern landscaping company website featuring elegant design, service showcases, and client booking.",
    tags: [
      { name: "Next.js", color: "blue" },
      { name: "TypeScript", color: "blue" },
      { name: "Tailwind", color: "cyan" },
    ],
    slug: "four-brothers-outdoors",
    date: "December 2025",
    contributors: 1,
    fullDescription: [
      "Four Brothers Outdoors is a premium landscaping company website built for a team of four friends who chose craftsmanship over corporate ladders. The site embodies their philosophy: 'We treat your home like our legacy.'",
      "The website features a stunning hero section with immersive imagery, showcasing their services across lawn care & maintenance, landscape design, and hardscaping & construction. Each service section highlights specific offerings like weekly precision mowing, 3D visualization, native plant selection, stone patios, and outdoor kitchens.",
      "Built with Next.js and TypeScript for a robust, type-safe foundation, styled with Tailwind CSS for a clean, modern aesthetic. The design emphasizes elegance and professionalism while maintaining excellent performance and accessibility.",
      "Key features include a responsive design that looks great on all devices, smooth animations, an intuitive quote request system, and a services showcase that effectively communicates the company's expertise in cultivating beautiful outdoor spaces.",
    ],
  },
  {
    username: "ChrisRodStar",
    repo: "portfolio",
    description:
      "Personal portfolio website showcasing projects, notes, and tutorials with a customizable Catppuccin theme.",
    tags: [
      { name: "Next.js", color: "blue" },
      { name: "TypeScript", color: "blue" },
      { name: "Tailwind", color: "cyan" },
    ],
    slug: "portfolio",
    date: "December 2025",
    contributors: 1,
    fullDescription: [
      "A modern, personal portfolio website built to showcase projects, share notes, and publish tutorials. Features a sleek design with full theme customization using the Catppuccin color palette.",
      "The site includes an interactive particle background effect, a projects showcase with GitHub integration for live stats, and sections for notes and tutorials to share knowledge with the community.",
      "Built with Next.js and TypeScript for type safety and performance, styled with Tailwind CSS. The theme system allows visitors to switch between Catppuccin flavors (Latte, Frappé, Macchiato, Mocha) and accent colors for a personalized experience.",
      "Key features include responsive design, dynamic GitHub stats fetching, a customizable theme system persisted to localStorage, and smooth animations throughout the interface.",
    ],
  },

];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
