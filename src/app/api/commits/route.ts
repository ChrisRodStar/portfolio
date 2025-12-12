import { NextResponse } from 'next/server';

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

export async function GET() {
  try {
    const headers: Record<string, string> = {
      'Accept': 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
    };

    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    // Get recently pushed repos
    const reposRes = await fetch(
      'https://api.github.com/users/ChrisRodStar/repos?sort=pushed&per_page=5',
      { headers, next: { revalidate: 300 } }
    );

    if (!reposRes.ok) {
      throw new Error(`GitHub API error: ${reposRes.status}`);
    }

    const repos: GitHubRepo[] = await reposRes.json();

    // Fetch latest commit from each repo
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

    return NextResponse.json(allCommits);
  } catch (error) {
    console.error('Failed to fetch commits:', error);
    return NextResponse.json(
      { error: 'Failed to fetch commits' },
      { status: 500 }
    );
  }
}
