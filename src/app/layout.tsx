import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Load Inter font with CSS variable
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s - AI Resume Builder",
    absolute: "AI Resume Builder",
  },
  description: "Generate smart resumes with AI assistance",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
