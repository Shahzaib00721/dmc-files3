"use client";
import { useRef, useState, useCallback } from "react";
import {
  Plus, Trash2, Download, Printer, FileCheck2, RotateCcw,
  School as SchoolIcon, Save, Palette, Upload, LayoutTemplate, X, ChevronDown, ChevronUp
} from "lucide-react";
import { useSchool } from "@/context/SchoolContext";

type Subject = { name: string; total: number; obtained: number };

type ThemePreset = {
  id: string; label: string;
  primary: string; primaryText: string;
  accent: string;  accentText: string;
  border: string;  rowAlt: string;
  summaryBg: string; watermark: string;
};

type LayoutOption = "classic" | "compact" | "modern";
type FontOption   = "serif"   | "sans"    | "mono";

const THEME_PRESETS: ThemePreset[] = [
  { id:"green",  label:"Forest Green",  primary:"#1a5f3d", primaryText:"#fff", accent:"#d4a017", accentText:"#1a3a1a", border:"#1a5f3d", rowAlt:"#f0f9f4", summaryBg:"#1a5f3d", watermark:"#1a5f3d" },
  { id:"navy",   label:"Royal Navy",    primary:"#1e3a5f", primaryText:"#fff", accent:"#c8960c", accentText:"#fff",    border:"#1e3a5f", rowAlt:"#eef3fa", summaryBg:"#1e3a5f", watermark:"#1e3a5f" },
  { id:"maroon", label:"Crimson Maroon",primary:"#7b1c1c", primaryText:"#fff", accent:"#e8c547", accentText:"#7b1c1c",border:"#7b1c1c", rowAlt:"#fdf0f0", summaryBg:"#7b1c1c", watermark:"#7b1c1c" },
  { id:"purple", label:"Regal Purple",  primary:"#4a1a7a", primaryText:"#fff", accent:"#f4c430", accentText:"#4a1a7a",border:"#4a1a7a", rowAlt:"#f5f0ff", summaryBg:"#4a1a7a", watermark:"#4a1a7a" },
  { id:"teal",   label:"Ocean Teal",    primary:"#0f5e6b", primaryText:"#fff", accent:"#e8a020", accentText:"#0f3040",border:"#0f5e6b", rowAlt:"#edfcff", summaryBg:"#0f5e6b", watermark:"#0f5e6b" },
  { id:"black",  label:"Classic Black", primary:"#1a1a1a", primaryText:"#fff", accent:"#d4a017", accentText:"#1a1a1a",border:"#1a1a1a", rowAlt:"#f5f5f5", summaryBg:"#1a1a1a", watermark:"#1a1a1a" },
  { id:"custom", label:"Custom Color",  primary:"#2c5282", primaryText:"#fff", accent:"#ecc94b", accentText:"#1a1a1a",border:"#2c5282", rowAlt:"#ebf4ff", summaryBg:"#2c5282", watermark:"#2c5282" },
];

const FONT_MAP: Record<FontOption,string> = {
  serif: "Georgia,'Times New Roman',serif",
  sans:  "'Segoe UI',Arial,sans-serif",
  mono:  "'Courier New',Courier,monospace",
};

const defaultSubjects: Subject[] = [
  { name:"English",total:100,obtained:85},{ name:"Urdu",total:100,obtained:78},
  { name:"Mathematics",total:100,obtained:92},{ name:"Physics",total:100,obtained:80},
  { name:"Chemistry",total:100,obtained:75},{ name:"Biology",total:100,obtained:88},
  { name:"Islamiat",total:100,obtained:90},{ name:"Computer Science",total:100,obtained:95},
];

function getGrade(p:number){
  if(p>=90)return{g:"A+",r:"Outstanding"};if(p>=80)return{g:"A",r:"Excellent"};
  if(p>=70)return{g:"B",r:"Very Good"};if(p>=60)return{g:"C",r:"Good"};
  if(p>=50)return{g:"D",r:"Satisfactory"};if(p>=40)return{g:"E",r:"Pass"};
  return{g:"F",r:"Fail"};
}

export default function DMCPage() {
  const { school, updateField, reset: resetSchool } = useSchool();
  const [savedFlash,setSavedFlash]=useState(false);
  const [student,setStudent]=useState({name:"Ahmed Khan",father:"Muhammad Khan",rollNo:"STD-2026-101",className:"10th",section:"A",session:"2025-2026",examType:"Annual Examination",dob:"2008-05-12",position:"1st"});
  const [subjects,setSubjects]=useState<Subject[]>(defaultSubjects);

  const [selectedPresetId,setSelectedPresetId]=useState("green");
  const [customPrimary,setCustomPrimary]=useState("#2c5282");
  const [customAccent,setCustomAccent]=useState("#ecc94b");
  const [layout,setLayout]=useState<LayoutOption>("classic");
  const [font,setFont]=useState<FontOption>("serif");
  const [logoUrl,setLogoUrl]=useState<string|null>(null);
  const [showBorder,setShowBorder]=useState(true);
  const [showWatermark,setShowWatermark]=useState(true);
  const [customizerOpen,setCustomizerOpen]=useState(true);

  const dmcRef=useRef<HTMLDivElement>(null);
  const logoInputRef=useRef<HTMLInputElement>(null);
  const [busy,setBusy]=useState(false);

  const basePreset=THEME_PRESETS.find(p=>p.id===selectedPresetId)??THEME_PRESETS[0];
  const theme:ThemePreset=selectedPresetId==="custom"
    ?{...basePreset,primary:customPrimary,summaryBg:customPrimary,border:customPrimary,watermark:customPrimary,accent:customAccent}
    :basePreset;

  const totalMarks=subjects.reduce((s,x)=>s+Number(x.total||0),0);
  const obtained=subjects.reduce((s,x)=>s+Number(x.obtained||0),0);
  const percentage=totalMarks?(obtained/totalMarks)*100:0;
  const{g:grade,r:remarks}=getGrade(percentage);
  const status=percentage>=40?"PASS":"FAIL";

  const addSubject=()=>setSubjects([...subjects,{name:"",total:100,obtained:0}]);
  const removeSubject=(i:number)=>setSubjects(subjects.filter((_,idx)=>idx!==i));
  const updateSubject=(i:number,key:keyof Subject,val:string)=>{const n=[...subjects];(n[i]as any)[key]=key==="name"?val:Number(val);setSubjects(n);};
  const flashSaved=()=>{setSavedFlash(true);setTimeout(()=>setSavedFlash(false),1500);};

  const handleLogoUpload=useCallback((e:React.ChangeEvent<HTMLInputElement>)=>{
    const f=e.target.files?.[0];if(!f)return;
    const r=new FileReader();r.onload=ev=>setLogoUrl(ev.target?.result as string);r.readAsDataURL(f);
  },[]);

  const downloadPDF=async()=>{
    if(!dmcRef.current)return;setBusy(true);
    try{
      const html2canvas=(await import("html2canvas")).default;
      const{jsPDF}=await import("jspdf");
      const canvas=await html2canvas(dmcRef.current,{scale:2,backgroundColor:"#ffffff"});
      const img=canvas.toDataURL("image/png");
      const pdf=new jsPDF("p","mm","a4");
      const w=pdf.internal.pageSize.getWidth();
      pdf.addImage(img,"PNG",0,0,w,(canvas.height*w)/canvas.width);
      pdf.save(`DMC_${school.name.replace(/\s+/g,"_")}_${student.name.replace(/\s+/g,"_")}.pdf`);
    }finally{setBusy(false);}
  };

  const initials=(school.short||school.name||"S").split(/\s+/).map(w=>w[0]).join("").slice(0,3).toUpperCase();
  const isCompact=layout==="compact";
  const isModern=layout==="modern";

  return(
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="no-print mb-6">
        <h1 className="font-display text-3xl md:text-4xl font-bold text-brand-800">DMC Generator</h1>
        <p className="text-brand-700 mt-1">Customize your DMC theme, upload your logo, choose layout — then download or print.</p>
      </div>

      {/* ── THEME CUSTOMIZER ─────────────────────────────────────────────── */}
      <div className="no-print bg-white border-2 border-slate-200 rounded-2xl shadow-lg mb-6 overflow-hidden">
        <button onClick={()=>setCustomizerOpen(o=>!o)}
          className="w-full flex items-center justify-between px-6 py-4 text-white font-semibold transition-all"
          style={{background:theme.primary}}>
          <span className="flex items-center gap-2"><Palette className="w-5 h-5"/>DMC Theme Customizer</span>
          {customizerOpen?<ChevronUp className="w-5 h-5"/>:<ChevronDown className="w-5 h-5"/>}
        </button>

        {customizerOpen&&(
          <div className="p-6 space-y-6">

            {/* Color presets */}
            <div>
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block mb-3">Color Theme</label>
              <div className="flex flex-wrap gap-3">
                {THEME_PRESETS.map(p=>(
                  <button key={p.id} onClick={()=>setSelectedPresetId(p.id)} title={p.label}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl border-2 text-sm font-semibold transition-all ${selectedPresetId===p.id?"shadow-md scale-105 border-slate-800":"border-slate-200 hover:border-slate-400"}`}>
                    <span className="w-5 h-5 rounded-full border border-slate-300" style={{background:p.primary}}/>
                    <span className="w-4 h-4 rounded-full border border-slate-200" style={{background:p.accent}}/>
                    <span className="text-slate-700">{p.label}</span>
                  </button>
                ))}
              </div>

              {selectedPresetId==="custom"&&(
                <div className="mt-4 flex flex-wrap gap-6 items-center bg-slate-50 rounded-xl p-4 border border-slate-200">
                  <label className="flex items-center gap-3 text-sm font-semibold text-slate-700">
                    Primary Color
                    <input type="color" value={customPrimary} onChange={e=>setCustomPrimary(e.target.value)} className="w-10 h-10 rounded-lg cursor-pointer border border-slate-300"/>
                    <span className="text-xs text-slate-500 font-mono">{customPrimary}</span>
                  </label>
                  <label className="flex items-center gap-3 text-sm font-semibold text-slate-700">
                    Accent Color
                    <input type="color" value={customAccent} onChange={e=>setCustomAccent(e.target.value)} className="w-10 h-10 rounded-lg cursor-pointer border border-slate-300"/>
                    <span className="text-xs text-slate-500 font-mono">{customAccent}</span>
                  </label>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">

              {/* Layout */}
              <div>
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block mb-2">Layout</label>
                <div className="space-y-2">
                  {(["classic","compact","modern"] as LayoutOption[]).map(l=>(
                    <button key={l} onClick={()=>setLayout(l)}
                      className={`w-full text-left px-3 py-2 rounded-lg border text-sm font-medium capitalize transition-all ${layout===l?"border-slate-700 text-white":"border-slate-200 hover:border-slate-400 text-slate-700"}`}
                      style={layout===l?{background:theme.primary}:{}}>
                      {l==="classic"?"📋 Classic":l==="compact"?"📄 Compact":"✨ Modern"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Font */}
              <div>
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block mb-2">Font Style</label>
                <div className="space-y-2">
                  {(["serif","sans","mono"] as FontOption[]).map(f=>(
                    <button key={f} onClick={()=>setFont(f)}
                      className={`w-full text-left px-3 py-2 rounded-lg border text-sm font-medium transition-all ${font===f?"border-slate-700 text-white":"border-slate-200 hover:border-slate-400 text-slate-700"}`}
                      style={{fontFamily:FONT_MAP[f],...(font===f?{background:theme.primary}:{})}}>
                      {f==="serif"?"Aa Serif":f==="sans"?"Aa Sans-serif":"Aa Monospace"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Logo Upload */}
              <div>
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block mb-2">School Logo</label>
                <div className="space-y-2">
                  <button onClick={()=>logoInputRef.current?.click()}
                    className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg border-2 border-dashed border-slate-300 hover:border-slate-500 text-sm text-slate-600 hover:text-slate-800 transition-all bg-white">
                    <Upload className="w-4 h-4"/>{logoUrl?"Change Logo":"Upload Logo"}
                  </button>
                  <input ref={logoInputRef} type="file" accept="image/*" className="hidden" onChange={handleLogoUpload}/>
                  {logoUrl&&(
                    <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-lg px-3 py-2">
                      <img src={logoUrl} alt="logo" className="w-8 h-8 object-contain rounded"/>
                      <span className="text-xs text-green-700 font-medium flex-1">Logo uploaded ✓</span>
                      <button onClick={()=>setLogoUrl(null)} className="text-red-400 hover:text-red-600"><X className="w-4 h-4"/></button>
                    </div>
                  )}
                  {!logoUrl&&<p className="text-xs text-slate-400 text-center">PNG/JPG • Replaces initials circle</p>}
                </div>
              </div>

              {/* Toggles */}
              <div>
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block mb-2">Display Options</label>
                <div className="space-y-3 mt-2">
                  <Toggle label="Show Border Frame" value={showBorder} onChange={setShowBorder} theme={theme}/>
                  <Toggle label="Show Watermark"    value={showWatermark} onChange={setShowWatermark} theme={theme}/>
                </div>
              </div>
            </div>

            {/* Preview swatch */}
            <div className="rounded-xl overflow-hidden border border-slate-200 shadow-sm">
              <div className="px-4 py-2.5 flex items-center gap-3 text-sm font-semibold" style={{background:theme.primary,color:theme.primaryText}}>
                <span className="px-3 py-0.5 rounded-full text-xs font-bold" style={{background:theme.accent,color:theme.accentText}}>Preview</span>
                <span>DMC Header — {basePreset.label} theme</span>
                <span className="ml-auto opacity-70" style={{fontFamily:FONT_MAP[font]}}>Font: {font}</span>
              </div>
              <div className="px-4 py-2 flex gap-4 text-xs" style={{background:theme.rowAlt}}>
                <span className="font-semibold" style={{color:theme.primary}}>Alternate row color sample</span>
              </div>
            </div>

          </div>
        )}
      </div>

      {/* ── SCHOOL SETTINGS ──────────────────────────────────────────────── */}
      <div className="no-print bg-gradient-to-br from-amber-50 to-white border-2 border-amber-200 rounded-2xl shadow-lg p-6 mb-8">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-white" style={{background:theme.primary}}>
              <SchoolIcon className="w-5 h-5"/>
            </div>
            <div>
              <h2 className="font-display text-xl font-bold text-brand-800">School Settings</h2>
              <p className="text-xs text-brand-700">Fill your school info — it appears on the DMC and all pages. Saved automatically.</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {savedFlash&&<span className="flex items-center gap-1 text-green-700 text-sm font-semibold"><Save className="w-4 h-4"/>Saved</span>}
            <button onClick={()=>{resetSchool();flashSaved();}} className="text-xs border border-brand-300 text-brand-800 px-3 py-1.5 rounded-lg hover:bg-brand-50">Reset to default</button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <FInput label="School Name (full)"    value={school.name}    onChange={v=>{updateField("name",v);flashSaved();}}   placeholder="e.g. The City Grammar School"/>
          <FInput label="Short Name / Initials" value={school.short}   onChange={v=>{updateField("short",v);flashSaved();}}  placeholder="e.g. CGS"/>
          <FInput label="Tagline / Sub-line"    value={school.tagline} onChange={v=>{updateField("tagline",v);flashSaved();}} placeholder="e.g. Education System"/>
          <FInput label="Phone"                 value={school.phone}   onChange={v=>{updateField("phone",v);flashSaved();}}/>
          <FInput label="Email"                 value={school.email}   onChange={v=>{updateField("email",v);flashSaved();}}/>
          <FInput label="Address"               value={school.address} onChange={v=>{updateField("address",v);flashSaved();}}/>
        </div>
      </div>

      {/* ── FORM + PREVIEW ───────────────────────────────────────────────── */}
      <div className="grid lg:grid-cols-2 gap-8">

        {/* Left: Form */}
        <div className="no-print bg-white rounded-2xl shadow-lg p-6 border border-brand-100">
          <h2 className="font-display text-xl font-bold text-brand-800 mb-4">Student Information</h2>
          <div className="grid grid-cols-2 gap-3">
            <FInput label="Student Name"  value={student.name}      onChange={v=>setStudent({...student,name:v})}/>
            <FInput label="Father's Name" value={student.father}    onChange={v=>setStudent({...student,father:v})}/>
            <FInput label="Roll Number"   value={student.rollNo}    onChange={v=>setStudent({...student,rollNo:v})}/>
            <FInput label="Class"         value={student.className} onChange={v=>setStudent({...student,className:v})}/>
            <FInput label="Section"       value={student.section}   onChange={v=>setStudent({...student,section:v})}/>
            <FInput label="Session"       value={student.session}   onChange={v=>setStudent({...student,session:v})}/>
            <FInput label="Date of Birth" type="date" value={student.dob} onChange={v=>setStudent({...student,dob:v})}/>
            <FInput label="Position"      value={student.position}  onChange={v=>setStudent({...student,position:v})}/>
            <div className="col-span-2"><FInput label="Examination Type" value={student.examType} onChange={v=>setStudent({...student,examType:v})}/></div>
          </div>

          <div className="flex items-center justify-between mt-6 mb-3">
            <h2 className="font-display text-xl font-bold text-brand-800">Subjects & Marks</h2>
            <button onClick={addSubject} className="flex items-center gap-1 text-white text-sm px-3 py-1.5 rounded-lg hover:opacity-90" style={{background:theme.primary}}>
              <Plus className="w-4 h-4"/>Add
            </button>
          </div>
          <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
            {subjects.map((s,i)=>(
              <div key={i} className="grid grid-cols-12 gap-2 items-center bg-brand-50 p-2 rounded-lg">
                <input className="col-span-5 px-2 py-1.5 rounded border border-brand-200 text-sm bg-white" value={s.name} onChange={e=>updateSubject(i,"name",e.target.value)} placeholder="Subject"/>
                <input type="number" className="col-span-3 px-2 py-1.5 rounded border border-brand-200 text-sm bg-white" value={s.total} onChange={e=>updateSubject(i,"total",e.target.value)} placeholder="Total"/>
                <input type="number" className="col-span-3 px-2 py-1.5 rounded border border-brand-200 text-sm bg-white" value={s.obtained} onChange={e=>updateSubject(i,"obtained",e.target.value)} placeholder="Obtained"/>
                <button onClick={()=>removeSubject(i)} className="col-span-1 text-red-600 hover:text-red-800 flex justify-center"><Trash2 className="w-4 h-4"/></button>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 mt-6">
            <button onClick={downloadPDF} disabled={busy}
              className="flex items-center gap-2 font-semibold px-4 py-2 rounded-lg hover:opacity-90 disabled:opacity-50"
              style={{background:theme.accent,color:theme.accentText}}>
              <Download className="w-4 h-4"/>{busy?"Generating…":"Download PDF"}
            </button>
            <button onClick={()=>window.print()}
              className="flex items-center gap-2 text-white font-semibold px-4 py-2 rounded-lg hover:opacity-90"
              style={{background:theme.primary}}>
              <Printer className="w-4 h-4"/>Print
            </button>
            <button onClick={()=>setSubjects(defaultSubjects)}
              className="flex items-center gap-2 border border-brand-300 text-brand-800 px-4 py-2 rounded-lg hover:bg-brand-50">
              <RotateCcw className="w-4 h-4"/>Reset Subjects
            </button>
          </div>
        </div>

        {/* Right: DMC Preview */}
        <div>
          <div ref={dmcRef}
            className={`print-area bg-white rounded-2xl shadow-2xl ${isCompact?"p-5":"p-8"} relative overflow-hidden`}
            style={{fontFamily:FONT_MAP[font],border:showBorder?`4px double ${theme.border}`:"none"}}>

            {/* Watermark */}
            {showWatermark&&(
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{opacity:0.04}}>
                <div className="text-5xl font-bold text-center px-4 break-all" style={{transform:"rotate(-30deg)",color:theme.watermark}}>
                  {school.name.toUpperCase()}
                </div>
              </div>
            )}

            {/* Header */}
            {isModern?(
              <div className="rounded-xl mb-4 px-5 py-4 text-white" style={{background:theme.primary}}>
                <div className="flex items-center gap-3">
                  <LogoOrInitials logoUrl={logoUrl} initials={initials} theme={theme} size={isCompact?44:56}/>
                  <div>
                    <h1 className="font-bold leading-tight" style={{fontSize:isCompact?18:22}}>{school.name}</h1>
                    <p className="text-xs opacity-75">{school.tagline} • {school.address} • {school.phone}</p>
                  </div>
                </div>
                <div className="mt-3 text-center">
                  <span className="inline-block px-4 py-1 rounded-full text-sm font-bold" style={{background:theme.accent,color:theme.accentText}}>
                    DETAILED MARKS CERTIFICATE
                  </span>
                  <div className="text-xs opacity-80 mt-1">{student.examType} — Session {student.session}</div>
                </div>
              </div>
            ):(
              <div className="text-center border-b-2 pb-4 mb-4 relative" style={{borderColor:theme.border}}>
                <div className={`flex items-center justify-center ${isCompact?"gap-2":"gap-3"}`}>
                  <LogoOrInitials logoUrl={logoUrl} initials={initials} theme={theme} size={isCompact?44:56}/>
                  <div className="text-left">
                    <h1 className="font-bold leading-tight" style={{fontSize:isCompact?18:22,color:theme.primary}}>{school.name}</h1>
                    {!isCompact&&<p className="text-xs" style={{color:theme.primary,opacity:0.7}}>{school.tagline}</p>}
                    <p className="text-xs" style={{color:theme.primary,opacity:0.7}}>{school.address} • {school.phone}</p>
                  </div>
                </div>
                <div className="mt-3">
                  <span className="inline-block px-4 py-1 rounded-full text-sm font-bold text-white" style={{background:theme.primary}}>
                    DETAILED MARKS CERTIFICATE
                  </span>
                  <div className="text-xs mt-1" style={{color:theme.primary,opacity:0.8}}>{student.examType} — Session {student.session}</div>
                </div>
              </div>
            )}

            {/* Student info */}
            <div className={`grid grid-cols-2 gap-x-6 ${isCompact?"gap-y-1":"gap-y-1.5"} text-sm mb-4 relative`}>
              <InfoRow label="Student Name"  value={student.name}    theme={theme}/>
              <InfoRow label="Father's Name" value={student.father}  theme={theme}/>
              <InfoRow label="Roll Number"   value={student.rollNo}  theme={theme}/>
              <InfoRow label="Class"         value={`${student.className} - ${student.section}`} theme={theme}/>
              <InfoRow label="Date of Birth" value={student.dob}     theme={theme}/>
              <InfoRow label="Position"      value={student.position} theme={theme}/>
            </div>

            {/* Marks table */}
            <table className="w-full text-sm border-collapse relative">
              <thead>
                <tr style={{background:theme.primary,color:theme.primaryText}}>
                  {["#","Subject","Total","Obtained","%","Grade"].map((h,i)=>(
                    <th key={h} className={`border px-2 py-2 ${i>1?"text-center":"text-left"}`} style={{borderColor:theme.border}}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {subjects.map((s,i)=>{
                  const p=s.total?(s.obtained/s.total)*100:0;
                  return(
                    <tr key={i} style={{background:i%2?theme.rowAlt:"#ffffff"}}>
                      <td className="border px-2 py-1.5" style={{borderColor:theme.border+"55"}}>{i+1}</td>
                      <td className="border px-2 py-1.5 font-medium" style={{borderColor:theme.border+"55"}}>{s.name}</td>
                      <td className="border px-2 py-1.5 text-center" style={{borderColor:theme.border+"55"}}>{s.total}</td>
                      <td className="border px-2 py-1.5 text-center font-semibold" style={{borderColor:theme.border+"55"}}>{s.obtained}</td>
                      <td className="border px-2 py-1.5 text-center" style={{borderColor:theme.border+"55"}}>{p.toFixed(1)}%</td>
                      <td className="border px-2 py-1.5 text-center font-bold" style={{borderColor:theme.border+"55",color:theme.primary}}>{getGrade(p).g}</td>
                    </tr>
                  );
                })}
                <tr className="font-bold" style={{background:theme.rowAlt}}>
                  <td colSpan={2} className="border px-2 py-2 text-right" style={{borderColor:theme.border}}>TOTAL</td>
                  <td className="border px-2 py-2 text-center" style={{borderColor:theme.border}}>{totalMarks}</td>
                  <td className="border px-2 py-2 text-center" style={{borderColor:theme.border,color:theme.primary}}>{obtained}</td>
                  <td className="border px-2 py-2 text-center" style={{borderColor:theme.border}}>{percentage.toFixed(2)}%</td>
                  <td className="border px-2 py-2 text-center" style={{borderColor:theme.border,color:theme.primary}}>{grade}</td>
                </tr>
              </tbody>
            </table>

            {/* Summary */}
            <div className="grid grid-cols-3 gap-3 mt-5 relative">
              <SummaryBox label="Percentage" value={`${percentage.toFixed(2)}%`} bg={theme.summaryBg} fg={theme.primaryText}/>
              <SummaryBox label="Grade"      value={grade}  bg={theme.accent}    fg={theme.accentText}/>
              <SummaryBox label="Status"     value={status} bg={status==="PASS"?"#16a34a":"#dc2626"} fg="#fff"/>
            </div>
            <p className="text-center text-sm mt-3 italic relative" style={{color:theme.primary}}>
              Remarks: <span className="font-semibold">{remarks}</span>
            </p>

            {/* Signatures */}
            <div className="grid grid-cols-3 gap-6 mt-10 text-center text-xs relative">
              {["Class Teacher","Examination Controller","Principal"].map(l=>(
                <div key={l}><div className="border-t-2 pt-1 mt-8" style={{borderColor:theme.border}}>{l}</div></div>
              ))}
            </div>

            <div className="mt-6 flex items-center justify-center gap-2 text-xs relative" style={{color:theme.primary,opacity:0.7}}>
              <FileCheck2 className="w-4 h-4"/>
              Computer generated certificate. Issued on {new Date().toLocaleDateString()}.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LogoOrInitials({logoUrl,initials,theme,size}:{logoUrl:string|null;initials:string;theme:ThemePreset;size:number}){
  if(logoUrl)return<img src={logoUrl} alt="logo" style={{width:size,height:size,objectFit:"contain",borderRadius:8,background:"#fff",padding:2,flexShrink:0}}/>;
  return(
    <div style={{width:size,height:size,borderRadius:"50%",background:theme.primary,color:theme.accent,
      display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,
      fontSize:size*0.3,flexShrink:0,border:`2px solid ${theme.accent}`}}>
      {initials}
    </div>
  );
}

function Toggle({label,value,onChange,theme}:{label:string;value:boolean;onChange:(v:boolean)=>void;theme:ThemePreset}){
  return(
    <label className="flex items-center gap-3 cursor-pointer" onClick={()=>onChange(!value)}>
      <div className="w-10 h-5 rounded-full relative transition-colors" style={{background:value?theme.primary:"#cbd5e1"}}>
        <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${value?"translate-x-5":"translate-x-0.5"}`}/>
      </div>
      <span className="text-sm text-slate-700">{label}</span>
    </label>
  );
}

function FInput({label,value,onChange,type="text",placeholder}:{label:string;value:string;onChange:(v:string)=>void;type?:string;placeholder?:string}){
  return(
    <label className="text-xs font-semibold text-brand-700 block">
      {label}
      <input type={type} value={value} placeholder={placeholder} onChange={e=>onChange(e.target.value)}
        className="mt-1 w-full px-3 py-2 rounded-lg border border-brand-200 text-sm font-normal text-brand-900 bg-white focus:outline-none focus:border-brand-600"/>
    </label>
  );
}

function InfoRow({label,value,theme}:{label:string;value:string;theme:ThemePreset}){
  return(
    <div className="flex gap-2 border-b border-dotted py-1" style={{borderColor:theme.border+"44"}}>
      <span className="font-semibold" style={{color:theme.primary}}>{label}:</span>
      <span className="text-gray-800">{value}</span>
    </div>
  );
}

function SummaryBox({label,value,bg,fg}:{label:string;value:string;bg:string;fg:string}){
  return(
    <div className="text-center rounded-lg p-3" style={{background:bg,color:fg}}>
      <div className="text-xs opacity-90">{label}</div>
      <div className="text-2xl font-bold">{value}</div>
    </div>
  );
}