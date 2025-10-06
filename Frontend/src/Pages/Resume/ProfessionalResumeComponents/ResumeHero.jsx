// src/Components/Resume/ResumeHero.jsx
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ResumeHero() {
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-5xl flex flex-col items-center mb-10">
      {/* 🔙 Back Button */}
      <div className="w-full flex items-center mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition"
        >
          <ArrowLeft size={20} /> Back
        </button>
      </div>

      {/* Title + Subtitle */}
      <h1 className="text-4xl font-extrabold text-gray-900 mb-2 text-center">
        Professional Resume Templates
      </h1>
      <p className="text-gray-600 text-lg text-center">
        Choose from modern, clean, and professional resume templates.  
        Download, preview, or customize to create your perfect resume.
      </p>
    </div>
  );
}
