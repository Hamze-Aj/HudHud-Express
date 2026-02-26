import React from 'react';
import Link from 'next/link';
import { Facebook, Instagram, Twitter, Linkedin, PhoneCall, Mail, MapPin, Box } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-[#121A2F] text-white pt-16 pb-8">
            <div className="max-w-[1400px] mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
                    {/* Brand Section */}
                    <div className="flex flex-col gap-6">
                        <div className="flex items-center gap-3">
                            <div className="bg-[#F1592A] p-2 rounded-lg">
                                <Box className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-xl font-bold tracking-tight">HudHud Express</span>
                        </div>
                        <p className="text-[#8E95A5] text-sm leading-relaxed max-w-[280px]">
                            Fast. Reliable. Nationwide courier service you can trust.
                        </p>
                        <div className="flex items-center gap-3">
                            <Link href="#" className="bg-[#1E2741] p-2.5 rounded-lg text-[#8E95A5] hover:text-white transition-colors">
                                <Facebook className="w-4 h-4" />
                            </Link>
                            <Link href="#" className="bg-[#1E2741] p-2.5 rounded-lg text-[#8E95A5] hover:text-white transition-colors">
                                <Instagram className="w-4 h-4" />
                            </Link>
                            <Link href="#" className="bg-[#1E2741] p-2.5 rounded-lg text-[#8E95A5] hover:text-white transition-colors">
                                <Twitter className="w-4 h-4" />
                            </Link>
                            <Link href="#" className="bg-[#1E2741] p-2.5 rounded-lg text-[#8E95A5] hover:text-white transition-colors">
                                <Linkedin className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-semibold text-base mb-6">Quick Links</h3>
                        <ul className="flex flex-col gap-4">
                            <li>
                                <Link href="/" className="text-[#8E95A5] hover:text-white text-sm transition-colors">Home</Link>
                            </li>
                            <li>
                                <Link href="/track" className="text-[#8E95A5] hover:text-white text-sm transition-colors">Track Package</Link>
                            </li>
                            <li>
                                <Link href="/branches" className="text-[#8E95A5] hover:text-white text-sm transition-colors">Our Branches</Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-[#8E95A5] hover:text-white text-sm transition-colors">Contact Us</Link>
                            </li>
                            <li>
                                <Link href="/login" className="text-[#8E95A5] hover:text-white text-sm transition-colors">Client Login</Link>
                            </li>
                            <li>
                                <Link href="/admin" className="text-[#8E95A5] hover:text-white text-sm transition-colors">Admin Login</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Our Services */}
                    <div>
                        <h3 className="text-white font-semibold text-base mb-6">Our Services</h3>
                        <ul className="flex flex-col gap-4">
                            <li>
                                <Link href="#" className="text-[#8E95A5] hover:text-white text-sm transition-colors">Express Delivery</Link>
                            </li>
                            <li>
                                <Link href="#" className="text-[#8E95A5] hover:text-white text-sm transition-colors">Same Day Delivery</Link>
                            </li>
                            <li>
                                <Link href="#" className="text-[#8E95A5] hover:text-white text-sm transition-colors">Next Day Delivery</Link>
                            </li>
                            <li>
                                <Link href="#" className="text-[#8E95A5] hover:text-white text-sm transition-colors">International Shipping</Link>
                            </li>
                            <li>
                                <Link href="#" className="text-[#8E95A5] hover:text-white text-sm transition-colors">Freight Services</Link>
                            </li>
                            <li>
                                <Link href="#" className="text-[#8E95A5] hover:text-white text-sm transition-colors">Business Solutions</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Us */}
                    <div>
                        <h3 className="text-white font-semibold text-base mb-6">Contact Us</h3>
                        <div className="flex flex-col gap-6">
                            <div className="flex items-start gap-4">
                                <PhoneCall className="w-5 h-5 text-[#F1592A]" />
                                <div className="flex flex-col">
                                    <span className="text-[#8E95A5] text-sm">Call Center</span>
                                    <span className="text-white font-medium">9491</span>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <Mail className="w-5 h-5 text-[#F1592A]" />
                                <div className="flex flex-col">
                                    <span className="text-[#8E95A5] text-sm">Email</span>
                                    <span className="text-white font-medium">info@hudhudexpress.com</span>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <MapPin className="w-5 h-5 text-[#F1592A]" />
                                <div className="flex flex-col">
                                    <span className="text-[#8E95A5] text-sm">Nationwide Service</span>
                                    <span className="text-white font-medium">All major cities</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-[#1E2741] flex flex-col md:flex-row items-center justify-center">
                    <p className="text-[#8E95A5] text-xs">
                        © 2026 HudHud Express. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
