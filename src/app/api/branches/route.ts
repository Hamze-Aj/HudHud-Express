import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'branches.json');

const DEFAULT_DATA = {
  whatsapp: '966500000000',
  branches: [] as Branch[],
};

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

function ensureDataFile(): BranchesData {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(DATA_FILE)) {
      fs.writeFileSync(DATA_FILE, JSON.stringify(DEFAULT_DATA, null, 2), 'utf-8');
      return DEFAULT_DATA;
    }
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(raw) as BranchesData;
  } catch {
    return DEFAULT_DATA;
  }
}

export async function GET() {
  try {
    const data = ensureDataFile();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: 'Failed to read branches data.' },
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

    // Ensure data directory exists
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }

    fs.writeFileSync(DATA_FILE, JSON.stringify(body, null, 2), 'utf-8');

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    // Check for permission errors
    if (message.includes('EACCES') || message.includes('EPERM')) {
      return NextResponse.json(
        {
          error:
            'Permission denied writing to data/branches.json. ' +
            'On cPanel: run `chmod 777 data` and `chmod 666 data/branches.json`.',
        },
        { status: 403 }
      );
    }
    return NextResponse.json({ error: `Failed to save: ${message}` }, { status: 500 });
  }
}
