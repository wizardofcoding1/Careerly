// src/Components/Resume/Executive/ExecutiveHero.jsx
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ExecutiveHero({ category }) {
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-5xl flex flex-col items-center mb-10">
      {/* 🔙 Back Button Row */}
      <div className="w-full flex items-center mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-yellow-500 hover:text-yellow-600 transition"
        >
          <ArrowLeft size={20} /> Back
        </button>
      </div>

      {/* 🏆 Title + Subtitle */}
      <h2 className="text-3xl font-bold text-yellow-400 text-center">
        {category} Resumes
      </h2>
      <p className="text-gray-300 mt-2 text-center">
        Bold & Professional Templates for Senior Roles
      </p>
    </div>
  );
}
