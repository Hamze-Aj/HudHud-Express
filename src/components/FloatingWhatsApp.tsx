"use client";

import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

export default function FloatingWhatsApp() {
    return (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce">
            <a
                href="https://wa.me/251983346090"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat on WhatsApp"
                className="w-14 h-14 bg-[#25D366] rounded-full shadow-lg flex items-center justify-center hover:scale-105 transition-transform"
            >
                <FaWhatsapp className="w-8 h-8 text-white" />
            </a>
        </div>
    );
}
