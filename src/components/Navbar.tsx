"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X, GraduationCap } from "lucide-react";
import { useSchool } from "@/context/SchoolContext";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/academics", label: "Academics" },
  { href: "/admissions", label: "Admissions" },
  { href: "/gallery", label: "Gallery" },
  { href: "/dmc", label: "DMC Generator" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { school } = useSchool();
  return (
    <header className="bg-brand-700 text-white shadow-lg sticky top-0 z-50 no-print">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-gold-500 p-2 rounded-full">
            <GraduationCap className="w-6 h-6 text-brand-900" />
          </div>
          <div>
            <div className="font-display font-bold text-lg leading-tight">{school.name}</div>
            <div className="text-xs text-brand-100">{school.tagline}</div>
          </div>
        </Link>
        <nav className="hidden lg:flex gap-1">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="px-3 py-2 rounded hover:bg-brand-600 transition text-sm font-medium">
              {l.label}
            </Link>
          ))}
        </nav>
        <button className="lg:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav className="lg:hidden bg-brand-800 px-4 py-2 flex flex-col">
          {links.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="px-3 py-2 rounded hover:bg-brand-600 text-sm">
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
