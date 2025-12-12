import { sql } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

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
    const result = await sql`SELECT count FROM clicks WHERE id = 1`;
    const count = result[0]?.count ?? 0;
    return NextResponse.json({ count });
  } catch {
    return NextResponse.json({ count: 0 });
  }
}

export async function POST(request: NextRequest) {
  const authError = checkAuth(request);
  if (authError) return authError;

  try {
    const result = await sql`
      UPDATE clicks SET count = count + 1 WHERE id = 1 RETURNING count
    `;
    return NextResponse.json({ count: result[0].count });
  } catch {
    return NextResponse.json({ error: 'Failed to increment' }, { status: 500 });
  }
}
