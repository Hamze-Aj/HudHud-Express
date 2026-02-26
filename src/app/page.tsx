"use client";

import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { Link2, Truck, HeadphonesIcon, ShieldCheck, Map, CreditCard, Box, ThumbsUp, MapPin } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* 1. Hero Section */}
      <section className="relative w-full h-[400px] flex items-center justify-center bg-gradient-to-r from-[#F1592A] via-[#853E61] to-[#3B2A82] overflow-hidden">
        {/* Placeholder for background image map pattern */}
        <div className="absolute inset-0 opacity-10 mix-blend-overlay flex justify-between items-center px-10">
          {/* Simulate background graphic text */}
          <div className="text-white text-[150px] font-bold opacity-10">HUDHUD</div>
          <div className="text-white text-[150px] font-bold opacity-10">EXPRESS</div>
        </div>

        <div className="relative z-10 w-full max-w-[800px] text-center px-6 flex flex-col items-center">
          <h1 className="text-white text-4xl md:text-5xl font-bold mb-4 drop-shadow-md">
            Fast. Reliable. Nationwide<br />Courier Service
          </h1>
          <p className="text-white/90 text-[15px] mb-8 font-medium tracking-wide">
            Track, send, and receive your packages with confidence
          </p>

          <div className="bg-white p-2 rounded-xl flex items-center w-full max-w-[600px] shadow-lg">
            <Input
              type="text"
              placeholder="Enter tracking number"
              className="border-0 focus-visible:ring-0 shadow-none text-base px-4 h-12 flex-1 outline-none rounded-l-lg"
            />
            <Button className="bg-[#F1592A] hover:bg-[#d64a20] text-white rounded-lg px-8 h-12 text-sm font-semibold transition-colors">
              Track Package
            </Button>
          </div>
        </div>
      </section>

      {/* 2. Why Choose Us Section */}
      <section className="py-20 px-6 bg-[#FaFaFa]">
        <div className="max-w-[1200px] mx-auto text-center flex flex-col items-center">
          <h2 className="text-[28px] font-bold text-gray-900 mb-2">Why Choose HudHud Express?</h2>
          <p className="text-gray-500 text-sm mb-12">Trusted by thousands of customers nationwide</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            {/* Feature 1 */}
            <Card className="border-0 shadow-sm overflow-hidden text-left hover:shadow-md transition-shadow">
              <div className="h-[140px] w-full bg-gray-200 relative">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: "url('https://images.unsplash.com/photo-1580674285054-bed31e145f59?q=80&w=800&auto=format&fit=crop')" }}
                />
                <div className="absolute -bottom-4 left-4 w-10 h-10 bg-[#F1592A] rounded-lg flex items-center justify-center text-white border-4 border-white z-10">
                  <Truck className="w-5 h-5" />
                </div>
              </div>
              <CardContent className="pt-8 pb-6 px-5">
                <h3 className="font-bold text-gray-900 mb-2 text-[15px]">Fast Delivery</h3>
                <p className="text-gray-500 text-[13px] leading-relaxed">
                  Next day and same day delivery options available
                </p>
              </CardContent>
            </Card>

            {/* Feature 2 */}
            <Card className="border-0 shadow-sm overflow-hidden text-left hover:shadow-md transition-shadow">
              <div className="h-[140px] w-full bg-gray-200 relative">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: "url('https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=800&auto=format&fit=crop')" }}
                />
                <div className="absolute -bottom-4 left-4 w-10 h-10 bg-[#3B2A82] rounded-lg flex items-center justify-center text-white border-4 border-white z-10">
                  <HeadphonesIcon className="w-5 h-5" />
                </div>
              </div>
              <CardContent className="pt-8 pb-6 px-5">
                <h3 className="font-bold text-gray-900 mb-2 text-[15px]">24/7 Support</h3>
                <p className="text-gray-500 text-[13px] leading-relaxed">
                  Round the clock customer support via call center 9491
                </p>
              </CardContent>
            </Card>

            {/* Feature 3 */}
            <Card className="border-0 shadow-sm overflow-hidden text-left hover:shadow-md transition-shadow">
              <div className="h-[140px] w-full bg-gray-200 relative">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: "url('https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=800&auto=format&fit=crop')" }}
                />
                <div className="absolute -bottom-4 left-4 w-10 h-10 bg-[#F1592A] rounded-lg flex items-center justify-center text-white border-4 border-white z-10">
                  <ShieldCheck className="w-5 h-5" />
                </div>
              </div>
              <CardContent className="pt-8 pb-6 px-5">
                <h3 className="font-bold text-gray-900 mb-2 text-[15px]">Secure & Safe</h3>
                <p className="text-gray-500 text-[13px] leading-relaxed">
                  Your packages are insured and tracked every step
                </p>
              </CardContent>
            </Card>

            {/* Feature 4 */}
            <Card className="border-0 shadow-sm overflow-hidden text-left hover:shadow-md transition-shadow">
              <div className="h-[140px] w-full bg-gray-200 relative">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: "url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=800&auto=format&fit=crop')" }}
                />
                <div className="absolute -bottom-4 left-4 w-10 h-10 bg-[#3B2A82] rounded-lg flex items-center justify-center text-white border-4 border-white z-10">
                  <Map className="w-5 h-5" />
                </div>
              </div>
              <CardContent className="pt-8 pb-6 px-5">
                <h3 className="font-bold text-gray-900 mb-2 text-[15px]">Nationwide Coverage</h3>
                <p className="text-gray-500 text-[13px] leading-relaxed">
                  Branches in all major cities across the country
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 3. How It Works Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-[1000px] mx-auto text-center flex flex-col items-center">
          <h2 className="text-[28px] font-bold text-gray-900 mb-2">How It Works</h2>
          <p className="text-gray-500 text-sm mb-16">Simple steps to send your package</p>

          <div className="flex flex-col md:flex-row items-center justify-center w-full gap-4 md:gap-0 relative">
            {/* Line connecting the circles (hidden on mobile) */}
            <div className="hidden md:block absolute top-[40px] left-1/2 -translate-x-1/2 w-[70%] h-[2px] bg-gray-200 -z-10 border-t-2 border-dashed border-gray-300"></div>

            {/* Step 1 */}
            <div className="relative flex flex-col items-center flex-1">
              <div className="absolute -top-3 -right-3 w-6 h-6 bg-white rounded-full flex items-center justify-center border-2 border-[#F1592A] text-[#F1592A] text-[10px] font-bold z-20">01</div>
              <div className="w-[80px] h-[80px] rounded-full bg-white border-2 border-gray-100 shadow-md flex items-center justify-center mb-4 z-10">
                <Box className="w-8 h-8 text-[#3B2A82]" />
              </div>
              <h3 className="font-bold text-gray-900 text-sm">Book Online</h3>
            </div>

            {/* Step 2 */}
            <div className="relative flex flex-col items-center flex-1 mt-8 md:mt-0">
              <div className="absolute -top-3 -right-3 w-6 h-6 bg-white rounded-full flex items-center justify-center border-2 border-[#F1592A] text-[#F1592A] text-[10px] font-bold z-20">02</div>
              <div className="w-[80px] h-[80px] rounded-full bg-white border-2 border-gray-100 shadow-md flex items-center justify-center mb-4 z-10">
                <Truck className="w-8 h-8 text-[#3B2A82]" />
              </div>
              <h3 className="font-bold text-gray-900 text-sm">Pickup</h3>
            </div>

            {/* Step 3 */}
            <div className="relative flex flex-col items-center flex-1 mt-8 md:mt-0">
              <div className="absolute -top-3 -right-3 w-6 h-6 bg-white rounded-full flex items-center justify-center border-2 border-[#F1592A] text-[#F1592A] text-[10px] font-bold z-20">03</div>
              <div className="w-[80px] h-[80px] rounded-full bg-white border-2 border-gray-100 shadow-md flex items-center justify-center mb-4 z-10">
                <MapPin className="w-8 h-8 text-[#3B2A82]" />
              </div>
              <h3 className="font-bold text-gray-900 text-sm">Track</h3>
            </div>

            {/* Step 4 */}
            <div className="relative flex flex-col items-center flex-1 mt-8 md:mt-0">
              <div className="absolute -top-3 -right-3 w-6 h-6 bg-white rounded-full flex items-center justify-center border-2 border-[#F1592A] text-[#F1592A] text-[10px] font-bold z-20">04</div>
              <div className="w-[80px] h-[80px] rounded-full bg-white border-2 border-gray-100 shadow-md flex items-center justify-center mb-4 z-10">
                <ThumbsUp className="w-8 h-8 text-[#3B2A82]" />
              </div>
              <h3 className="font-bold text-gray-900 text-sm">Delivered</h3>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Trusted By Section */}
      <section className="py-20 px-6 bg-[#FaFaFa]">
        <div className="max-w-[1000px] mx-auto text-center flex flex-col items-center">
          <h2 className="text-[28px] font-bold text-gray-900 mb-2">Trusted By Leading Businesses</h2>
          <p className="text-gray-500 text-sm mb-12">Partnering with top companies and brands</p>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full">
            {[
              { id: 'TC', name: 'TechCorp', color: '#F1592A' },
              { id: 'MH', name: 'MedHealth', color: '#3B2A82' },
              { id: 'FH', name: 'Fashion Hub', color: '#853E61' },
              { id: 'EM', name: 'ElectroMart', color: '#E45A84' },
              { id: 'BS', name: 'BookStore', color: '#6A2A5B' },
              { id: 'FD', name: 'FoodDeliver', color: '#1B4A72' },
              { id: 'AP', name: 'AutoParts', color: '#3A3A3A' },
              { id: 'HD', name: 'HomeDecor', color: '#D47E3A' },
            ].map((partner, index) => (
              <Card key={index} className="border border-gray-100 shadow-sm hover:shadow-md transition-shadow h-24 flex items-center justify-center bg-white cursor-pointer group">
                <div className="flex flex-col items-center justify-center gap-2">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-inner group-hover:scale-110 transition-transform duration-300"
                    style={{
                      background: `linear-gradient(135deg, ${partner.color}dd, ${partner.color})`
                    }}
                  >
                    {partner.id}
                  </div>
                  <span className="text-[11px] font-medium text-gray-500">{partner.name}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CTA Section */}
      <section className="w-full py-16 px-6 bg-gradient-to-r from-[#F1592A] via-[#853E61] to-[#3B2A82] text-center">
        <div className="max-w-[600px] mx-auto flex flex-col items-center">
          <h2 className="text-white text-2xl font-bold mb-3">Ready to Ship Your Package?</h2>
          <p className="text-white/80 text-sm mb-8">Call us now or visit our nearest branch</p>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Button className="bg-white text-[#F1592A] hover:bg-gray-100 hover:text-[#d64a20] rounded-full px-8 h-12 text-sm font-bold flex items-center gap-2 w-full sm:w-auto">
              <HeadphonesIcon className="w-4 h-4" />
              Call 9491 Now
            </Button>

            <Button variant="outline" className="border-white text-white hover:bg-white/10 hover:text-white rounded-full px-8 h-12 text-sm font-bold flex items-center gap-2 w-full sm:w-auto bg-transparent">
              <MapPin className="w-4 h-4" />
              Find a Branch
            </Button>
          </div>
        </div>
      </section>

    </div>
  );
}
