"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Phone, LogIn, MapPin, Box, Home } from 'lucide-react';

const Navbar = () => {
    const pathname = usePathname();

    const getLinkStyle = (path: string) => {
        const isActive = pathname === path;
        return isActive
            ? "flex items-center gap-2 bg-[#F1592A] text-white px-5 py-2.5 rounded-lg text-[15px] font-medium transition-colors hover:bg-[#d64a20]"
            : "flex items-center gap-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-5 py-2.5 rounded-lg text-[15px] font-medium transition-colors";
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 h-[72px]">
            <div className="max-w-[1400px] mx-auto h-full px-6 flex items-center justify-between">
                {/* Logo Section */}
                <div className="flex items-center">
                    <Link href="/">
                        {/* The screenshot shows HUDHUD Express but we'll use a text placeholder styled similarly since we don't have the exact asset */}
                        <div className="flex flex-col items-center justify-center">
                            <span className="text-[#F1592A] font-bold text-2xl tracking-tight italic leading-none flex items-center">
                                HUD<span className="text-[#3B2A82]">HUD</span>
                            </span>
                            <span className="text-[10px] text-gray-500 font-medium tracking-widest ml-auto -mt-1 italic">EXPRESS</span>
                        </div>
                    </Link>
                </div>

                {/* Navigation Links */}
                <div className="flex-1 flex justify-center items-center gap-2">

                    <Link href="/" className={getLinkStyle("/")}>
                        <Box className="w-4 h-4" />
                        <span>Home</span>
                    </Link>

                    <Link href="/track" className={getLinkStyle("/track")}>
                        <Box className="w-4 h-4" />
                        <span>Track Package</span>
                    </Link>

                    <Link href="/branches" className={getLinkStyle("/branches")}>
                        <MapPin className="w-4 h-4" />
                        <span>Branches</span>
                    </Link>

                    <Link href="/contact" className={getLinkStyle("/contact")}>
                        <Phone className="w-4 h-4" />
                        <span>Contact</span>
                    </Link>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3">
                    <a href="tel:9491">
                        <Button
                            variant="default"
                            className="bg-[#5B429A] hover:bg-[#4a367d] text-white rounded-lg px-5 py-5 text-[15px] font-medium flex items-center gap-2 cursor-pointer"
                        >
                            <Phone className="w-4 h-4" />
                            9491
                        </Button>
                    </a>

                    <Link href="/login">
                        <Button
                            variant="outline"
                            className="border-gray-200 text-gray-700 hover:bg-gray-50 rounded-lg px-5 py-5 text-[15px] font-medium flex items-center gap-2 cursor-pointer"
                        >
                            <LogIn className="w-4 h-4 rotate-180" />
                            Login
                        </Button>
                    </Link>
                </div>
            </div>
            {/* Decorative bottom gradient/border based on screenshot */}
            <div className="h-1 w-full bg-gradient-to-r from-[#F1592A] to-[#3B2A82] opacity-80 mix-blend-multiply" />
        </nav>
    );
};

export default Navbar;
