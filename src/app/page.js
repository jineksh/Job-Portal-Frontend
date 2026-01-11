import Image from "next/image";
import { Loader } from "@/components/common/Loader";
import { ErrorState } from "@/components/common/ErrorState";
import Hero from '@/components/home/Hero'
import ResumeAnalyzer from '@/components/home/ResumeAnalyzer'
import CareerGuidance from '@/components/home/CareerGuidance'

export default function Home() {
  return (
    <div>
        <Hero />
        <CareerGuidance />
        <ResumeAnalyzer />
        
    </div>
    
  );
}
