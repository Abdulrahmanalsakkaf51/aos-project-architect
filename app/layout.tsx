import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AOS Project Architect",
  description: "Turn a real-world problem into a structured human–AI project.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
