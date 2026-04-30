"use client";
import { Target, Eye, Heart } from "lucide-react";
import { useSchool } from "@/context/SchoolContext";

export default function About() {
  const { school } = useSchool();
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="font-display text-4xl font-bold text-brand-800">About {school.short || school.name}</h1>
      <p className="text-brand-700 mt-3 max-w-3xl">
        {school.name} is committed to quality education, character building, and the holistic development of every student. Our institution stands for curiosity, scholarship, and excellence.
      </p>

      <div className="grid md:grid-cols-3 gap-6 mt-10">
        <Card icon={<Target />} title="Our Mission" desc="To provide world-class education that empowers students with knowledge, skills, and values." />
        <Card icon={<Eye />} title="Our Vision" desc="To be the leading institution producing future leaders and responsible citizens." />
        <Card icon={<Heart />} title="Our Values" desc="Integrity, Excellence, Respect, Innovation, and Compassion." />
      </div>

      <div className="mt-12 bg-brand-50 rounded-2xl p-8">
        <h2 className="font-display text-2xl font-bold text-brand-800">Principal's Message</h2>
        <p className="text-brand-700 mt-3 italic">
          "At {school.name}, we believe every child has the potential to shine. Our role is to nurture that spark with care, discipline, and inspiration."
        </p>
        <p className="mt-4 font-semibold text-brand-800">— The Principal</p>
      </div>
    </div>
  );
}
function Card({ icon, title, desc }: any) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow border border-brand-100">
      <div className="bg-brand-100 text-brand-700 w-12 h-12 rounded-xl flex items-center justify-center">{icon}</div>
      <h3 className="font-display text-xl font-bold text-brand-800 mt-4">{title}</h3>
      <p className="text-brand-700 text-sm mt-2">{desc}</p>
    </div>
  );
}
