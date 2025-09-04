import Image from "next/image";
import logo from "@/assests/logo.png";
import resumePreviewImage from "@/assests/resume-preview.jpg";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-gray-100 px-5 py-12 text-center text-gray-500 md:flex-row md:text-start lg:gap-12">
      <div className="max-w-prose space-y-3">
        <Image
          src={logo}
          alt="logo"
          width={200}
          height={200}
          className="mx-auto md:ms-0"
        />
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Build Smarter with{" "}
          <span className="inline-block bg-gradient-to-r from-blue-500 to-blue-300 bg-clip-text text-transparent">
            ProFileBuilder
          </span>
        </h1>
        <p className="text-lg text-gray-500">
          An intelligent resume builder that lets you craft stunning resumes in
          minutes - no design skills needed!
        </p>
        <Button asChild size="lg" variant="premium">
          <Link href="/resumes">Get Started</Link>
        </Button>
      </div>
      <div className="mt-6 flex items-center justify-center md:mt-0">
        <Image
          src={resumePreviewImage}
          alt="Resume Preview Image"
          width={500}
          height={650}
          className="max-h-[calc(100vh-12rem)] rounded-md object-contain drop-shadow-lg lg:rotate-[1.5deg]"
        />
      </div>
    </main>
  );
}
