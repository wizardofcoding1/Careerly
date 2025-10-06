// src/Components/Resume/Minimalistic/MinimalisticHero.jsx
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function MinimalisticHero() {
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-5xl flex flex-col items-center mb-10">
      {/* 🔙 Back Button */}
      <div className="w-full flex items-center mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-teal-600 hover:text-teal-800 transition"
        >
          <ArrowLeft size={20} /> Back
        </button>
      </div>

      {/* Title + Subtitle */}
      <h1 className="text-3xl font-bold text-teal-900 mb-2 text-center">
        Minimalistic Resume
      </h1>
      <p className="text-teal-600 text-lg text-center">
        Simple, Elegant & ATS-Friendly
      </p>
    </div>
  );
}
