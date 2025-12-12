"use server";

const API_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

async function fetchWithAuth(endpoint: string, options: RequestInit = {}) {
  return fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      ...options.headers,
      'x-api-key': process.env.API_SECRET || '',
    },
  });
}

export async function getClicks(): Promise<number> {
  try {
    const res = await fetchWithAuth('/api/clicks');
    const data = await res.json();
    return data.count ?? 0;
  } catch {
    return 0;
  }
}

export async function incrementClicks(): Promise<number> {
  try {
    const res = await fetchWithAuth('/api/clicks', { method: 'POST' });
    const data = await res.json();
    return data.count ?? 0;
  } catch {
    return 0;
  }
}

interface Commit {
  repo: string;
  message: string;
  url: string;
}

export async function getCommits(): Promise<Commit[]> {
  try {
    const res = await fetchWithAuth('/api/commits');
    const data = await res.json();
    if (data.error) return [];
    return data;
  } catch {
    return [];
  }
}
