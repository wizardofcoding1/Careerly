import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../Layout/Navbar";

export default function QuizSetup() {
  const navigate = useNavigate();
  const location = useLocation();
  const level = location.state?.level || "BEGINNER";

  const [topic, setTopic] = useState("");
  const [numQuestions, setNumQuestions] = useState("");
  const [description, setDescription] = useState("");

  // Error states
  const [topicError, setTopicError] = useState("");
  const [numQuestionsError, setNumQuestionsError] = useState("");

  const handleStartQuiz = () => {
    let valid = true;

    // Reset errors
    setTopicError("");
    setNumQuestionsError("");

    // Topic validation
    if (!topic.trim()) {
      setTopicError("Topic is required!");
      valid = false;
    }

    // Number of questions validation
    const num = parseInt(numQuestions, 10);
    if (!numQuestions) {
      setNumQuestionsError("Number of questions is required!");
      valid = false;
    } else if (num < 10 || num > 40) {
      setNumQuestionsError("Number of questions must be between 10 and 40!");
      valid = false;
    }

    if (!valid) return;

    // Navigate to quiz page with collected info
    navigate("/quiz", {
      state: {
        level,
        topic,
        numQuestions: num,
        description,
      },
    });
  };

  return (
    <div>
      <Navbar/>
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Setup Your Quiz
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Level Selected: <span className="font-semibold text-blue-600">{level}</span>
        </p>

        <div className="flex flex-col gap-5">
          {/* Topic */}
          <div className="flex flex-col">
            <label className="mb-1 text-gray-700 font-medium">Topic *</label>
            <input
              type="text"
              placeholder="Enter the quiz topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className={`p-3 border rounded-lg focus:outline-none focus:ring-2 transition ${
                topicError ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-blue-400"
              }`}
            />
            {topicError && <p className="text-red-500 text-sm mt-1">{topicError}</p>}
          </div>

          {/* Number of Questions */}
          <div className="flex flex-col">
            <label className="mb-1 text-gray-700 font-medium">Number of Questions *</label>
            <input
              type="number"
              placeholder="10 - 40"
              min={10}
              max={40}
              value={numQuestions}
              onChange={(e) => setNumQuestions(e.target.value)}
              className={`p-3 border rounded-lg focus:outline-none focus:ring-2 transition ${
                numQuestionsError ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-blue-400"
              }`}
            />
            {numQuestionsError && <p className="text-red-500 text-sm mt-1">{numQuestionsError}</p>}
          </div>

          {/* Description */}
          <div className="flex flex-col">
            <label className="mb-1 text-gray-700 font-medium">Description</label>
            <textarea
              placeholder="Optional description about the quiz topic"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 transition resize-none h-32"
            />
          </div>

          {/* Submit Button */}
          <button
            onClick={handleStartQuiz}
            className="w-full py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition text-lg font-semibold"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
    </div>
  );
}
