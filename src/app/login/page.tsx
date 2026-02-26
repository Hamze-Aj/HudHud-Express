"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Lock } from 'lucide-react';

export default function LoginPage() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false
    });

    return (
        <div className="flex flex-col w-full min-h-screen items-center justify-center p-6 relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #F1592A 0%, #853E61 45%, #3B2A82 100%)' }}>

            {/* Decorative background overlay pattern (optional/subtle) */}
            <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: 'radial-gradient(circle at center, white 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

            {/* Main Login Card */}
            <Card className="w-full max-w-[420px] bg-white border-0 shadow-2xl rounded-xl overflow-hidden relative z-10">
                <CardContent className="p-8 md:p-10 flex flex-col items-center">

                    {/* Logo Placeholder */}
                    <Link href="/" className="mb-6 flex flex-col items-center justify-center cursor-pointer hover:opacity-90 transition-opacity">
                        <span className="text-[#F1592A] font-extrabold text-2xl tracking-tight italic leading-none flex items-center">
                            HUD<span className="text-[#3B2A82]">HUD</span>
                        </span>
                        <span className="text-[10px] text-[#3B2A82] font-bold tracking-[0.2em] ml-auto mt-0.5 italic">EXPRESS</span>
                    </Link>

                    <div className="text-center w-full mb-8">
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">Client Login</h1>
                        <p className="text-gray-500 text-[14px]">Access your shipment dashboard</p>
                    </div>

                    <form className="w-full space-y-5" onSubmit={(e) => e.preventDefault()}>

                        {/* Email/Phone Input */}
                        <div className="space-y-1.5 w-full">
                            <label className="text-[13px] font-medium text-gray-700">Email / Phone</label>
                            <div className="relative">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center text-gray-400">
                                    <Mail className="w-4 h-4" />
                                </div>
                                <Input
                                    type="text"
                                    placeholder="email@example.com or +966XXXXXXXXX"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="pl-10 h-11 border-gray-200 focus-visible:ring-[#3B2A82] text-[13px] w-full"
                                />
                            </div>
                        </div>

                        {/* Password Input */}
                        <div className="space-y-1.5 w-full">
                            <label className="text-[13px] font-medium text-gray-700">Password</label>
                            <div className="relative">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center text-gray-400">
                                    <Lock className="w-4 h-4" />
                                </div>
                                <Input
                                    type="password"
                                    placeholder="********"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    className="pl-10 h-11 border-gray-200 focus-visible:ring-[#3B2A82] text-[14px] w-full"
                                />
                            </div>
                        </div>

                        {/* Remember Me & Forgot Password */}
                        <div className="flex items-center justify-between w-full pt-1 pb-2">
                            <div className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    id="remember"
                                    checked={formData.rememberMe}
                                    onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
                                    className="w-4 h-4 rounded border-gray-300 text-gray-900 focus:ring-[#F1592A] cursor-pointer"
                                />
                                <label htmlFor="remember" className="text-[13px] font-medium text-gray-600 cursor-pointer select-none">
                                    Remember me
                                </label>
                            </div>
                            <Link href="#" className="text-[13px] font-medium text-[#F1592A] hover:text-[#d64a20] transition-colors">
                                Forgot Password?
                            </Link>
                        </div>

                        {/* Sign In Button */}
                        <Button
                            type="submit"
                            className="w-full text-white font-bold h-11 shadow-md hover:shadow-lg transition-all rounded-md"
                            style={{ background: 'linear-gradient(90deg, #F1592A 0%, #3B2A82 100%)' }}
                        >
                            Sign In
                        </Button>

                    </form>

                    <div className="w-full mt-6 text-center text-[13px] text-gray-500">
                        Don't have an account?{' '}
                        <Link href="#" className="font-bold text-[#F1592A] hover:text-[#d64a20] transition-colors">
                            Register
                        </Link>
                    </div>

                    <div className="w-full mt-6 pt-6 border-t border-gray-100 text-center text-[12px] text-gray-400">
                        Need help?{' '}
                        <span className="font-bold text-[#F1592A]">
                            Call 9491
                        </span>
                    </div>

                </CardContent>
            </Card>

            {/* Demo Mode Banner */}
            <div className="w-full max-w-[420px] mt-4 bg-white/90 backdrop-blur-sm shadow-md rounded-md py-3 px-4 text-center z-10">
                <p className="text-[11px] font-medium text-gray-700">
                    <span className="font-bold text-gray-900">Demo Mode:</span> Click "Sign In" to view the dashboard
                </p>
            </div>

        </div>
    );
}
