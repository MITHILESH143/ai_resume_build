import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";
import Script from "next/script";

// Load Inter font with CSS variable
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s - ProFileBuilder",
    absolute: "ProFileBuilder",
  },
  description: "Generate smart resumes with AI assistance",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className={inter.variable} suppressHydrationWarning>
        <head>
          <Script
            src="https://checkout.razorpay.com/v1/checkout.js"
            strategy="lazyOnload"
          />
        </head>
        <body className="antialiased">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster duration={3000} closeButton position="top-center" />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
