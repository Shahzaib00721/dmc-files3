const items = [
  { t: "Annual Sports Day", c: "from-brand-600 to-brand-800" },
  { t: "Science Fair", c: "from-gold-500 to-gold-600" },
  { t: "Independence Day", c: "from-green-600 to-green-800" },
  { t: "Quiz Competition", c: "from-brand-500 to-brand-700" },
  { t: "Art Exhibition", c: "from-pink-500 to-pink-700" },
  { t: "Graduation Ceremony", c: "from-brand-700 to-brand-900" },
];
export default function Gallery() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="font-display text-4xl font-bold text-brand-800">Gallery</h1>
      <p className="text-brand-700 mt-2">Glimpses from our school events and activities.</p>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 mt-8">
        {items.map((i) => (
          <div key={i.t} className={`aspect-video rounded-2xl bg-gradient-to-br ${i.c} flex items-end p-4 shadow-lg hover:scale-105 transition`}>
            <span className="text-white font-display text-lg font-bold drop-shadow">{i.t}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
