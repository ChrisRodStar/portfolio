import { NextRequest, NextResponse } from 'next/server';

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

function checkAuth(request: NextRequest): NextResponse | null {
  const apiKey = request.headers.get('x-api-key');
  if (apiKey !== process.env.API_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  return null;
}

export async function GET(request: NextRequest) {
  const authError = checkAuth(request);
  if (authError) return authError;

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

    return NextResponse.json(allCommits, {
      headers: {
        'Access-Control-Allow-Origin': request.headers.get('origin') || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'x-api-key, Content-Type',
      }
    });
  } catch (error) {
    console.error('Failed to fetch commits:', error);
    return NextResponse.json(
      { error: 'Failed to fetch commits' },
      { status: 500 }
    );
  }
}
