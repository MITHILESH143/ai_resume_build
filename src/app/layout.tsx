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
  metadataBase: new URL("https://profilebuilder-two.vercel.app"),
  title: {
    template: "%s - ProFileBuilder",
    absolute: "ProFileBuilder",
  },
  description: "Generate smart resumes with AI assistance",
  openGraph: {
    title: "ProFileBuilder – AI Resume Builder",
    description: "Generate smart resumes with AI assistance",
    url: "https://profilebuilder-two.vercel.app",
    siteName: "ProFileBuilder",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "ProFileBuilder preview",
      },
    ],
    type: "website",
  },
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
            <Toaster duration={3000} closeButton />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
