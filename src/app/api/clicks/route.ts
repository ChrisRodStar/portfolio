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
    return NextResponse.json({ count }, {
      headers: {
        'Access-Control-Allow-Origin': request.headers.get('origin') || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
        'Access-Control-Allow-Methods': 'GET, POST',
        'Access-Control-Allow-Headers': 'x-api-key, Content-Type',
      }
    });
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
    return NextResponse.json({ count: result[0].count }, {
      headers: {
        'Access-Control-Allow-Origin': request.headers.get('origin') || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
        'Access-Control-Allow-Methods': 'GET, POST',
        'Access-Control-Allow-Headers': 'x-api-key, Content-Type',
      }
    });
  } catch {
    return NextResponse.json({ error: 'Failed to increment' }, { status: 500 });
  }
}
