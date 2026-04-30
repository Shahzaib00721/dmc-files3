import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SchoolProvider } from "@/context/SchoolContext";

export const metadata: Metadata = {
  title: "School Management Website",
  description: "A complete school website with a customizable DMC (Detailed Marks Certificate) generator.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <SchoolProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </SchoolProvider>
      </body>
    </html>
  );
}
