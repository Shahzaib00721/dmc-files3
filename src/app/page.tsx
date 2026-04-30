"use client";
import Link from "next/link";
import { BookOpen, Users, Award, Building2, ArrowRight, GraduationCap, FlaskConical, Trophy } from "lucide-react";
import { useSchool } from "@/context/SchoolContext";

export default function Home() {
  const { school } = useSchool();
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-700 via-brand-800 to-brand-900 text-white">
        <div className="max-w-7xl mx-auto px-4 py-20 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <span className="inline-block bg-gold-500 text-brand-900 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Welcome</span>
            <h1 className="font-display text-4xl md:text-6xl font-bold mt-4 leading-tight">
              {school.name}
            </h1>
            <p className="mt-4 text-brand-100 text-lg">
              Building tomorrow's leaders through quality education, strong values, and innovative learning.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/admissions" className="bg-gold-500 text-brand-900 font-semibold px-6 py-3 rounded-lg hover:bg-gold-400 transition flex items-center gap-2">
                Apply Now <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/dmc" className="border-2 border-white px-6 py-3 rounded-lg hover:bg-white hover:text-brand-800 transition font-semibold">
                Generate DMC
              </Link>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-3xl p-8 border border-white/20">
            <div className="grid grid-cols-2 gap-4">
              <Stat n="2,500+" l="Students" />
              <Stat n="120+" l="Teachers" />
              <Stat n="30+" l="Years" />
              <Stat n="98%" l="Pass Rate" />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-center text-brand-800">Why Choose {school.short || school.name}?</h2>
        <p className="text-center text-brand-700 mt-2 max-w-2xl mx-auto">A holistic learning environment designed for academic and personal excellence.</p>
        <div className="grid md:grid-cols-3 gap-6 mt-10">
          <Feature icon={<BookOpen />} title="Modern Curriculum" desc="Updated syllabus aligned with national and international standards." />
          <Feature icon={<Users />} title="Expert Faculty" desc="Highly qualified teachers committed to student success." />
          <Feature icon={<FlaskConical />} title="Science Labs" desc="Fully equipped Physics, Chemistry & Biology laboratories." />
          <Feature icon={<Award />} title="Top Results" desc="Consistently ranked among the top schools in board exams." />
          <Feature icon={<Trophy />} title="Co-Curricular" desc="Sports, debates, arts, and leadership programs." />
          <Feature icon={<Building2 />} title="Modern Campus" desc="Spacious classrooms, library, and sports facilities." />
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-50 py-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <GraduationCap className="w-16 h-16 mx-auto text-brand-700" />
          <h2 className="font-display text-3xl font-bold text-brand-800 mt-4">Ready to Join Our Family?</h2>
          <p className="text-brand-700 mt-2">Admissions open for the 2026 academic year.</p>
          <Link href="/admissions" className="inline-block mt-6 bg-brand-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-brand-800">
            Start Application
          </Link>
        </div>
      </section>
    </>
  );
}

function Stat({ n, l }: { n: string; l: string }) {
  return (
    <div className="bg-white/10 rounded-xl p-4 text-center">
      <div className="text-3xl font-bold text-gold-400">{n}</div>
      <div className="text-sm text-brand-100">{l}</div>
    </div>
  );
}
function Feature({ icon, title, desc }: any) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition border border-brand-100">
      <div className="bg-brand-100 text-brand-700 w-12 h-12 rounded-xl flex items-center justify-center">{icon}</div>
      <h3 className="font-display text-xl font-bold text-brand-800 mt-4">{title}</h3>
      <p className="text-sm text-brand-700 mt-1">{desc}</p>
    </div>
  );
}
