import { Metadata } from "next";
import ResumeEditior from "./ResumeEditior";

export const metadata: Metadata = {
  title: "Design your resume",
};

const Page = () => {
  return <ResumeEditior />;
};

export default Page;
