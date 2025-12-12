import Link from "next/link";
import Image from "next/image";
import type { Contributor } from "@/lib/projects";

export type TagColor = "blue" | "cyan" | "green" | "yellow" | "purple" | "pink" | "orange" | "red";

export interface Tag {
  name: string;
  color: TagColor;
}

export interface ProjectCardProps {
  username: string;
  repo: string;
  description: string;
  stars?: number;
  contributors?: Contributor[];
  tags?: Tag[];
  slug: string;
  from?: "home" | "projects";
}

export default function ProjectCard({
  username,
  repo,
  description,
  stars,
  contributors = [],
  slug,
  from,
}: ProjectCardProps) {
  const contributorCount = contributors.length || 1;
  const href = from ? `/projects/${slug}?from=${from}` : `/projects/${slug}`;

  return (
    <Link href={href} className="group">
      {/* Terminal Card */}
      <div className="bg-crust rounded-xl overflow-hidden border border-card-border hover:border-accent transition-colors flex flex-col h-[180px] shadow-lg shadow-accent/10">
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-mantle">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500"></span>
            <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
            <span className="w-3 h-3 rounded-full bg-green-500"></span>
            <p className="text-accent text-sm ml-2">
              {username} / <span className="text-foreground">{repo}</span>
            </p>
          </div>
          {stars !== undefined && (
            <span className="text-sm text-muted flex items-center gap-1">
              {stars.toLocaleString()} <span className="text-yellow-400">★</span>
            </span>
          )}
        </div>

        {/* Terminal Content */}
        <div className="p-4 flex flex-col flex-1">
          <p className="text-muted text-sm leading-relaxed line-clamp-2">{description}</p>

          {/* Contributors */}
          <div className="flex items-center justify-between mt-auto pt-3">
            <div className="flex -space-x-2">
              {contributors.length > 0
                ? contributors.slice(0, 4).map((c) => (
                    <Image
                      key={c.login}
                      src={c.avatar_url}
                      alt={c.login}
                      width={32}
                      height={32}
                      className="w-8 h-8 rounded-full border-2 border-crust"
                    />
                  ))
                : Array.from({ length: Math.min(contributorCount, 4) }).map((_, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-surface border-2 border-crust flex items-center justify-center text-xs text-muted"
                    >
                      {String.fromCharCode(65 + i)}
                    </div>
                  ))}
            </div>
            <span className="text-xs text-muted">
              {contributorCount} Contributor{contributorCount !== 1 ? "s" : ""}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
