import React from 'react';
import fs from 'fs';
import path from 'path';
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

function loadBranchesData(): BranchesData {
  try {
    const filePath = path.join(process.cwd(), 'data', 'branches.json');
    if (!fs.existsSync(filePath)) return DEFAULT_DATA;
    const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw) as BranchesData;
  } catch {
    return DEFAULT_DATA;
  }
}

// Server Component: reads file at request time, no caching
export const dynamic = 'force-dynamic';

export default function BranchesPage() {
  const data = loadBranchesData();
  return <BranchesClient data={data} />;
}
