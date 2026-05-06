'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import {
  Search,
  ChevronDown,
  MapPin,
  Phone,
  Copy,
  MessageCircle,
  CheckCheck,
} from 'lucide-react';

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

// Extract src from a full <iframe> string or return the URL as-is
function resolveEmbedSrc(raw: string): string {
  if (!raw) return '';
  const trimmed = raw.trim();
  if (trimmed.startsWith('<iframe')) {
    const match = trimmed.match(/src="([^"]+)"/);
    return match ? match[1] : '';
  }
  return trimmed;
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return (
    <button
      onClick={handleCopy}
      title="Copy to clipboard"
      className="text-[#3B2A82] hover:text-[#2a1d61] bg-[#3B2A82]/5 hover:bg-[#3B2A82]/10 p-1.5 rounded-md transition-colors"
    >
      {copied ? (
        <CheckCheck className="w-4 h-4 text-green-500" />
      ) : (
        <Copy className="w-4 h-4" />
      )}
    </button>
  );
}

export default function BranchesClient({ data }: { data: BranchesData }) {
  const { whatsapp, branches } = data;
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('all');

  // Build unique city list for filter
  const cities = Array.from(new Set(branches.map(b => b.city).filter(Boolean)));

  const filtered = branches.filter(branch => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      branch.name.toLowerCase().includes(q) ||
      branch.city.toLowerCase().includes(q) ||
      branch.address.toLowerCase().includes(q);
    const matchesCity =
      selectedCity === 'all' || branch.city.toLowerCase() === selectedCity.toLowerCase();
    return matchesSearch && matchesCity;
  });

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#F8F9FA] pb-24">

      {/* ── Hero Section ───────────────────────────────────────────── */}
      <section className="relative pt-14 pb-12 text-center px-6 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#3B2A82]/5 to-transparent pointer-events-none" />
        <div className="relative">
          <div className="inline-flex items-center gap-2 bg-[#3B2A82]/10 text-[#3B2A82] text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
            <MapPin className="w-3.5 h-3.5" />
            {branches.length} Locations Across the Kingdom
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Our Branches
          </h1>
          <p className="text-gray-500 text-[15px] max-w-md mx-auto">
            Find the nearest HudHud Express location to send or receive your packages.
          </p>
        </div>
      </section>

      {/* ── WhatsApp Banner ─────────────────────────────────────────── */}
      {whatsapp && (
        <section className="w-full max-w-[1100px] mx-auto px-6 mb-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-gradient-to-r from-[#25D366] to-[#1ebe5d] text-white rounded-2xl px-6 py-4 shadow-md shadow-[#25D366]/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-semibold text-sm">Our Call Center </p>
                <p className="text-white/80 text-xs mt-0.5">
                  Quick support — we reply fast
                </p>
              </div>
            </div>
            <a
              href={`https://wa.me/${whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 bg-white text-[#25D366] font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-white/90 transition-colors shadow-sm"
            >
              +{whatsapp}
            </a>
          </div>
        </section>
      )}

      {/* ── Filter Bar ─────────────────────────────────────────────── */}
      <section className="w-full max-w-[1100px] mx-auto px-6 mb-8">
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search by city or address…"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="pl-9 h-11 border-gray-200 focus-visible:ring-[#3B2A82] text-[14px] bg-gray-50"
            />
          </div>

          {/* City filter */}
          {cities.length > 0 && (
            <div className="relative w-full sm:w-[220px]">
              <select
                className="w-full h-11 pl-4 pr-10 appearance-none bg-gray-50 border border-gray-200 rounded-md text-[14px] text-gray-700 outline-none focus:border-[#3B2A82] cursor-pointer"
                value={selectedCity}
                onChange={e => setSelectedCity(e.target.value)}
              >
                <option value="all">All Cities</option>
                {cities.map(city => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          )}
        </div>

        <p className="mt-2 text-[13px] text-gray-400 px-1">
          Showing {filtered.length} of {branches.length} branch{branches.length !== 1 ? 'es' : ''}
        </p>
      </section>

      {/* ── Branch Cards ───────────────────────────────────────────── */}
      <section className="w-full max-w-[1100px] mx-auto px-6">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <MapPin className="w-12 h-12 text-gray-300 mb-3" />
            <p className="text-gray-500 font-medium">No branches found</p>
            <p className="text-gray-400 text-sm mt-1">Try adjusting your search or filter</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filtered.map(branch => {
              const embedSrc = resolveEmbedSrc(branch.mapsEmbed);
              const waHref = `https://wa.me/${whatsapp}`;

              return (
                <div
                  key={branch.id}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col group hover:shadow-md hover:border-[#3B2A82]/20 transition-all duration-300"
                >
                  {/* Map embed */}
                  {embedSrc ? (
                    <div className="relative w-full h-[220px] bg-gray-100 overflow-hidden">
                      <iframe
                        src={embedSrc}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title={`Map for ${branch.name}`}
                        className="w-full h-full"
                      />
                    </div>
                  ) : (
                    /* Fallback placeholder when no map provided */
                    <div className="relative h-[160px] w-full bg-gradient-to-br from-[#3B2A82] to-[#5B429A] flex items-center justify-center">
                      <div className="w-14 h-14 rounded-2xl bg-white/15 border border-white/30 flex items-center justify-center">
                        <MapPin className="w-7 h-7 text-white" />
                      </div>
                    </div>
                  )}

                  {/* Card content */}
                  <div className="p-5 flex flex-col flex-1">
                    {/* Name & city */}
                    <div className="mb-3">
                      <h3 className="text-[16px] font-bold text-gray-900 leading-snug">
                        {branch.name}
                      </h3>
                      {branch.city && (
                        <div className="flex items-center gap-1.5 text-gray-400 mt-1">
                          <MapPin className="w-3.5 h-3.5" />
                          <span className="text-[13px]">{branch.city}</span>
                        </div>
                      )}
                    </div>

                    {/* Address */}
                    {branch.address && (
                      <p className="text-[13px] text-gray-500 leading-relaxed mb-4">
                        {branch.address}
                      </p>
                    )}

                    {/* Phone row */}
                    {branch.phone && (
                      <div className="flex items-center justify-between py-3 border-t border-b border-gray-100 mb-4 text-[13px] text-gray-700">
                        <div className="flex items-center gap-2">
                          <Phone className="w-3.5 h-3.5 text-gray-400" />
                          <span>{branch.phone}</span>
                        </div>
                        <CopyButton text={branch.phone} />
                      </div>
                    )}

                    {/* Action buttons */}
                    <div className="flex gap-3 mt-auto">
                      {whatsapp && (
                        <a
                          href={waHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-semibold text-[13px] h-[42px] transition-colors rounded-xl flex items-center justify-center gap-2 shadow-sm"
                        >
                          <MessageCircle className="w-4 h-4" />
                          WhatsApp
                        </a>
                      )}
                      {embedSrc && (
                        <a
                          href={embedSrc.replace('/embed?', '/search?')}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 bg-[#F1592A] hover:bg-[#d64a20] text-white font-semibold text-[13px] h-[42px] transition-colors rounded-xl flex items-center justify-center gap-2 shadow-sm"
                        >
                          <MapPin className="w-4 h-4" />
                          Open Map
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
