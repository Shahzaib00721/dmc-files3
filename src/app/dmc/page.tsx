"use client";
import { useRef, useState } from "react";
import { Plus, Trash2, Download, Printer, FileCheck2, RotateCcw, School as SchoolIcon, Save } from "lucide-react";
import { useSchool } from "@/context/SchoolContext";

type Subject = { name: string; total: number; obtained: number };

const defaultSubjects: Subject[] = [
  { name: "English", total: 100, obtained: 85 },
  { name: "Urdu", total: 100, obtained: 78 },
  { name: "Mathematics", total: 100, obtained: 92 },
  { name: "Physics", total: 100, obtained: 80 },
  { name: "Chemistry", total: 100, obtained: 75 },
  { name: "Biology", total: 100, obtained: 88 },
  { name: "Islamiat", total: 100, obtained: 90 },
  { name: "Computer Science", total: 100, obtained: 95 },
];

function getGrade(p: number) {
  if (p >= 90) return { g: "A+", r: "Outstanding" };
  if (p >= 80) return { g: "A", r: "Excellent" };
  if (p >= 70) return { g: "B", r: "Very Good" };
  if (p >= 60) return { g: "C", r: "Good" };
  if (p >= 50) return { g: "D", r: "Satisfactory" };
  if (p >= 40) return { g: "E", r: "Pass" };
  return { g: "F", r: "Fail" };
}

export default function DMCPage() {
  const { school, updateField, reset: resetSchool } = useSchool();
  const [savedFlash, setSavedFlash] = useState(false);

  const [student, setStudent] = useState({
    name: "Ahmed Khan",
    father: "Muhammad Khan",
    rollNo: "STD-2026-101",
    className: "10th",
    section: "A",
    session: "2025-2026",
    examType: "Annual Examination",
    dob: "2008-05-12",
    position: "1st",
  });
  const [subjects, setSubjects] = useState<Subject[]>(defaultSubjects);
  const dmcRef = useRef<HTMLDivElement>(null);
  const [busy, setBusy] = useState(false);

  const totalMarks = subjects.reduce((s, x) => s + Number(x.total || 0), 0);
  const obtained = subjects.reduce((s, x) => s + Number(x.obtained || 0), 0);
  const percentage = totalMarks ? (obtained / totalMarks) * 100 : 0;
  const { g: grade, r: remarks } = getGrade(percentage);
  const status = percentage >= 40 ? "PASS" : "FAIL";

  const addSubject = () => setSubjects([...subjects, { name: "", total: 100, obtained: 0 }]);
  const removeSubject = (i: number) => setSubjects(subjects.filter((_, idx) => idx !== i));
  const updateSubject = (i: number, key: keyof Subject, val: string) => {
    const next = [...subjects];
    (next[i] as any)[key] = key === "name" ? val : Number(val);
    setSubjects(next);
  };

  const flashSaved = () => {
    setSavedFlash(true);
    setTimeout(() => setSavedFlash(false), 1500);
  };

  const downloadPDF = async () => {
    if (!dmcRef.current) return;
    setBusy(true);
    try {
      const html2canvas = (await import("html2canvas")).default;
      const { jsPDF } = await import("jspdf");
      const canvas = await html2canvas(dmcRef.current, { scale: 2, backgroundColor: "#ffffff" });
      const img = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const w = pdf.internal.pageSize.getWidth();
      const h = (canvas.height * w) / canvas.width;
      pdf.addImage(img, "PNG", 0, 0, w, h);
      const safeSchool = school.name.replace(/\s+/g, "_");
      pdf.save(`DMC_${safeSchool}_${student.name.replace(/\s+/g, "_")}_${student.rollNo}.pdf`);
    } finally {
      setBusy(false);
    }
  };

  const print = () => window.print();
  const reset = () => { setSubjects(defaultSubjects); };

  // Initials for logo circle (fallback to first 2 chars of short)
  const initials = (school.short || school.name || "S")
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 3)
    .toUpperCase();

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="no-print mb-8">
        <h1 className="font-display text-3xl md:text-4xl font-bold text-brand-800">DMC Generator</h1>
        <p className="text-brand-700 mt-1">Detailed Marks Certificate — set your school information, fill the form, and generate a printable result card.</p>
      </div>

      {/* SCHOOL SETTINGS — saved automatically to your browser */}
      <div className="no-print bg-gradient-to-br from-gold-50 to-white border-2 border-gold-300 rounded-2xl shadow-lg p-6 mb-8">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <div className="bg-brand-700 text-gold-400 w-10 h-10 rounded-full flex items-center justify-center">
              <SchoolIcon className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-display text-xl font-bold text-brand-800">School Settings</h2>
              <p className="text-xs text-brand-700">Type your school name here — it will appear on the DMC, navbar and footer. Saved automatically.</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {savedFlash && (
              <span className="flex items-center gap-1 text-green-700 text-sm font-semibold">
                <Save className="w-4 h-4" /> Saved
              </span>
            )}
            <button
              onClick={() => { resetSchool(); flashSaved(); }}
              className="text-xs border border-brand-300 text-brand-800 px-3 py-1.5 rounded-lg hover:bg-brand-50"
            >
              Reset to default
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Input
            label="School Name (full)"
            value={school.name}
            onChange={(v) => { updateField("name", v); flashSaved(); }}
            placeholder="e.g. The City Grammar School"
          />
          <Input
            label="Short Name / Logo Initials"
            value={school.short}
            onChange={(v) => { updateField("short", v); flashSaved(); }}
            placeholder="e.g. CGS"
          />
          <Input
            label="Tagline / Sub-line"
            value={school.tagline}
            onChange={(v) => { updateField("tagline", v); flashSaved(); }}
            placeholder="e.g. Education System"
          />
          <Input
            label="Phone"
            value={school.phone}
            onChange={(v) => { updateField("phone", v); flashSaved(); }}
          />
          <Input
            label="Email"
            value={school.email}
            onChange={(v) => { updateField("email", v); flashSaved(); }}
          />
          <Input
            label="Address"
            value={school.address}
            onChange={(v) => { updateField("address", v); flashSaved(); }}
          />
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* FORM */}
        <div className="no-print bg-white rounded-2xl shadow-lg p-6 border border-brand-100">
          <h2 className="font-display text-xl font-bold text-brand-800 mb-4">Student Information</h2>
          <div className="grid grid-cols-2 gap-3">
            <Input label="Student Name" value={student.name} onChange={(v) => setStudent({ ...student, name: v })} />
            <Input label="Father's Name" value={student.father} onChange={(v) => setStudent({ ...student, father: v })} />
            <Input label="Roll Number" value={student.rollNo} onChange={(v) => setStudent({ ...student, rollNo: v })} />
            <Input label="Class" value={student.className} onChange={(v) => setStudent({ ...student, className: v })} />
            <Input label="Section" value={student.section} onChange={(v) => setStudent({ ...student, section: v })} />
            <Input label="Session" value={student.session} onChange={(v) => setStudent({ ...student, session: v })} />
            <Input label="Date of Birth" type="date" value={student.dob} onChange={(v) => setStudent({ ...student, dob: v })} />
            <Input label="Position" value={student.position} onChange={(v) => setStudent({ ...student, position: v })} />
            <div className="col-span-2">
              <Input label="Examination Type" value={student.examType} onChange={(v) => setStudent({ ...student, examType: v })} />
            </div>
          </div>

          <div className="flex items-center justify-between mt-6 mb-3">
            <h2 className="font-display text-xl font-bold text-brand-800">Subjects & Marks</h2>
            <button onClick={addSubject} className="flex items-center gap-1 bg-brand-700 text-white text-sm px-3 py-1.5 rounded-lg hover:bg-brand-800">
              <Plus className="w-4 h-4" /> Add
            </button>
          </div>

          <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
            {subjects.map((s, i) => (
              <div key={i} className="grid grid-cols-12 gap-2 items-center bg-brand-50 p-2 rounded-lg">
                <input className="col-span-5 px-2 py-1.5 rounded border border-brand-200 text-sm bg-white" value={s.name} onChange={(e) => updateSubject(i, "name", e.target.value)} placeholder="Subject" />
                <input type="number" className="col-span-3 px-2 py-1.5 rounded border border-brand-200 text-sm bg-white" value={s.total} onChange={(e) => updateSubject(i, "total", e.target.value)} placeholder="Total" />
                <input type="number" className="col-span-3 px-2 py-1.5 rounded border border-brand-200 text-sm bg-white" value={s.obtained} onChange={(e) => updateSubject(i, "obtained", e.target.value)} placeholder="Obtained" />
                <button onClick={() => removeSubject(i)} className="col-span-1 text-red-600 hover:text-red-800 flex justify-center">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 mt-6">
            <button onClick={downloadPDF} disabled={busy} className="flex items-center gap-2 bg-gold-500 text-brand-900 font-semibold px-4 py-2 rounded-lg hover:bg-gold-400 disabled:opacity-50">
              <Download className="w-4 h-4" /> {busy ? "Generating..." : "Download PDF"}
            </button>
            <button onClick={print} className="flex items-center gap-2 bg-brand-700 text-white font-semibold px-4 py-2 rounded-lg hover:bg-brand-800">
              <Printer className="w-4 h-4" /> Print
            </button>
            <button onClick={reset} className="flex items-center gap-2 border border-brand-300 text-brand-800 px-4 py-2 rounded-lg hover:bg-brand-50">
              <RotateCcw className="w-4 h-4" /> Reset Subjects
            </button>
          </div>
        </div>

        {/* PREVIEW / DMC */}
        <div>
          <div ref={dmcRef} className="print-area bg-white rounded-2xl shadow-2xl border-4 border-double border-brand-700 p-8 relative overflow-hidden">
            {/* Watermark — uses the school name */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
              <div className="font-display text-6xl font-bold rotate-[-30deg] text-brand-900 text-center px-4">
                {school.name.toUpperCase()}
              </div>
            </div>

            {/* Header */}
            <div className="text-center border-b-2 border-brand-700 pb-4 relative">
              <div className="flex items-center justify-center gap-3">
                <div className="bg-brand-700 text-gold-400 w-14 h-14 rounded-full flex items-center justify-center font-display text-xl font-bold">
                  {initials}
                </div>
                <div>
                  <h1 className="font-display text-2xl font-bold text-brand-800">{school.name}</h1>
                  <p className="text-xs text-brand-700">{school.address} • Phone: {school.phone}</p>
                </div>
              </div>
              <div className="mt-3 inline-block bg-brand-700 text-white px-4 py-1 rounded-full text-sm font-semibold">
                DETAILED MARKS CERTIFICATE
              </div>
              <div className="text-xs text-brand-700 mt-1">{student.examType} — Session {student.session}</div>
            </div>

            {/* Student info */}
            <div className="grid grid-cols-2 gap-x-6 gap-y-2 mt-4 text-sm relative">
              <Info label="Student Name" value={student.name} />
              <Info label="Father's Name" value={student.father} />
              <Info label="Roll Number" value={student.rollNo} />
              <Info label="Class" value={`${student.className} - ${student.section}`} />
              <Info label="Date of Birth" value={student.dob} />
              <Info label="Position" value={student.position} />
            </div>

            {/* Marks table */}
            <table className="w-full mt-5 text-sm border-collapse relative">
              <thead>
                <tr className="bg-brand-700 text-white">
                  <th className="border border-brand-700 px-2 py-2 text-left">#</th>
                  <th className="border border-brand-700 px-2 py-2 text-left">Subject</th>
                  <th className="border border-brand-700 px-2 py-2 text-center">Total</th>
                  <th className="border border-brand-700 px-2 py-2 text-center">Obtained</th>
                  <th className="border border-brand-700 px-2 py-2 text-center">%</th>
                  <th className="border border-brand-700 px-2 py-2 text-center">Grade</th>
                </tr>
              </thead>
              <tbody>
                {subjects.map((s, i) => {
                  const p = s.total ? (s.obtained / s.total) * 100 : 0;
                  return (
                    <tr key={i} className={i % 2 ? "bg-brand-50" : ""}>
                      <td className="border border-brand-200 px-2 py-1.5">{i + 1}</td>
                      <td className="border border-brand-200 px-2 py-1.5 font-medium">{s.name}</td>
                      <td className="border border-brand-200 px-2 py-1.5 text-center">{s.total}</td>
                      <td className="border border-brand-200 px-2 py-1.5 text-center font-semibold">{s.obtained}</td>
                      <td className="border border-brand-200 px-2 py-1.5 text-center">{p.toFixed(1)}%</td>
                      <td className="border border-brand-200 px-2 py-1.5 text-center font-bold text-brand-700">{getGrade(p).g}</td>
                    </tr>
                  );
                })}
                <tr className="bg-brand-100 font-bold">
                  <td colSpan={2} className="border border-brand-700 px-2 py-2 text-right">TOTAL</td>
                  <td className="border border-brand-700 px-2 py-2 text-center">{totalMarks}</td>
                  <td className="border border-brand-700 px-2 py-2 text-center text-brand-800">{obtained}</td>
                  <td className="border border-brand-700 px-2 py-2 text-center">{percentage.toFixed(2)}%</td>
                  <td className="border border-brand-700 px-2 py-2 text-center text-brand-800">{grade}</td>
                </tr>
              </tbody>
            </table>

            {/* Summary */}
            <div className="grid grid-cols-3 gap-3 mt-5 relative">
              <SummaryBox label="Percentage" value={`${percentage.toFixed(2)}%`} />
              <SummaryBox label="Grade" value={grade} />
              <SummaryBox label="Status" value={status} highlight={status === "PASS" ? "green" : "red"} />
            </div>
            <p className="text-center text-sm mt-3 text-brand-700 italic relative">Remarks: <span className="font-semibold">{remarks}</span></p>

            {/* Signatures */}
            <div className="grid grid-cols-3 gap-6 mt-10 text-center text-xs relative">
              <SigBox label="Class Teacher" />
              <SigBox label="Examination Controller" />
              <SigBox label="Principal" />
            </div>

            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-brand-600 relative">
              <FileCheck2 className="w-4 h-4" /> This is a computer generated certificate. Issued on {new Date().toLocaleDateString()}.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Input({ label, value, onChange, type = "text", placeholder }: { label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string }) {
  return (
    <label className="text-xs font-semibold text-brand-700 block">
      {label}
      <input type={type} value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} className="mt-1 w-full px-3 py-2 rounded-lg border border-brand-200 text-sm font-normal text-brand-900 bg-white focus:outline-none focus:border-brand-600" />
    </label>
  );
}
function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-2 border-b border-dotted border-brand-300 py-1">
      <span className="font-semibold text-brand-700">{label}:</span>
      <span className="text-brand-900">{value}</span>
    </div>
  );
}
function SummaryBox({ label, value, highlight }: { label: string; value: string; highlight?: "green" | "red" }) {
  const color = highlight === "green" ? "bg-green-600" : highlight === "red" ? "bg-red-600" : "bg-brand-700";
  return (
    <div className={`${color} text-white text-center rounded-lg p-3`}>
      <div className="text-xs opacity-90">{label}</div>
      <div className="text-2xl font-bold">{value}</div>
    </div>
  );
}
function SigBox({ label }: { label: string }) {
  return (
    <div>
      <div className="border-t-2 border-brand-700 pt-1 mt-8">{label}</div>
    </div>
  );
}
