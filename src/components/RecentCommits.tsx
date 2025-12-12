"use client";

import { useEffect, useState } from "react";

interface Commit {
  repo: string;
  message: string;
  url: string;
}

export default function RecentCommits() {
  const [commits, setCommits] = useState<Commit[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCommits() {
      try {
        const res = await fetch("/api/commits");
        const data = await res.json();

        if (data.error) {
          throw new Error(data.error);
        }

        setCommits(data);
      } catch (error) {
        console.error("Failed to fetch commits:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCommits();
  }, []);

  if (loading) {
    return (
      <div className="space-y-2 text-sm">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="h-5 bg-background rounded animate-pulse" />
        ))}
      </div>
    );
  }

  if (commits.length === 0) {
    return <p className="text-sm text-muted">No recent commits found.</p>;
  }

  return (
    <div className="space-y-2 text-sm overflow-hidden">
      {commits.map((commit, i) => (
        <div key={i} className="flex items-center text-muted min-w-0">
          <a
            href={`https://github.com/ChrisRodStar/${commit.repo}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline shrink-0"
          >
            {commit.repo}
          </a>
          <span className="mx-1 shrink-0">:</span>
          <a
            href={commit.url}
            target="_blank"
            rel="noopener noreferrer"
            className="truncate hover:text-hover transition-colors min-w-0"
          >
            {commit.message}
          </a>
        </div>
      ))}
    </div>
  );
}
