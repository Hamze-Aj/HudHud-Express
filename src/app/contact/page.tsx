"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from "@/components/ui/card";
import { Phone, MessageCircle, Mail, MapPin, Send, Clock } from 'lucide-react';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        message: ''
    });

    return (
        <div className="flex flex-col w-full min-h-screen bg-[#F8F9FA] pb-24">
            {/* Header Section */}
            <section className="pt-16 pb-10 text-center px-6">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                    Contact & Support
                </h1>
                <p className="text-gray-500 text-[15px]">
                    We're here to help with any questions or concerns
                </p>
            </section>

            {/* Top 4 Cards Grid */}
            <section className="w-full max-w-[1100px] mx-auto px-6 mb-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Card 1 */}
                    <Card className="border-0 shadow-sm bg-white hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                            <div className="w-10 h-10 rounded-lg bg-[#F1592A] flex items-center justify-center mb-4">
                                <Phone className="w-5 h-5 text-white" />
                            </div>
                            <h3 className="font-bold text-gray-900 text-[15px] mb-1">Call Center</h3>
                            <p className="font-bold text-gray-900 text-[14px]">9491</p>
                            <p className="text-gray-500 text-[13px] mt-1">Available 24/7</p>
                        </CardContent>
                    </Card>

                    {/* Card 2 */}
                    <Card className="border-0 shadow-sm bg-white hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                            <div className="w-10 h-10 rounded-lg bg-[#25D366] flex items-center justify-center mb-4">
                                <MessageCircle className="w-5 h-5 text-white" />
                            </div>
                            <h3 className="font-bold text-gray-900 text-[15px] mb-1">WhatsApp</h3>
                            <p className="font-bold text-gray-900 text-[14px]">+251 98 334 6090</p>
                            <p className="text-gray-500 text-[13px] mt-1">Quick support</p>
                        </CardContent>
                    </Card>

                    {/* Card 3 */}
                    <Card className="border-0 shadow-sm bg-white hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                            <div className="w-10 h-10 rounded-lg bg-[#3B2A82] flex items-center justify-center mb-4">
                                <Mail className="w-5 h-5 text-white" />
                            </div>
                            <h3 className="font-bold text-gray-900 text-[15px] mb-1">Email</h3>
                            <p className="font-bold text-gray-900 text-[14px]">info@hudhudexpress.com</p>
                            <p className="text-gray-500 text-[13px] mt-1">We reply within 24 hours</p>
                        </CardContent>
                    </Card>

                    {/* Card 4 */}
                    <Card className="border-0 shadow-sm bg-white hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                            <div className="w-10 h-10 rounded-lg bg-[#F1592A] flex items-center justify-center mb-4">
                                <MapPin className="w-5 h-5 text-white" />
                            </div>
                            <h3 className="font-bold text-gray-900 text-[15px] mb-1">Head Office</h3>
                            <p className="font-bold text-gray-900 text-[14px]">Riyadh, Saudi Arabia</p>
                            <p className="text-gray-500 text-[13px] mt-1">King Fahd Road, Al Olaya</p>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* Main Content Area: Form & Info */}
            <section className="w-full max-w-[1100px] mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Left Column: Form */}
                    <div className="md:col-span-1">
                        <Card className="border-0 shadow-sm bg-white h-full">
                            <CardContent className="p-8">
                                <h2 className="text-[20px] font-bold text-gray-900 mb-6">Send Us a Message</h2>

                                <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                                    <div className="space-y-1.5">
                                        <label className="text-[13px] font-medium text-gray-700">Full Name</label>
                                        <Input
                                            type="text"
                                            placeholder="Your name"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="border-gray-200 focus-visible:ring-[#3B2A82] text-[14px] h-11"
                                        />
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-[13px] font-medium text-gray-700">Phone Number</label>
                                        <Input
                                            type="tel"
                                            placeholder="+966 XXX XXX XXX"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            className="border-gray-200 focus-visible:ring-[#3B2A82] text-[14px] h-11"
                                        />
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-[13px] font-medium text-gray-700">Message</label>
                                        <textarea
                                            placeholder="How can we help you?"
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            className="flex w-full rounded-md border border-gray-200 bg-transparent px-3 py-3 text-[14px] shadow-sm transition-colors placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#3B2A82] disabled:cursor-not-allowed disabled:opacity-50 min-h-[140px] resize-none"
                                        />
                                    </div>

                                    <Button type="submit" className="w-full bg-[#F1592A] hover:bg-[#d64a20] text-white font-semibold h-[46px] mt-2 flex items-center justify-center gap-2 rounded-md shadow-none">
                                        <Send className="w-4 h-4" />
                                        <span>Send Message</span>
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Column: Cards */}
                    <div className="md:col-span-1 flex flex-col gap-6">

                        {/* Office Hours Card */}
                        <Card className="border-0 shadow-sm bg-white">
                            <CardContent className="p-8">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-8 h-8 rounded-full bg-[#3B2A82] flex items-center justify-center">
                                        <Clock className="w-4 h-4 text-white" />
                                    </div>
                                    <h2 className="text-[18px] font-bold text-gray-900">Office Hours</h2>
                                </div>

                                <div className="space-y-4 text-[14px]">
                                    <div className="flex justify-between items-center py-2 border-b border-gray-50">
                                        <span className="text-gray-700 font-medium">Sunday - Thursday</span>
                                        <span className="text-gray-500">8:00 AM - 8:00 PM</span>
                                    </div>
                                    <div className="flex justify-between items-center py-2 border-b border-gray-50">
                                        <span className="text-gray-700 font-medium">Friday</span>
                                        <span className="text-gray-500">2:00 PM - 8:00 PM</span>
                                    </div>
                                    <div className="flex justify-between items-center py-2">
                                        <span className="text-gray-700 font-medium">Saturday</span>
                                        <span className="text-gray-500">9:00 AM - 6:00 PM</span>
                                    </div>
                                </div>

                                <div className="mt-6 bg-[#F1592A]/5 border border-[#F1592A]/10 rounded-lg p-3 text-center">
                                    <p className="text-[12px] text-gray-700 font-medium">
                                        <span className="text-[#F1592A] font-bold">24/7 Emergency Support:</span> Call 9491 anytime for urgent assistance
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Need Immediate Help Card */}
                        <Card className="border-0 overflow-hidden text-white flex-1" style={{ background: 'linear-gradient(135deg, #F1592A, #853E61, #3B2A82)' }}>
                            <CardContent className="p-8 flex flex-col h-full justify-center">
                                <h2 className="text-[20px] font-bold mb-3">Need Immediate Help?</h2>
                                <p className="text-white/90 text-[14px] mb-6 leading-relaxed">
                                    Our customer support team is ready to assist you with any questions about your shipment.
                                </p>

                                <div className="space-y-3 mt-auto">
                                    <Button className="w-full bg-white text-[#F1592A] hover:bg-gray-100 font-bold h-11 flex items-center justify-center gap-2 rounded-md shadow-none">
                                        Call 9491 Now
                                    </Button>
                                    <Button className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold h-11 flex items-center justify-center gap-2 rounded-md shadow-none">
                                        Chat on WhatsApp
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                    </div>
                </div>
            </section>


        </div>
    );
}
