"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type SchoolInfo = {
  name: string;       // Full school name (used in DMC heading, footer, etc.)
  short: string;      // Short name / abbreviation (used in logo circle, watermark)
  tagline: string;    // Sub-line under the name
  address: string;
  phone: string;
  email: string;
};

const DEFAULT_SCHOOL: SchoolInfo = {
  name: "Your School Name",
  short: "School",
  tagline: "Education System",
  address: "Main Campus, Your City",
  phone: "+92 300 0000000",
  email: "info@yourschool.edu",
};

const STORAGE_KEY = "school_info_v1";

type Ctx = {
  school: SchoolInfo;
  setSchool: (s: SchoolInfo) => void;
  updateField: (k: keyof SchoolInfo, v: string) => void;
  reset: () => void;
};

const SchoolContext = createContext<Ctx | null>(null);

export function SchoolProvider({ children }: { children: ReactNode }) {
  const [school, setSchoolState] = useState<SchoolInfo>(DEFAULT_SCHOOL);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setSchoolState({ ...DEFAULT_SCHOOL, ...JSON.parse(raw) });
    } catch {}
    setHydrated(true);
  }, []);

  const setSchool = (s: SchoolInfo) => {
    setSchoolState(s);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(s)); } catch {}
  };
  const updateField = (k: keyof SchoolInfo, v: string) => {
    const next = { ...school, [k]: v };
    setSchool(next);
  };
  const reset = () => {
    setSchool(DEFAULT_SCHOOL);
  };

  return (
    <SchoolContext.Provider value={{ school: hydrated ? school : DEFAULT_SCHOOL, setSchool, updateField, reset }}>
      {children}
    </SchoolContext.Provider>
  );
}

export function useSchool() {
  const ctx = useContext(SchoolContext);
  if (!ctx) throw new Error("useSchool must be used inside <SchoolProvider>");
  return ctx;
}
