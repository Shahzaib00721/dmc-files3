"use client";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { useSchool } from "@/context/SchoolContext";

export default function Contact() {
  const { school } = useSchool();
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="font-display text-4xl font-bold text-brand-800">Contact Us</h1>
      <p className="text-brand-700 mt-2">We'd love to hear from you. Reach out anytime.</p>
      <div className="grid md:grid-cols-2 gap-6 mt-8">
        <div className="space-y-4">
          <Item icon={<MapPin />} title="Address" desc={school.address} />
          <Item icon={<Phone />} title="Phone" desc={school.phone} />
          <Item icon={<Mail />} title="Email" desc={school.email} />
          <Item icon={<Clock />} title="Office Hours" desc="Mon – Sat: 8:00 AM – 2:00 PM" />
        </div>
        <form className="bg-white p-6 rounded-2xl shadow border border-brand-100 space-y-3">
          <input placeholder="Your Name" className="w-full px-3 py-2 rounded border border-brand-200" />
          <input placeholder="Email" type="email" className="w-full px-3 py-2 rounded border border-brand-200" />
          <textarea placeholder="Message" rows={5} className="w-full px-3 py-2 rounded border border-brand-200" />
          <button type="button" className="bg-brand-700 text-white px-5 py-2 rounded-lg font-semibold hover:bg-brand-800">Send Message</button>
        </form>
      </div>
    </div>
  );
}
function Item({ icon, title, desc }: any) {
  return (
    <div className="flex gap-3 bg-white p-4 rounded-xl shadow border border-brand-100">
      <div className="bg-brand-100 text-brand-700 w-10 h-10 rounded-lg flex items-center justify-center">{icon}</div>
      <div>
        <div className="font-bold text-brand-800">{title}</div>
        <div className="text-sm text-brand-700">{desc}</div>
      </div>
    </div>
  );
}
