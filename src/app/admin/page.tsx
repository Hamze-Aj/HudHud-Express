'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  LogOut,
  Plus,
  Trash2,
  Save,
  Lock,
  User,
  Phone,
  MapPin,
  Building2,
  Map,
  CheckCircle,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Eye,
  Loader2,
} from 'lucide-react';

// ─── CONFIG ──────────────────────────────────────────────────────────────────
// To change credentials, update the two constants below:
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'hudhud123';
// ─────────────────────────────────────────────────────────────────────────────

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

const emptyBranch = (): Branch => ({
  id: Date.now(),
  name: '',
  city: '',
  address: '',
  phone: '',
  mapsEmbed: '',
});

// ─── LOGIN SCREEN ─────────────────────────────────────────────────────────────
function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setTimeout(() => {
      if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        sessionStorage.setItem('hhe_admin_auth', '1');
        onLogin();
      } else {
        setError('Invalid username or password.');
      }
      setLoading(false);
    }, 400);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1a1040] via-[#2d1f6e] to-[#3B2A82] px-4">
      {/* Decorative blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#F1592A]/20 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#5B429A]/30 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <div className="relative w-full max-w-md">
        {/* Card */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-8">
          {/* Logo area */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#F1592A] to-[#d64a20] flex items-center justify-center shadow-lg mb-4">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">Admin Panel</h1>
            <p className="text-white/60 text-sm mt-1">HudHud Express — Branch Management</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username */}
            <div>
              <label className="block text-white/70 text-sm font-medium mb-1.5">Username</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                <input
                  id="admin-username"
                  type="text"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  placeholder="Enter username"
                  autoComplete="username"
                  required
                  className="w-full bg-white/10 border border-white/20 rounded-xl pl-10 pr-4 py-3 text-white placeholder-white/30 text-sm outline-none focus:border-[#F1592A] focus:ring-2 focus:ring-[#F1592A]/30 transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-white/70 text-sm font-medium mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                <input
                  id="admin-password"
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter password"
                  autoComplete="current-password"
                  required
                  className="w-full bg-white/10 border border-white/20 rounded-xl pl-10 pr-4 py-3 text-white placeholder-white/30 text-sm outline-none focus:border-[#F1592A] focus:ring-2 focus:ring-[#F1592A]/30 transition-all"
                />
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-center gap-2 bg-red-500/20 border border-red-500/30 text-red-300 text-sm px-4 py-2.5 rounded-xl">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              id="admin-login-btn"
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#F1592A] to-[#d64a20] hover:from-[#d64a20] hover:to-[#c23f18] text-white font-semibold py-3 rounded-xl text-sm transition-all shadow-lg shadow-[#F1592A]/30 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed mt-2"
            >
              {loading ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Signing in...</>
              ) : (
                'Sign In'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

// ─── BRANCH CARD (editable) ───────────────────────────────────────────────────
function BranchCard({
  branch,
  index,
  onChange,
  onDelete,
}: {
  branch: Branch;
  index: number;
  onChange: (updated: Branch) => void;
  onDelete: () => void;
}) {
  const [collapsed, setCollapsed] = useState(false);

  const field = (
    key: keyof Branch,
    label: string,
    icon: React.ReactNode,
    placeholder: string,
    textarea = false
  ) => (
    <div>
      <label className="block text-xs font-medium text-gray-500 mb-1">{label}</label>
      <div className="relative">
        <span className="absolute left-3 top-3 text-gray-400">{icon}</span>
        {textarea ? (
          <textarea
            value={branch[key] as string}
            onChange={e => onChange({ ...branch, [key]: e.target.value })}
            placeholder={placeholder}
            rows={3}
            className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl outline-none focus:border-[#3B2A82] focus:ring-2 focus:ring-[#3B2A82]/10 transition-all resize-none bg-gray-50"
          />
        ) : (
          <input
            type="text"
            value={branch[key] as string}
            onChange={e => onChange({ ...branch, [key]: e.target.value })}
            placeholder={placeholder}
            className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl outline-none focus:border-[#3B2A82] focus:ring-2 focus:ring-[#3B2A82]/10 transition-all bg-gray-50"
          />
        )}
      </div>
    </div>
  );

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
      {/* Card Header */}
      <div className="flex items-center justify-between px-5 py-4 bg-gradient-to-r from-[#3B2A82]/5 to-transparent border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#3B2A82] flex items-center justify-center text-white font-bold text-sm">
            {index + 1}
          </div>
          <div>
            <p className="font-semibold text-gray-800 text-sm">
              {branch.name || <span className="text-gray-400 font-normal italic">Untitled Branch</span>}
            </p>
            {branch.city && <p className="text-xs text-gray-500">{branch.city}</p>}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCollapsed(c => !c)}
            className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors"
            title={collapsed ? 'Expand' : 'Collapse'}
          >
            {collapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
          </button>
          <button
            onClick={onDelete}
            className="p-1.5 rounded-lg hover:bg-red-50 text-red-400 hover:text-red-500 transition-colors"
            title="Delete branch"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Card Fields */}
      {!collapsed && (
        <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
          {field('name', 'Branch Name', <Building2 className="w-4 h-4" />, 'e.g. Riyadh Main Branch')}
          {field('city', 'City', <MapPin className="w-4 h-4" />, 'e.g. Riyadh')}
          {field('address', 'Full Address', <MapPin className="w-4 h-4" />, 'e.g. King Fahd Road, Al Olaya...')}
          {field('phone', 'Phone Number', <Phone className="w-4 h-4" />, 'e.g. +966 11 234 5678')}
          <div className="md:col-span-2">
            {field(
              'mapsEmbed',
              'Google Maps Embed URL or full <iframe> code',
              <Map className="w-4 h-4" />,
              'Paste Google Maps embed URL or full <iframe> code here...',
              true
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── DASHBOARD ────────────────────────────────────────────────────────────────
function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [data, setData] = useState<BranchesData>({ whatsapp: '', branches: [] });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/branches');
      const json = await res.json();
      setData(json);
    } catch {
      setStatus({ type: 'error', msg: 'Failed to load data from server.' });
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const router = useRouter();

  const handleSave = async () => {
    setSaving(true);
    setStatus(null);
    try {
      const res = await fetch('/api/branches', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (res.ok) {
        setStatus({ type: 'success', msg: 'Saved! Redirecting to Branches page…' });
        setTimeout(() => router.push('/branches'), 800);
      } else {
        setStatus({ type: 'error', msg: json.error || 'Failed to save.' });
        setSaving(false);
      }
    } catch {
      setStatus({ type: 'error', msg: 'Network error. Could not reach server.' });
      setSaving(false);
    }
  };

  const addBranch = () => {
    setData(d => ({ ...d, branches: [...d.branches, emptyBranch()] }));
  };

  const updateBranch = (index: number, updated: Branch) => {
    setData(d => {
      const branches = [...d.branches];
      branches[index] = updated;
      return { ...d, branches };
    });
  };

  const deleteBranch = (index: number) => {
    if (!confirm('Are you sure you want to delete this branch?')) return;
    setData(d => ({ ...d, branches: d.branches.filter((_, i) => i !== index) }));
  };

  return (
    <div className="min-h-screen bg-[#F4F6FB]">
      {/* Top bar */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#3B2A82] to-[#5B429A] flex items-center justify-center">
              <Building2 className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="font-bold text-gray-900 text-base">Admin Dashboard</span>
              <span className="ml-2 text-xs text-gray-400 hidden sm:inline">HudHud Express</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="/branches"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-[#3B2A82] border border-gray-200 hover:border-[#3B2A82] px-3 py-1.5 rounded-lg transition-colors"
            >
              <Eye className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Preview</span>
            </a>
            <button
              onClick={onLogout}
              className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-red-500 border border-gray-200 hover:border-red-200 px-3 py-1.5 rounded-lg transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">

        {/* Status message */}
        {status && (
          <div
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium border ${status.type === 'success'
                ? 'bg-green-50 border-green-200 text-green-700'
                : 'bg-red-50 border-red-200 text-red-700'
              }`}
          >
            {status.type === 'success' ? (
              <CheckCircle className="w-4 h-4 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 shrink-0" />
            )}
            {status.msg}
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-24 gap-3 text-gray-400">
            <Loader2 className="w-5 h-5 animate-spin" />
            Loading data…
          </div>
        ) : (
          <>
            {/* WhatsApp Section */}
            <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl bg-[#25D366]/10 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-[#25D366]" />
                </div>
                <div>
                  <h2 className="font-semibold text-gray-900">Company WhatsApp Number</h2>
                  <p className="text-xs text-gray-500">Used for the floating WhatsApp button sitewide</p>
                </div>
              </div>
              <div className="relative">
                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  id="whatsapp-number"
                  type="text"
                  value={data.whatsapp}
                  onChange={e => setData(d => ({ ...d, whatsapp: e.target.value }))}
                  placeholder="e.g. 966500000000 (no + or spaces)"
                  className="w-full pl-10 pr-4 py-3 text-sm border border-gray-200 rounded-xl outline-none focus:border-[#25D366] focus:ring-2 focus:ring-[#25D366]/10 transition-all bg-gray-50"
                />
              </div>
              <p className="mt-2 text-xs text-gray-400">Format: country code + number without spaces (e.g. 966501234567)</p>
            </section>

            {/* Branches Section */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#3B2A82]/10 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-[#3B2A82]" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-gray-900">Branches</h2>
                    <p className="text-xs text-gray-500">{data.branches.length} branch{data.branches.length !== 1 ? 'es' : ''}</p>
                  </div>
                </div>
                <button
                  id="add-branch-btn"
                  onClick={addBranch}
                  className="flex items-center gap-2 bg-[#3B2A82] hover:bg-[#2a1d61] text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-colors shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  Add Branch
                </button>
              </div>

              {data.branches.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 bg-white rounded-2xl border border-dashed border-gray-300 text-center">
                  <MapPin className="w-10 h-10 text-gray-300 mb-3" />
                  <p className="text-gray-500 font-medium">No branches yet</p>
                  <p className="text-gray-400 text-sm mt-1">Click &ldquo;Add Branch&rdquo; to get started</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {data.branches.map((branch, i) => (
                    <BranchCard
                      key={branch.id}
                      branch={branch}
                      index={i}
                      onChange={updated => updateBranch(i, updated)}
                      onDelete={() => deleteBranch(i)}
                    />
                  ))}
                </div>
              )}
            </section>

            {/* Save Button */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-400 text-center sm:text-left">
                <code className="bg-gray-100 px-1.5 py-0.5 rounded text-gray-600 font-mono"></code>
              </p>
              <button
                id="save-changes-btn"
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 bg-gradient-to-r from-[#F1592A] to-[#d64a20] hover:from-[#d64a20] hover:to-[#c23f18] text-white font-semibold px-8 py-3 rounded-xl transition-all shadow-md shadow-[#F1592A]/20 disabled:opacity-60 disabled:cursor-not-allowed text-sm"
              >
                {saving ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Saving…</>
                ) : (
                  <><Save className="w-4 h-4" /> Save Changes</>
                )}
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

// ─── PAGE ROOT ────────────────────────────────────────────────────────────────
export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (sessionStorage.getItem('hhe_admin_auth') === '1') {
      setAuthed(true);
    }
    setChecking(false);
  }, []);

  const handleLogin = () => setAuthed(true);
  const handleLogout = () => {
    sessionStorage.removeItem('hhe_admin_auth');
    setAuthed(false);
  };

  if (checking) return null;
  if (!authed) return <LoginScreen onLogin={handleLogin} />;
  return <Dashboard onLogout={handleLogout} />;
}
