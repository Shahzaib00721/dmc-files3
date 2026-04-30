"use client";
import { useState } from "react";
import { CheckCircle2 } from "lucide-react";

export default function Admissions() {
  const [submitted, setSubmitted] = useState(false);
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="font-display text-4xl font-bold text-brand-800">Admissions</h1>
      <p className="text-brand-700 mt-2">Admissions open for academic year 2026. Fill the form below to apply.</p>

      <div className="grid md:grid-cols-3 gap-6 mt-8">
        <div className="md:col-span-2 bg-white p-6 rounded-2xl shadow border border-brand-100">
          {submitted ? (
            <div className="text-center py-12">
              <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto" />
              <h2 className="font-display text-2xl font-bold text-brand-800 mt-3">Application Submitted!</h2>
              <p className="text-brand-700 mt-1">We'll contact you within 3 working days.</p>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="grid grid-cols-2 gap-4">
              <Field label="Student Full Name" />
              <Field label="Father's Name" />
              <Field label="Date of Birth" type="date" />
              <Field label="Applying for Class" />
              <Field label="Phone" type="tel" />
              <Field label="Email" type="email" />
              <div className="col-span-2"><Field label="Address" /></div>
              <button className="col-span-2 bg-brand-700 text-white py-3 rounded-lg font-semibold hover:bg-brand-800">Submit Application</button>
            </form>
          )}
        </div>
        <aside className="bg-brand-50 p-6 rounded-2xl">
          <h3 className="font-display text-lg font-bold text-brand-800">Required Documents</h3>
          <ul className="text-sm text-brand-700 mt-3 space-y-1 list-disc pl-5">
            <li>Birth Certificate / B-Form</li>
            <li>Previous School Result</li>
            <li>2 Passport Photos</li>
            <li>Parent's CNIC Copy</li>
          </ul>
          <h3 className="font-display text-lg font-bold text-brand-800 mt-5">Fee Structure</h3>
          <p className="text-sm text-brand-700 mt-1">Available at the admission office or upon request.</p>
        </aside>
      </div>
    </div>
  );
}
function Field({ label, type = "text" }: { label: string; type?: string }) {
  return (
    <label className="text-xs font-semibold text-brand-700 block">
      {label}
      <input required type={type} className="mt-1 w-full px-3 py-2 rounded-lg border border-brand-200 text-sm font-normal bg-white focus:outline-none focus:border-brand-600" />
    </label>
  );
}
