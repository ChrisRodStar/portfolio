import Link from "next/link";
import type { TagColor } from "@/components/ProjectCard";

export interface Tag {
  name: string;
  color: TagColor;
}

export interface NoteCardProps {
  slug: string;
  title: string;
  summary: string;
  date: string;
  tags?: Tag[];
}

const tagColors: Record<TagColor, string> = {
  blue: "bg-blue-500/20 text-blue-400 border border-blue-500/30",
  cyan: "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30",
  green: "bg-green-500/20 text-green-400 border border-green-500/30",
  yellow: "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30",
  purple: "bg-purple-500/20 text-purple-400 border border-purple-500/30",
  pink: "bg-pink-500/20 text-pink-400 border border-pink-500/30",
  orange: "bg-orange-500/20 text-orange-400 border border-orange-500/30",
  red: "bg-red-500/20 text-red-400 border border-red-500/30",
};

export default function NoteCard({ slug, title, summary, date, tags = [] }: NoteCardProps) {
  return (
    <Link href={`/notes/${slug}`} className="group">
      <div className="bg-crust rounded-xl overflow-hidden border border-card-border hover:border-accent transition-colors flex flex-col h-[180px] shadow-lg shadow-accent/10">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-mantle gap-4">
          <div className="flex items-center gap-2 min-w-0">
            <span className="w-3 h-3 rounded-full bg-red-500 shrink-0"></span>
            <span className="w-3 h-3 rounded-full bg-yellow-500 shrink-0"></span>
            <span className="w-3 h-3 rounded-full bg-green-500 shrink-0"></span>
            <p className="text-accent text-sm ml-2 truncate">{title}</p>
          </div>
          <span className="text-xs text-muted whitespace-nowrap shrink-0">{date}</span>
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-1">
          <p className="text-muted text-sm leading-relaxed line-clamp-2">{summary}</p>

          {/* Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-auto pt-3">
              {tags.map((tag) => (
                <span
                  key={tag.name}
                  className={`px-2 py-0.5 rounded-full text-xs ${tagColors[tag.color]}`}
                >
                  {tag.name}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
