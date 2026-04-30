"use client";
import Link from "next/link";
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram } from "lucide-react";
import { useSchool } from "@/context/SchoolContext";

export default function Footer() {
  const { school } = useSchool();
  return (
    <footer className="bg-brand-900 text-brand-100 mt-12 no-print">
      <div className="max-w-7xl mx-auto px-4 py-10 grid md:grid-cols-4 gap-8">
        <div>
          <h3 className="font-display text-xl text-white mb-3">{school.name}</h3>
          <p className="text-sm">Inspiring excellence, nurturing character.</p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-1 text-sm">
            <li><Link href="/about" className="hover:text-gold-400">About Us</Link></li>
            <li><Link href="/academics" className="hover:text-gold-400">Academics</Link></li>
            <li><Link href="/admissions" className="hover:text-gold-400">Admissions</Link></li>
            <li><Link href="/dmc" className="hover:text-gold-400">DMC Generator</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Contact</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex gap-2"><MapPin className="w-4 h-4 mt-0.5" /> {school.address}</li>
            <li className="flex gap-2"><Phone className="w-4 h-4 mt-0.5" /> {school.phone}</li>
            <li className="flex gap-2"><Mail className="w-4 h-4 mt-0.5" /> {school.email}</li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Follow Us</h4>
          <div className="flex gap-3">
            <a href="#" className="bg-brand-700 p-2 rounded-full hover:bg-gold-500 hover:text-brand-900"><Facebook className="w-4 h-4" /></a>
            <a href="#" className="bg-brand-700 p-2 rounded-full hover:bg-gold-500 hover:text-brand-900"><Twitter className="w-4 h-4" /></a>
            <a href="#" className="bg-brand-700 p-2 rounded-full hover:bg-gold-500 hover:text-brand-900"><Instagram className="w-4 h-4" /></a>
          </div>
        </div>
      </div>
      <div className="border-t border-brand-700 py-4 text-center text-sm">
        © {new Date().getFullYear()} {school.name}. All rights reserved.
      </div>
    </footer>
  );
}
