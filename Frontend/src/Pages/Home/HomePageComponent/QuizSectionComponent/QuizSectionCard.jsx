import { useState } from "react";
import { Eye, UserRoundCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function QuizSectionCard() {
  const [selectedCard, setSelectedCard] = useState(null);
  const navigate = useNavigate();

  const quizLevels = [
    { id: 1, title: "BEGINNER", description: "Perfect for newcomers!" },
    { id: 2, title: "SIMPLE", description: "A step up from beginner." },
    { id: 3, title: "INTERMEDIATE", description: "Intermediate level quizzes." },
    { id: 4, title: "ADVANCED", description: "For pros! Deep and tricky questions." },
  ];

  const handleSelect = (id) => {
    setSelectedCard(id);
  };

  const handleStartQuiz = (quiz) => {
    if (!selectedCard) return; // no card selected
    // navigate to Quiz Setup page, passing the level in state
    navigate("/quiz-setup", { state: { level: quiz.title } });
  };

  return (
    <div className="bg-white px-3 py-2 gap-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {quizLevels.map((quiz) => (
          <div
            key={quiz.id}
            className={`rounded-md p-4 flex flex-col gap-2 border-2 cursor-pointer transition-colors duration-300
              ${
                selectedCard === quiz.id
                  ? "border-2 bg-blue-200 border-blue-400 shadow-md"
                  : "border-gray-300 hover:bg-blue-100 hover:shadow-md bg-white"
              }`}
            onClick={() => handleSelect(quiz.id)}
          >
            <h3 className="text-xl font-semibold">{quiz.title}</h3>
            <p className="text-sm">{quiz.description}</p>

            <div className="flex flex-row justify-between gap-2 mt-2">
              <div className="flex flex-row flex-wrap justify-center gap-1">
                <Eye />
                <p>10+</p>
              </div>
              <div className="flex flex-row flex-wrap justify-center gap-1">
                <UserRoundCheck />
                <p>20+</p>
              </div>
            </div>

            <button
              onClick={(e) =>{ e.stopPropagation(); handleStartQuiz(quiz)}}
              className={`px-4 py-2 rounded-md transition-colors duration-200 w-fit mt-auto shadow-md
                ${
                  selectedCard === quiz.id
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "border border-blue-600 text-blue-600 bg-white hover:bg-gray-100"
                }`}
            >
              {selectedCard === quiz.id ? "Start Quiz" : "Select Quiz"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
