"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, ChevronDown, MapPin, Phone, Copy, ExternalLink } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

// Mock data based on the screenshot
const branchesData = [
    {
        id: 1,
        name: 'Riyadh Main Branch',
        region: 'Riyadh, Central',
        address: 'King Fahd Road, Al Olaya District, Riyadh',
        phone: '+966 11 234 5678',
        coords: '24.7136° N, 46.6753° E',
    },
    {
        id: 2,
        name: 'Jeddah Main Branch',
        region: 'Jeddah, Western',
        address: 'Prince Mohammed bin Abdulaziz Road, Al Hamra, Jeddah',
        phone: '+966 12 345 6789',
        coords: '21.5433° N, 39.1728° E',
    },
    {
        id: 3,
        name: 'Dammam Main Branch',
        region: 'Dammam, Eastern',
        address: 'King Saud Road, Al Faisaliyah District, Dammam',
        phone: '+966 13 456 7890',
        coords: '26.4207° N, 50.0888° E',
    },
    {
        id: 4,
        name: 'Makkah Branch',
        region: 'Makkah, Western',
        address: 'Ibrahim Al Khalil Road, Aziziyah District, Makkah',
        phone: '+966 12 567 8901',
        coords: '21.3891° N, 39.8579° E',
    },
    {
        id: 5,
        name: 'Madinah Branch',
        region: 'Madinah, Western',
        address: 'Al Madinah Al Munawwarah Road, Al Iskan, Madinah',
        phone: '+966 14 678 9012',
        coords: '24.5247° N, 39.5692° E',
    },
    {
        id: 6,
        name: 'Khobar Branch',
        region: 'Khobar, Eastern',
        address: 'Prince Turkey Street, Al Khobar, Eastern Province',
        phone: '+966 13 789 0123',
        coords: '26.2172° N, 50.1971° E',
    }
];

export default function BranchesPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedRegion, setSelectedRegion] = useState('all');

    const filteredBranches = branchesData.filter(branch => {
        const matchesSearch = branch.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            branch.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
            branch.region.toLowerCase().includes(searchQuery.toLowerCase());

        let matchesRegion = true;
        if (selectedRegion !== 'all') {
            matchesRegion = branch.region.toLowerCase().includes(selectedRegion.toLowerCase());
        }

        return matchesSearch && matchesRegion;
    });

    return (
        <div className="flex flex-col w-full min-h-screen bg-[#F8F9FA] pb-24">
            {/* Header Section */}
            <section className="pt-16 pb-10 text-center px-6">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                    Our Branches
                </h1>
                <p className="text-gray-500 text-[15px]">
                    Find the nearest HudHud Express location
                </p>
            </section>

            {/* Filter Options Container */}
            <section className="w-full max-w-[1100px] mx-auto px-6 mb-8">
                <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                            type="text"
                            placeholder="Search by city or address..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-9 h-11 border-gray-200 focus-visible:ring-[#3B2A82] text-[14px]"
                        />
                    </div>

                    <div className="relative w-full sm:w-[280px]">
                        <select
                            className="w-full h-11 pl-4 pr-10 appearance-none bg-white border border-gray-200 rounded-md text-[14px] text-gray-700 outline-none focus:border-[#3B2A82] cursor-pointer"
                            value={selectedRegion}
                            onChange={(e) => setSelectedRegion(e.target.value)}
                        >
                            <option value="all">All Regions</option>
                            <option value="central">Central Region</option>
                            <option value="western">Western Region</option>
                            <option value="eastern">Eastern Region</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                </div>
                <div className="mt-3 text-[13px] text-gray-500 px-1">
                    Showing {filteredBranches.length} of {branchesData.length} branches
                </div>
            </section>

            {/* Grid Section */}
            <section className="w-full max-w-[1100px] mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredBranches.map((branch) => (
                        <Card key={branch.id} className="border-0 shadow-sm overflow-hidden flex flex-col bg-white">
                            {/* Card Image Area */}
                            <div className="relative h-[180px] w-full bg-[#3B2A82]">
                                <div
                                    className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60 mix-blend-overlay"
                                    style={{
                                        // The screenshot shows a purple world map, representing the actual background element here
                                        backgroundImage: "url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')",
                                        backgroundSize: '200%',
                                        backgroundPosition: 'center',
                                        filter: 'blur(1px) contrast(1.5) brightness(0.8)'
                                    }}
                                />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-[60px] h-[110px] bg-white/10 border-2 border-white/40 rounded-[14px] backdrop-blur-sm flex items-center justify-center relative shadow-lg">
                                        <div className="absolute top-[6px] w-[20px] h-[3px] bg-white/60 rounded-full" />
                                        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mb-4">
                                            <MapPin className="w-5 h-5 text-white fill-white/20" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Card Content Area */}
                            <CardContent className="p-5 flex-1 flex flex-col">
                                <h3 className="text-[16px] font-bold text-gray-900 mb-2">{branch.name}</h3>

                                <div className="flex items-center gap-1.5 text-gray-500 mb-3">
                                    <MapPin className="w-3.5 h-3.5" />
                                    <span className="text-[13px]">{branch.region}</span>
                                </div>

                                <p className="text-[13px] text-gray-600 leading-relaxed min-h-[40px] mb-4">
                                    {branch.address}
                                </p>

                                <div className="flex items-center justify-between py-3 border-t border-b border-gray-100 mb-5 text-[13px] text-gray-700">
                                    <div className="flex items-center gap-2">
                                        <Phone className="w-3.5 h-3.5 text-gray-400" />
                                        <span>{branch.phone}</span>
                                    </div>
                                    <button className="text-[#3B2A82] hover:text-[#2a1d61] bg-[#3B2A82]/5 p-1.5 rounded-md transition-colors">
                                        <Copy className="w-4 h-4" />
                                    </button>
                                </div>

                                <div className="flex gap-3 mb-5 mt-auto">
                                    <a
                                        href={`https://wa.me/${branch.phone.replace(/[\s+]/g, '')}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-none font-semibold text-[14px] h-[42px] transition-colors rounded-[8px] flex items-center justify-center"
                                    >
                                        WhatsApp
                                    </a>
                                    <a
                                        href={`https://maps.google.com/?q=${branch.coords.replace(/[A-Za-z°]/g, '').replace(' ', '')}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 bg-[#F1592A] hover:bg-[#d64a20] text-white shadow-none font-semibold text-[14px] h-[42px] transition-colors flex items-center justify-center gap-2 rounded-[8px]"
                                    >
                                        <ExternalLink className="w-4 h-4" />
                                        Map
                                    </a>
                                </div>

                                <div className="flex items-center justify-between text-[11px] text-gray-500 pt-1">
                                    <span>{branch.coords}</span>
                                    <button className="text-[#3B2A82] hover:text-[#2a1d61] bg-[#3B2A82]/5 p-1 rounded transition-colors">
                                        <Copy className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>
        </div>
    );
}
