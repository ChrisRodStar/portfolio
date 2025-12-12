import NoteCard from "@/components/NoteCard";
import { notes } from "@/lib/notes";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Notes",
  description:
    "Development notes, learnings, and thoughts from Christopher Rodriguez.",
};

export default function NotesPage() {
  return (
    <main className="p-8 max-w-4xl mx-auto flex flex-col flex-1">
      <h1 className="text-2xl font-bold text-accent mb-6">Notes</h1>

      {notes.length === 0 ? (
        <p className="text-muted flex-1">No notes yet...</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2">
          {notes.map((note) => (
            <NoteCard
              key={note.slug}
              slug={note.slug}
              title={note.title}
              summary={note.summary}
              date={note.date}
              tags={note.tags}
            />
          ))}
        </div>
      )}
    </main>
  );
}
