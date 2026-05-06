"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Search,
    Package,
    MapPin,
    Clock,
    CheckCircle2,

    Loader2,
    AlertCircle,
    RefreshCw,
    ArrowRight,
    Truck,
    PackageCheck,
    PackageOpen,
    Navigation,
    Home,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface HistoryItem {
    status: string;
    code: string;
    timestamp: string;
    location: string;
}

interface TrackingData {
    awb: string;
    source: string;
    destination: string;
    numPcs: number;
    history: HistoryItem[];
}

interface ApiResponse {
    status: number;
    message: string;
    data: TrackingData;
}

// ─── Status Config ────────────────────────────────────────────────────────────

const STATUS_CONFIG: Record<
    string,
    { label: string; icon: React.ElementType; color: string; bgColor: string; gradient: string }
> = {
    PAR: {
        label: "Order Created",
        icon: PackageOpen,
        color: "#6B7280",
        bgColor: "#F3F4F6",
        gradient: "from-gray-400 to-gray-500",
    },
    R4P: {
        label: "Ready for Pickup",
        icon: Home,
        color: "#8B5CF6",
        bgColor: "#EDE9FE",
        gradient: "from-violet-400 to-violet-600",
    },
    OTW: {
        label: "On the Way",
        icon: Truck,
        color: "#F59E0B",
        bgColor: "#FEF3C7",
        gradient: "from-amber-400 to-orange-500",
    },
    ARR: {
        label: "Arrived",
        icon: Navigation,
        color: "#3B82F6",
        bgColor: "#EFF6FF",
        gradient: "from-blue-400 to-blue-600",
    },
    DEL: {
        label: "Delivered",
        icon: PackageCheck,
        color: "#10B981",
        bgColor: "#ECFDF5",
        gradient: "from-emerald-400 to-emerald-600",
    },
};

// Fallback config for unknown status codes
const getStatusConfig = (code: string, statusText: string) => {
    if (STATUS_CONFIG[code]) return STATUS_CONFIG[code];
    const lower = statusText.toLowerCase();
    if (lower.includes("deliver")) return STATUS_CONFIG["DEL"];
    if (lower.includes("way") || lower.includes("transit")) return STATUS_CONFIG["OTW"];
    if (lower.includes("pickup") || lower.includes("pick")) return STATUS_CONFIG["R4P"];
    if (lower.includes("arriv")) return STATUS_CONFIG["ARR"];
    return STATUS_CONFIG["PAR"];
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatTimestamp(ts: string) {
    const date = new Date(ts);
    return {
        date: date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" }),
        time: date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
    };
}

function capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

// ─── Quick-track examples ─────────────────────────────────────────────────────

const QUICK_EXAMPLES = ["ETAA232"];

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatusBadge({ code, status }: { code: string; status: string }) {
    const cfg = getStatusConfig(code, status);
    return (
        <span
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
            style={{ color: cfg.color, backgroundColor: cfg.bgColor }}
        >
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: cfg.color }} />
            {cfg.label}
        </span>
    );
}

function TimelineStep({
    item,
    isLast,
    isLatest,
}: {
    item: HistoryItem;
    isLast: boolean;
    isLatest: boolean;
    index?: number;
}) {
    const cfg = getStatusConfig(item.code, item.status);
    const Icon = cfg.icon;
    const ts = formatTimestamp(item.timestamp);

    return (
        <div className="flex gap-4 group">
            {/* Left: Icon + line */}
            <div className="flex flex-col items-center shrink-0">
                <div
                    className={`relative w-10 h-10 rounded-full flex items-center justify-center shadow-sm transition-transform duration-300 group-hover:scale-110 ${isLatest
                            ? `bg-gradient-to-br ${cfg.gradient} ring-4 ring-offset-2`
                            : "bg-white border-2"
                        }`}
                    style={
                        isLatest
                            ? {}
                            : { borderColor: cfg.color + "60", backgroundColor: cfg.bgColor }
                    }
                >
                    <Icon
                        className="w-4 h-4"
                        style={{ color: isLatest ? "#fff" : cfg.color }}
                    />
                    {isLatest && (
                        <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-white border-2 border-current animate-pulse" style={{ borderColor: cfg.color }} />
                    )}
                </div>
                {!isLast && (
                    <div
                        className="w-0.5 flex-1 min-h-[32px] mt-1"
                        style={{ backgroundColor: cfg.color + "30" }}
                    />
                )}
            </div>

            {/* Right: Content */}
            <div className={`pb-6 flex-1 ${isLast ? "pb-0" : ""}`}>
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mb-1">
                    <span
                        className={`font-semibold text-sm ${isLatest ? "text-gray-900" : "text-gray-700"}`}
                    >
                        {cfg.label}
                    </span>
                    {isLatest && (
                        <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full" style={{ color: cfg.color, backgroundColor: cfg.bgColor }}>
                            LATEST
                        </span>
                    )}
                </div>
                <p className="text-xs text-gray-500 capitalize mb-1.5">
                    {capitalize(item.status)}
                </p>
                <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {item.location.trim()}
                    </span>
                    <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {ts.date} · {ts.time}
                    </span>
                </div>
            </div>
        </div>
    );
}

function PackageInfoCard({ data }: { data: TrackingData }) {
    const latest = data.history[data.history.length - 1];
    const cfg = latest ? getStatusConfig(latest.code, latest.status) : STATUS_CONFIG["PAR"];

    return (
        <div className="bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] overflow-hidden mb-6">
            {/* Gradient header */}
            <div className={`h-2 w-full bg-gradient-to-r ${cfg.gradient}`} />

            <div className="p-6">
                {/* AWB + status */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
                    <div>
                        <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold mb-1">
                            Tracking Number
                        </p>
                        <h2 className="text-2xl font-bold text-gray-900 tracking-tight font-mono">
                            {data.awb}
                        </h2>
                    </div>
                    {latest && <StatusBadge code={latest.code} status={latest.status} />}
                </div>

                {/* Route */}
                <div className="bg-gray-50 rounded-xl p-4 flex items-center gap-3">
                    <div className="flex-1 min-w-0">
                        <p className="text-[11px] text-gray-400 uppercase font-semibold mb-0.5">From</p>
                        <p className="text-sm font-semibold text-gray-800 truncate">{data.source.trim()}</p>
                    </div>

                    <div className="flex flex-col items-center gap-1 shrink-0 px-2">
                        <div className="flex items-center gap-1">
                            {[0, 1, 2].map((i) => (
                                <div key={i} className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                            ))}
                        </div>
                        <ArrowRight className="w-4 h-4 text-[#F1592A]" />
                        <div className="flex items-center gap-1">
                            {[0, 1, 2].map((i) => (
                                <div key={i} className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                            ))}
                        </div>
                    </div>

                    <div className="flex-1 min-w-0 text-right">
                        <p className="text-[11px] text-gray-400 uppercase font-semibold mb-0.5">To</p>
                        <p className="text-sm font-semibold text-gray-800 truncate">{data.destination.trim()}</p>
                    </div>
                </div>

                {/* Pieces */}
                {data.numPcs > 0 && (
                    <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
                        <Package className="w-4 h-4 text-gray-400" />
                        <span>{data.numPcs} piece{data.numPcs > 1 ? "s" : ""}</span>
                    </div>
                )}
            </div>
        </div>
    );
}

function Timeline({ history }: { history: HistoryItem[] }) {
    // Show newest first
    const reversed = [...history].reverse();
    return (
        <div className="bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] p-6">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-6 flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#F1592A]" />
                Tracking History
            </h3>
            <div>
                {reversed.map((item, idx) => (
                    <TimelineStep
                        key={idx}
                        item={item}
                        isLast={idx === reversed.length - 1}
                        isLatest={idx === 0}
                        index={idx}
                    />
                ))}
            </div>
        </div>
    );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function TrackPackagePage() {
    const searchParams = useSearchParams();
    const [awb, setAwb] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<TrackingData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleTrack = useCallback(async (trackingNumber?: string) => {
        const number = (trackingNumber ?? awb).trim().toUpperCase();
        if (!number) {
            inputRef.current?.focus();
            return;
        }

        setLoading(true);
        setError(null);
        setResult(null);
        if (trackingNumber) setAwb(trackingNumber);

        try {
            const res = await fetch(
                `https://api.hudhudexpress.com/public/tracking?awb=${encodeURIComponent(number)}`,
                { cache: "no-store" }
            );

            if (!res.ok) {
                throw new Error(`Server responded with ${res.status}`);
            }

            const json: ApiResponse = await res.json();

            if (json.status !== 200 || !json.data) {
                throw new Error(json.message || "Package not found. Please check your tracking number.");
            }

            setResult(json.data);
        } catch (err: unknown) {
            if (err instanceof TypeError && err.message === "Failed to fetch") {
                setError("Network error. Please check your connection and try again.");
            } else if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Something went wrong. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    }, [awb]);

    // Auto-track when redirected from homepage with ?awb=...
    useEffect(() => {
        const paramAwb = searchParams.get("awb");
        if (paramAwb) {
            const cleaned = paramAwb.trim().toUpperCase();
            setAwb(cleaned);
            handleTrack(cleaned);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleReset = () => {
        setResult(null);
        setError(null);
        setAwb("");
        setTimeout(() => inputRef.current?.focus(), 100);
    };

    return (
        <div className="flex flex-col w-full min-h-[calc(100vh-200px)] bg-[#FAFAFA]">

            {/* ── Hero Header ── */}
            <div className="relative bg-gradient-to-r from-[#F1592A] via-[#853E61] to-[#3B2A82] pt-14 pb-20 px-6 overflow-hidden">
                {/* Decorative background text */}
                <div className="absolute inset-0 flex justify-center items-center overflow-hidden pointer-events-none select-none">
                    <span className="text-white/[0.04] text-[120px] md:text-[180px] font-black tracking-widest whitespace-nowrap">
                        TRACK
                    </span>
                </div>

                <div className="relative z-10 text-center max-w-2xl mx-auto">
                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-5">
                        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-white/90 text-xs font-medium">Real-time tracking</span>
                    </div>
                    <h1 className="text-white text-3xl md:text-4xl font-bold mb-3 drop-shadow-md">
                        Track Your Package
                    </h1>
                    <p className="text-white/75 text-sm md:text-base">
                        Enter your AWB number to get live updates on your shipment
                    </p>
                </div>
            </div>

            {/* ── Search Card (overlapping hero) ── */}
            <div className="px-4 md:px-6 -mt-10 z-10 max-w-[820px] mx-auto w-full">
                <div className="bg-white rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] p-4 md:p-5">
                    <div className="flex flex-col sm:flex-row gap-3">
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                            <Input
                                ref={inputRef}
                                id="awb-input"
                                type="text"
                                value={awb}
                                onChange={(e) => setAwb(e.target.value.toUpperCase())}
                                onKeyDown={(e) => e.key === "Enter" && handleTrack()}
                                placeholder="e.g. ETAA... or ETJJ...."
                                className="h-12 pl-10 pr-4 text-sm font-mono border border-gray-200 rounded-xl focus-visible:ring-2 focus-visible:ring-[#F1592A]/40 focus-visible:border-[#F1592A] bg-gray-50 transition-all"
                                disabled={loading}
                                autoComplete="off"
                                spellCheck={false}
                            />
                        </div>
                        <Button
                            id="track-button"
                            onClick={() => handleTrack()}
                            disabled={loading || !awb.trim()}
                            className="h-12 px-8 bg-[#F1592A] hover:bg-[#d64a20] disabled:opacity-50 text-white font-semibold rounded-xl text-sm transition-all shadow-md shadow-[#F1592A]/20 hover:shadow-lg hover:shadow-[#F1592A]/30 active:scale-95 flex items-center gap-2 shrink-0"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Tracking…
                                </>
                            ) : (
                                <>
                                    <Search className="w-4 h-4" />
                                    Track
                                </>
                            )}
                        </Button>
                    </div>

                    {/* Quick-try examples */}
                    <div className="flex items-center gap-2 mt-3 flex-wrap">
                        <span className="text-xs text-gray-400 shrink-0">Try:</span>
                        {QUICK_EXAMPLES.map((ex) => (
                            <button
                                key={ex}
                                onClick={() => handleTrack(ex)}
                                disabled={loading}
                                className="text-xs font-mono font-medium text-[#F1592A] hover:text-[#d64a20] bg-[#FFF3F0] hover:bg-[#FFE9E3] px-2.5 py-1 rounded-lg transition-colors disabled:opacity-50 cursor-pointer"
                            >
                                {ex}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── Main Content ── */}
            <div className="flex-1 px-4 md:px-6 py-8 max-w-[820px] mx-auto w-full">

                {/* Loading state */}
                {loading && (
                    <div className="flex flex-col items-center justify-center py-20 gap-5">
                        <div className="relative">
                            <div className="w-16 h-16 rounded-full border-4 border-gray-100" />
                            <div className="absolute inset-0 w-16 h-16 rounded-full border-4 border-[#F1592A] border-t-transparent animate-spin" />
                            <Truck className="absolute inset-0 m-auto w-6 h-6 text-[#F1592A]" />
                        </div>
                        <div className="text-center">
                            <p className="text-gray-700 font-semibold text-sm">Looking up your shipment…</p>
                            <p className="text-gray-400 text-xs mt-1">This usually takes a moment</p>
                        </div>
                    </div>
                )}

                {/* Error state */}
                {!loading && error && (
                    <div className="flex flex-col items-center justify-center py-16 gap-4">
                        <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center">
                            <AlertCircle className="w-8 h-8 text-red-500" />
                        </div>
                        <div className="text-center max-w-sm">
                            <h3 className="text-gray-900 font-bold text-base mb-2">Tracking Failed</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">{error}</p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3 mt-2">
                            <Button
                                onClick={() => handleTrack()}
                                className="bg-[#F1592A] hover:bg-[#d64a20] text-white rounded-xl px-6 h-10 text-sm font-semibold flex items-center gap-2"
                            >
                                <RefreshCw className="w-4 h-4" />
                                Try Again
                            </Button>
                            <Button
                                variant="outline"
                                onClick={handleReset}
                                className="border-gray-200 text-gray-600 hover:bg-gray-50 rounded-xl px-6 h-10 text-sm font-medium"
                            >
                                Track Another
                            </Button>
                        </div>
                    </div>
                )}

                {/* Results */}
                {!loading && result && (
                    <div className="space-y-5">
                        {/* Package info card */}
                        <PackageInfoCard data={result} />

                        {/* Timeline */}
                        {result.history.length > 0 && (
                            <Timeline history={result.history} />
                        )}

                        {/* Track Another button */}
                        <div className="pt-2 pb-8">
                            <Button
                                id="track-another-button"
                                onClick={handleReset}
                                variant="outline"
                                className="w-full sm:w-auto border-2 border-[#F1592A] text-[#F1592A] hover:bg-[#FFF3F0] rounded-xl px-8 h-11 text-sm font-semibold flex items-center gap-2 transition-all"
                            >
                                <RefreshCw className="w-4 h-4" />
                                Track Another Package
                            </Button>
                        </div>
                    </div>
                )}

                {/* Empty / initial state */}
                {!loading && !result && !error && (
                    <div className="flex flex-col items-center justify-center py-20 gap-4">
                        <div className="relative">
                            <div className="w-20 h-20 bg-gray-50 rounded-2xl flex items-center justify-center border border-gray-100">
                                <Package className="w-9 h-9 text-gray-300" />
                            </div>
                            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-[#F1592A]/10 rounded-full flex items-center justify-center">
                                <Search className="w-4 h-4 text-[#F1592A]" />
                            </div>
                        </div>
                        <div className="text-center">
                            <p className="text-gray-600 font-semibold text-sm">Enter your tracking number above</p>
                            <p className="text-gray-400 text-xs mt-1">You&apos;ll see full shipment history and live status</p>
                        </div>

                        {/* Feature hints */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6 w-full max-w-lg">
                            {[
                                { icon: CheckCircle2, text: "Live status updates", color: "#10B981" },
                                { icon: Clock, text: "Full event history", color: "#3B82F6" },
                                { icon: MapPin, text: "Location at every step", color: "#F1592A" },
                            ].map(({ icon: Icon, text, color }) => (
                                <div key={text} className="flex items-center gap-2.5 bg-white rounded-xl px-4 py-3 shadow-sm border border-gray-100">
                                    <Icon className="w-4 h-4 shrink-0" style={{ color }} />
                                    <span className="text-xs text-gray-600 font-medium">{text}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
