# School Website — Next.js Website

Complete school website with DMC (Detailed Marks Certificate) generator, PDF download & print functionality.

## 🚀 Setup

```bash
npm install
npm run dev
```

Open http://localhost:3000

## 📦 Tech Stack
- **Next.js 14** (App Router)
- **Tailwind CSS 3**
- **TypeScript**
- **jsPDF + html2canvas** — PDF generation
- **lucide-react** — icons

## 📄 Pages
- `/` — Home / Landing
- `/about` — About school, mission, vision, principal message
- `/academics` — Academic programs (Pre-Primary → Higher Secondary)
- `/admissions` — Online admission form
- `/gallery` — Event gallery
- `/dmc` — **DMC Generator** with live preview, PDF download & print
- `/contact` — Contact info + message form

## ✨ DMC Features
- Editable student info (name, father, roll no, class, section, session, DOB, position, exam type)
- Add / remove subjects dynamically
- Auto calculation: total, obtained, percentage, grade (A+ to F), status (Pass/Fail)
- Live preview of certificate
- **Download as PDF** (high-resolution)
- **Print** directly from browser
- Watermark, signature areas, school header

## 📁 Folder Structure
```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx          (Home)
│   ├── globals.css
│   ├── about/page.tsx
│   ├── academics/page.tsx
│   ├── admissions/page.tsx
│   ├── dmc/page.tsx      (DMC Generator)
│   ├── gallery/page.tsx
│   └── contact/page.tsx
└── components/
    ├── Navbar.tsx
    └── Footer.tsx
```

## 🎨 Customization
- Colors: edit `tailwind.config.ts` (`brand` and `gold` palettes)
- School name / contact: search & replace in `Navbar.tsx`, `Footer.tsx`, `layout.tsx`
# dmc-files3
