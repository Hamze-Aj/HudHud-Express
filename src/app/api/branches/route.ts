import { NextRequest, NextResponse } from 'next/server';
import { kv } from '@vercel/kv';

const KV_KEY = 'hhe_branches';

interface Branch {
  id: number;
  name: string;
  city: string;
  address: string;
  phone: string;
  mapsEmbed: string;
}

interface BranchesData {
  whatsapp: string;
  branches: Branch[];
}

const DEFAULT_DATA: BranchesData = {
  whatsapp: '966500000000',
  branches: [],
};

export async function GET() {
  try {
    const data = await kv.get<BranchesData>(KV_KEY);
    return NextResponse.json(data ?? DEFAULT_DATA);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('[branches GET]', message);
    return NextResponse.json(
      { error: `Failed to read branches data: ${message}` },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as BranchesData;

    if (!body || typeof body.whatsapp !== 'string' || !Array.isArray(body.branches)) {
      return NextResponse.json({ error: 'Invalid data format.' }, { status: 400 });
    }

    await kv.set(KV_KEY, body);

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('[branches POST]', message);
    return NextResponse.json({ error: `Failed to save: ${message}` }, { status: 500 });
  }
}
