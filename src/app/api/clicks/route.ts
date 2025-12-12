import { sql } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const result = await sql`SELECT count FROM clicks WHERE id = 1`;
    const count = result[0]?.count ?? 0;
    return NextResponse.json({ count });
  } catch {
    return NextResponse.json({ count: 0 });
  }
}

export async function POST() {
  try {
    const result = await sql`
      UPDATE clicks SET count = count + 1 WHERE id = 1 RETURNING count
    `;
    return NextResponse.json({ count: result[0].count });
  } catch {
    return NextResponse.json({ error: 'Failed to increment' }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    await sql`UPDATE clicks SET count = 0 WHERE id = 1`;
    return NextResponse.json({ count: 0 });
  } catch {
    return NextResponse.json({ error: 'Failed to reset' }, { status: 500 });
  }
}
