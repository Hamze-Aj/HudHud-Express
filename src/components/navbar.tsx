"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Phone, LogIn, MapPin, Box, Menu, X } from 'lucide-react';

const Navbar = () => {
    const pathname = usePathname();
    const [menuOpen, setMenuOpen] = useState(false);

    // Close mobile menu on route change
    useEffect(() => {
        setMenuOpen(false);
    }, [pathname]);

    // Prevent body scroll when menu is open
    useEffect(() => {
        document.body.style.overflow = menuOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [menuOpen]);

    const getLinkStyle = (path: string) => {
        const isActive = pathname === path;
        return isActive
            ? "flex items-center gap-2 bg-[#F1592A] text-white px-5 py-2.5 rounded-lg text-[15px] font-medium transition-colors hover:bg-[#d64a20]"
            : "flex items-center gap-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-5 py-2.5 rounded-lg text-[15px] font-medium transition-colors";
    };

    const getMobileLinkStyle = (path: string) => {
        const isActive = pathname === path;
        return isActive
            ? "flex items-center gap-3 bg-[#F1592A] text-white px-4 py-3 rounded-xl text-base font-medium transition-colors"
            : "flex items-center gap-3 text-gray-700 hover:bg-gray-50 px-4 py-3 rounded-xl text-base font-medium transition-colors";
    };

    return (
        <>
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 h-[72px]">
                <div className="max-w-[1400px] mx-auto h-full px-4 sm:px-6 flex items-center justify-between">

                    {/* Logo */}
                    <Link href="/" className="flex items-center shrink-0">
                        <Image
                            src="/logoExpress.png"
                            alt="HudHud Express"
                            width={140}
                            height={48}
                            className="h-10 w-auto object-contain"
                            priority
                        />
                    </Link>

                    {/* Desktop Navigation Links */}
                    <div className="hidden lg:flex flex-1 justify-center items-center gap-2">
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

                    {/* Desktop Action Buttons */}
                    <div className="hidden lg:flex items-center gap-3">
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

                    {/* Mobile: Call button + Hamburger */}
                    <div className="flex lg:hidden items-center gap-2">
                        <a href="tel:9491">
                            <Button
                                variant="default"
                                size="sm"
                                className="bg-[#5B429A] hover:bg-[#4a367d] text-white rounded-lg px-3 py-2 text-sm font-medium flex items-center gap-1.5 cursor-pointer"
                            >
                                <Phone className="w-4 h-4" />
                                <span className="hidden sm:inline">9491</span>
                            </Button>
                        </a>
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            aria-label="Toggle menu"
                            className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
                        >
                            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

                {/* Decorative gradient border */}
                <div className="h-1 w-full bg-gradient-to-r from-[#F1592A] to-[#3B2A82] opacity-80 mix-blend-multiply" />
            </nav>

            {/* Mobile Menu Overlay */}
            <div
                className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
                    menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                }`}
                onClick={() => setMenuOpen(false)}
            />

            {/* Mobile Slide-in Drawer */}
            <aside
                className={`fixed top-0 right-0 z-50 h-full w-[280px] sm:w-[320px] bg-white shadow-2xl transform transition-transform duration-300 ease-in-out lg:hidden flex flex-col ${
                    menuOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                {/* Drawer Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                    <Image
                        src="/logoExpress.png"
                        alt="HudHud Express"
                        width={120}
                        height={40}
                        className="h-9 w-auto object-contain"
                    />
                    <button
                        onClick={() => setMenuOpen(false)}
                        aria-label="Close menu"
                        className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Drawer Links */}
                <nav className="flex-1 overflow-y-auto px-4 py-6 flex flex-col gap-2">
                    <Link href="/" className={getMobileLinkStyle("/")}>
                        <Box className="w-5 h-5" />
                        Home
                    </Link>
                    <Link href="/track" className={getMobileLinkStyle("/track")}>
                        <Box className="w-5 h-5" />
                        Track Package
                    </Link>
                    <Link href="/branches" className={getMobileLinkStyle("/branches")}>
                        <MapPin className="w-5 h-5" />
                        Branches
                    </Link>
                    <Link href="/contact" className={getMobileLinkStyle("/contact")}>
                        <Phone className="w-5 h-5" />
                        Contact
                    </Link>
                </nav>

                {/* Drawer Footer */}
                <div className="px-4 pb-8 pt-4 border-t border-gray-100 flex flex-col gap-3">
                    <Link href="/login" className="w-full">
                        <Button
                            variant="outline"
                            className="w-full border-gray-200 text-gray-700 hover:bg-gray-50 rounded-xl py-5 text-base font-medium flex items-center justify-center gap-2 cursor-pointer"
                        >
                            <LogIn className="w-4 h-4 rotate-180" />
                            Login
                        </Button>
                    </Link>
                </div>
            </aside>
        </>
    );
};

export default Navbar;
