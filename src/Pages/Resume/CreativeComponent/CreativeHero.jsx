// src/Components/Resume/Creative/CreativeHero.jsx
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CreativeHero() {
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-5xl flex flex-col items-center ">
      {/* 🔙 Back Button Row */}
      <div className="w-full flex items-center">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-purple-600 hover:text-purple-800 transition"
        >
          <ArrowLeft size={20} /> Back
        </button>
      </div>

      {/* 🎨 Title */}
      <h1 className="text-3xl font-bold text-purple-700 text-center">
        Creative Resume Templates
      </h1>
    </div>
  );
}
