import Link from "next/link";
import { getNoteBySlug, notes } from "@/lib/notes";

export function generateStaticParams() {
  return notes.map((note) => ({
    slug: note.slug,
  }));
}

export default async function NotePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const note = getNoteBySlug(slug);

  if (!note) {
    return (
      <div className="p-6 max-w-4xl mx-auto flex-1">
        <div className="text-center py-20">
          <h1 className="text-3xl font-bold mb-4">Note Not Found</h1>
          <Link href="/notes" className="text-accent hover:underline">
            ← Back to Notes
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto flex-1">
      {/* Back Link */}
      <div className="mb-6">
        <Link href="/notes" className="text-accent hover:underline text-sm">
          ← Back to Notes
        </Link>
      </div>

      {/* Note Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-4">{note.title}</h1>

        <div className="flex items-center gap-4 text-sm text-muted mb-4">
          <span className="flex items-center gap-1">
            <CalendarIcon /> {note.date}
          </span>
        </div>

        {note.tags && note.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {note.tags.map((tag) => (
              <span
                key={tag.name}
                className="text-xs px-2 py-1 bg-accent/20 text-accent rounded"
              >
                {tag.name}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* Note Content */}
      <article className="mb-12">
        <div className="space-y-4 text-muted leading-relaxed">
          {note.content.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </article>
    </div>
  );
}

function CalendarIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  );
}
