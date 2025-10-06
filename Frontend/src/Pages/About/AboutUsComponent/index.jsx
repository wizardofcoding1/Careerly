// File: src/pages/About/AboutUsComponent/index.jsx
import { Briefcase, ClipboardList, BarChart, Youtube, Bot, Globe, Coffee, Code, BookOpen } from "lucide-react";

import HeroSection from './HeroSection';
import FoundationStory from './FoundationStory';
import MissionPurpose from './MissionPurpose';
import TeamThoughts from './TeamThoughts';
import ImpactMetrics from './ImpactMetrics';
import Testimonials from './Testimonials';
import CoreFeatures from './CoreFeatures';
import FunFacts from "./FunFacts";
import Acknowledgments from './Acknowledgements';
import Scope from "./Scope";
import Frined from '../../../assets/Friend.jpg';
import naruto from "../.././../assets/naruto.jpg";
import sasuke from "../../../assets/sasuke.jpg";
import tsunade from "../../../assets/tsunade.jpg";
import hinata from "../../../assets/hinata.jpg";

export default function index() {
  const friendSrc = Frined;

  const features = [
    { title: "Resume Builder", icon: <Briefcase className="w-8 h-8 text-blue-600" /> },
    { title: "Skill Quizzes & Assessments", icon: <ClipboardList className="w-8 h-8 text-green-600" /> },
    { title: "Career Insights & Roadmaps", icon: <BarChart className="w-8 h-8 text-purple-600" /> },
    { title: "Learning Hub (YouTube + Resources)", icon: <Youtube className="w-8 h-8 text-red-600" /> },
    { title: "AI Powered Doubt Solver", icon: <Bot className="w-8 h-8 text-orange-600" /> },
    { title: "Community & Networking", icon: <Globe className="w-8 h-8 text-purple-700" /> },
  ];

  const team = [
    { name: "Naruto Uzumaki", role: "Frontend Developer", thought: "Let's make something simple but powerful for everyone.", img: naruto },
    { name: "Hinata Uzumaki", role: "Backend Developer", thought: "Free access should never compromise quality.", img: hinata },
    { name: "Sasuke Uchina", role: "UI/UX Designer", thought: "Career tools should be accessible and beautiful.", img: sasuke },
    { name: "Tsunade Senju", role: "AI Engineer", thought: "AI should guide learners like a mentor, not replace them.", img: tsunade },
  ];

  const impact = [
    { number: "5k+", label: "Resumes Built" },
    { number: "10k+", label: "Quizzes Attempted" },
    { number: "50+", label: "Learning Resources" },
    { number: "100%", label: "Free & Accessible" },
  ];

  const testimonials = [
    { name: "Aditya", text: "Careerly helped me crack my first internship by giving me the right guidance and resume support." },
    { name: "Sneha", text: "I loved the quizzes — they made me realize where I stand and how to improve." },
    { name: "Karan", text: "The AI doubt solver felt like having a mentor available 24/7." },
    { name: "Priya", text: "The learning hub made my prep journey 10x smoother." },
    { name: "Arjun", text: "Building my resume here got me interview-ready quickly." },
    { name: "Nisha", text: "The team really thought about accessibility. It's simple and effective." },
    { name: "Rahul", text: "Careerly is proof that quality doesn't need a price tag." },
    { name: "Simran", text: "The quizzes made studying fun and competitive." },
    { name: "Aakash", text: "It's rare to find a free platform this impactful." },
    { name: "Tanya", text: "Loved the community aspect — I felt guided and not alone." },
  ];

  const funFacts = [
    { icon: <Coffee className="w-6 h-6 text-yellow-500" />, fact: "100+ cups of coffee consumed while coding." },
    { icon: <Code className="w-6 h-6 text-green-500" />, fact: "200+ hours of development and debugging." },
    { icon: <BookOpen className="w-6 h-6 text-indigo-500" />, fact: "Countless resources researched and curated." },
  ];

  const acknowledgments = [
    "Inspired by open-source communities.",
    "Thanks to mentors and peers for feedback.",
    "Built with React, TailwindCSS, and lots of passion.",
  ];

  return (
      <div className="bg-gray-100 min-h-screen px-12 pt-8">
      <HeroSection />
      <FoundationStory friendSrc={friendSrc} />
      <Scope/>
      <MissionPurpose />
      <TeamThoughts team={team} />
      <ImpactMetrics impact={impact} />
      <Testimonials testimonials={testimonials} />
      <CoreFeatures features={features} />
      <FunFacts funFacts={funFacts} />
      <Acknowledgments acknowledgments={acknowledgments} />
    </div>   
    
  );
}
