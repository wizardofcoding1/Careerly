import { useState, useEffect } from "react";
import Navbar from "../Layout/Navbar";

export default function QuizLayout({ questions = [], topic = "Demo", level = "BEGINNER", description = "" }) {
  const [quizData, setQuizData] = useState([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [lockedQuestions, setLockedQuestions] = useState({});
  const [message, setMessage] = useState("");
  const [showScore, setShowScore] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // New state to manage loading

  useEffect(() => {
    // Check if the questions array has been populated with real data
    if (questions && questions.length > 0) {
      setQuizData(questions);
      setIsLoading(false); // Stop loading when data is received
    } else {
      // Keep loading until data is received
      // Note: A real app would have a way to handle no data after a timeout
      setIsLoading(true);
    }
  }, [questions]); // The effect depends on the 'questions' prop

  const handleAnswer = (qId, option) => {
    if (lockedQuestions[qId]) {
      setMessage("You have already answered this question.");
      setTimeout(() => setMessage(""), 2000);
      return;
    }
    setSelectedAnswers(prev => ({ ...prev, [qId]: option }));
    setLockedQuestions(prev => ({ ...prev, [qId]: true }));
  };

  const handleNext = () => {
    if (currentQ < quizData.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      setShowScore(true);
    }
  };

  const handleRetry = () => {
    setSelectedAnswers({});
    setLockedQuestions({});
    setShowScore(false);
    setCurrentQ(0);
    setMessage("");
  };

  const correctCount = quizData.filter(q => selectedAnswers[q.id] === q.answer).length;
  const progress = ((currentQ + (showScore ? 1 : 0)) / quizData.length) * 100;
  
  // Conditionally render a loading state
  if (isLoading) {
    return <p className="text-center mt-20 text-gray-500">Loading questions or no questions available.</p>;
  }

  return (
    <div>
      <Navbar/>
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-6">
        <h1 className="text-3xl font-bold text-center mb-2 text-gray-800">{topic} Quiz</h1>
        <p className="text-center text-gray-600 mb-4">
          Level: <span className="font-semibold text-blue-600">{level}</span>
        </p>
        {description && <p className="text-center text-gray-500 mb-6 italic">{description}</p>}

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-3 mb-6 overflow-hidden flex">
          {!showScore ? (
            <div className="bg-blue-600 h-3 transition-all duration-300" style={{ width: `${progress}%` }} />
          ) : (
            quizData.map(q => {
              const answered = selectedAnswers[q.id];
              const correct = answered === q.answer;
              return (
                <div key={q.id} className={`h-3 ${!answered ? "bg-gray-400" : correct ? "bg-green-500" : "bg-red-500"}`} style={{ width: `${100 / quizData.length}%` }} />
              );
            })
          )}
        </div>

        {message && <p className="text-center text-red-500 font-medium mb-4">{message}</p>}

        {!showScore ? (
          <>
            <div className="p-6 border rounded-2xl shadow-sm bg-gray-50 mb-6">
              <h2 className="font-semibold text-lg mb-4">Q{currentQ + 1}. {quizData[currentQ]?.question}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {quizData[currentQ]?.options?.length ? (
                  quizData[currentQ].options.map(option => {
                    const isSelected = selectedAnswers[quizData[currentQ].id] === option;
                    const isCorrect = quizData[currentQ].answer === option;
                    const locked = lockedQuestions[quizData[currentQ].id];
                    const showColor = isSelected && (isCorrect ? "bg-green-500 text-white" : "bg-red-500 text-white");

                    return (
                      <button
                        key={option}
                        onClick={() => handleAnswer(quizData[currentQ].id, option)}
                        disabled={locked}
                        className={`px-4 py-3 border rounded-xl font-medium text-gray-700 transition transform hover:scale-105 ${showColor ? showColor : locked ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-white hover:bg-blue-50"}`}
                      >
                        {option}
                      </button>
                    );
                  })
                ) : (
                  <p className="text-gray-500">No options available</p>
                )}
              </div>
            </div>

            <div className="flex justify-between items-center">
              <p className="text-gray-600">Question {currentQ + 1} of {quizData.length}</p>
              <button onClick={handleNext} disabled={!lockedQuestions[quizData[currentQ].id]} className={`px-6 py-2 rounded-lg text-white font-semibold transition ${lockedQuestions[quizData[currentQ].id] ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"}`}>
                {currentQ === quizData.length - 1 ? "See Score" : "Next"}
              </button>
            </div>
          </>
        ) : (
          <div className="text-center p-6">
            <h2 className="text-2xl font-bold mb-4">Your Results</h2>
            <p className="text-lg text-green-600 font-semibold mb-2">Correct: {correctCount}</p>
            <p className="text-lg text-red-600 font-semibold mb-4">Wrong: {quizData.length - correctCount}</p>
            <button onClick={handleRetry} className="mt-4 bg-gray-700 text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition font-semibold">Retry Quiz</button>
          </div>
        )}
      </div>
    </div>
    </div>
  );
}