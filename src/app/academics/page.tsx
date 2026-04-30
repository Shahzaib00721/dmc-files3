const programs = [
  { level: "Pre-Primary", classes: "Nursery – KG", desc: "Play-based learning to build foundational skills." },
  { level: "Primary", classes: "Class 1 – 5", desc: "Core literacy, numeracy and exploration." },
  { level: "Middle", classes: "Class 6 – 8", desc: "Concept building across science, maths and languages." },
  { level: "Secondary", classes: "Class 9 – 10 (Matric)", desc: "Board preparation, Science & General groups." },
  { level: "Higher Secondary", classes: "Class 11 – 12 (FSc/ICS)", desc: "Pre-Engineering, Pre-Medical, Computer Science." },
];

export default function Academics() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="font-display text-4xl font-bold text-brand-800">Academic Programs</h1>
      <p className="text-brand-700 mt-2">From early years to higher secondary, we offer a complete academic journey.</p>

      <div className="grid md:grid-cols-2 gap-5 mt-8">
        {programs.map((p) => (
          <div key={p.level} className="bg-white p-6 rounded-2xl shadow border-l-4 border-brand-700 hover:shadow-lg transition">
            <div className="text-xs font-bold text-gold-600 uppercase">{p.classes}</div>
            <h3 className="font-display text-2xl font-bold text-brand-800 mt-1">{p.level}</h3>
            <p className="text-brand-700 mt-2 text-sm">{p.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
