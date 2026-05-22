"use client"
import { useState } from 'react'
import type { Metadata } from "next";
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HardHat, Home, Building2, ChevronRight, Phone, 
  Mail, MapPin, Clock, Send, MessageSquare, Filter 
} from 'lucide-react';
import "./globals.css";
import PrimeProvider from './PrimeProvider'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="en">
      <body
        className={`antialiased flex flex-col gap-3`}
      >
       <div className="flex flex-col gap-3 justify-start md:justify-center items-center" style={{width:"100%",height:"100%"}}>
           <div className=" p-16">
            <PrimeProvider>
              {children}
            </PrimeProvider>
          </div>
         <footer className="w-screen bg-slate-900 text-slate-500 py-12 px-4 border-t border-slate-800">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2 text-white">
              <HardHat size={20} className="text-orange-600" />
              <span className="font-black tracking-tighter">Bogalech Construction PLC © 2026</span>
            </div>
            <p className="text-sm uppercase font-bold tracking-widest">Safety Certified • Licensed • Bonded</p>
          </div>
        </footer>
        </div>
      </body>
    </html>
  );
}
