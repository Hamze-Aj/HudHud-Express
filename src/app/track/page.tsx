"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Box } from 'lucide-react';

export default function TrackPackagePage() {
    return (
        <div className="flex flex-col w-full min-h-[calc(100vh-400px)] bg-[#FaFaFa]">

            {/* Header Section */}
            <div className="pt-24 pb-12 px-6 text-center">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Track Your Package</h1>
                <p className="text-gray-500 text-base">Enter your tracking number to see real-time updates</p>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col items-center px-6">

                {/* Search Container */}
                <div className="w-full max-w-[800px] bg-white rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.06)] p-3 md:p-4 mb-24 flex items-center gap-3">
                    <div className="relative flex-1 flex items-center">
                        <Search className="absolute left-4 w-5 h-5 text-gray-400" />
                        <Input
                            type="text"
                            placeholder="Enter tracking number (e.g., HD123456789)"
                            className="w-full h-12 pl-12 pr-4 border border-gray-100 rounded-lg bg-white text-base focus-visible:ring-1 focus-visible:ring-[#F1592A] shadow-inner"
                        />
                    </div>
                    <Button className="h-12 px-8 bg-[#F1592A] hover:bg-[#d64a20] text-white font-semibold rounded-lg text-sm transition-colors">
                        Track
                    </Button>
                </div>

                {/* Empty State / Initial View */}
                <div className="flex flex-col items-center justify-center pb-32">
                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                        <Box className="w-10 h-10 text-gray-400" />
                    </div>
                    <p className="text-gray-500 text-sm">Enter a tracking number to see your package details</p>
                </div>

            </div>
        </div>
    );
}
