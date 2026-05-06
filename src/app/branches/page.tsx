import { kv } from '@vercel/kv';
import BranchesClient from './BranchesClient';

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

// Always server-render so we get fresh KV data on every request
export const dynamic = 'force-dynamic';

export default async function BranchesPage() {
  let data: BranchesData = DEFAULT_DATA;

  try {
    const stored = await kv.get<BranchesData>('hhe_branches');
    if (stored) data = stored;
  } catch (err) {
    // KV not configured or unreachable — fall back to defaults silently
    console.error('[BranchesPage] KV error:', err);
  }

  return <BranchesClient data={data} />;
}
