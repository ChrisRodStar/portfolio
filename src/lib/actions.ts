"use server";

import { sql } from "@/lib/db";

export async function getClicks(): Promise<number> {
  try {
    const result = await sql`SELECT count FROM clicks WHERE id = 1`;
    return result[0]?.count ?? 0;
  } catch (error) {
    console.error("Error fetching clicks:", error);
    return 0;
  }
}

export async function incrementClicks(): Promise<number> {
  try {
    const result = await sql`
      UPDATE clicks SET count = count + 1 WHERE id = 1 RETURNING count
    `;
    return result[0]?.count ?? 0;
  } catch (error) {
    console.error("Error incrementing clicks:", error);
    return 0;
  }
}

interface Commit {
  repo: string;
  message: string;
  url: string;
}

interface GitHubCommit {
  sha: string;
  commit: {
    message: string;
  };
  html_url: string;
}

interface GitHubRepo {
  name: string;
  pushed_at: string;
}

export async function getCommits(): Promise<Commit[]> {
  try {
    const headers: Record<string, string> = {
      'Accept': 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
    };

    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    const reposRes = await fetch(
      'https://api.github.com/users/ChrisRodStar/repos?sort=pushed&per_page=5',
      { headers, next: { revalidate: 300 } }
    );

    if (!reposRes.ok) {
      throw new Error(`GitHub API error: ${reposRes.status}`);
    }

    const repos: GitHubRepo[] = await reposRes.json();

    const commitPromises = repos.map(async (repo) => {
      const commitsRes = await fetch(
        `https://api.github.com/repos/ChrisRodStar/${repo.name}/commits?per_page=4`,
        { headers, next: { revalidate: 300 } }
      );

      if (!commitsRes.ok) return [];

      const commits: GitHubCommit[] = await commitsRes.json();
      return commits.map((commit) => ({
        repo: repo.name,
        message: commit.commit.message.split('\n')[0],
        url: commit.html_url,
      }));
    });

    const allCommits = (await Promise.all(commitPromises)).flat().slice(0, 12);
    return allCommits;
  } catch (error) {
    console.error('Failed to fetch commits:', error);
    return [];
  }
}

