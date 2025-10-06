import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import QuizLayout from "../../Components/QuizRequirement/QuizLayout";
import axios from "axios";
import Navbar from "../../Components/Layout/Navbar";
import Loader from "../../Components/Common/Loader";

export default function QuizPage() {
  const location = useLocation();
  const { level, topic, numQuestions, description } = location.state || {};
  const [quizData, setQuizData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const generateQuiz = async () => {
      try {
        const { data } = await axios.post("/api/generate-quiz", {
          level,
          topic,
          numQuestions,
          description,
        });

        if (data.error) {
          setError(data.error);
        } else {
          const formattedQuiz = (data.quiz || []).map((q, idx) => ({
            id: q.id || idx + 1,
            question: q.question || "No question available",
            options: Array.isArray(q.options) && q.options.length
              ? q.options
              : ["Option 1", "Option 2", "Option 3", "Option 4"],
            answer: q.answer || q.options?.[0] || "Option 1",
          }));

          setQuizData(formattedQuiz);
        }
      } catch (err) {
        console.error(err);
        setError("Questions could not be generated. Sorry!");
      } finally {
        setLoading(false);
      }
    };

    generateQuiz();
  }, [level, topic, numQuestions, description]);

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Loader size="large" color="blue" />
      <p className="text-center mt-4 text-lg font-medium text-gray-600">Generating quiz...</p>
    </div>
  );
  if (error) return <p className="text-center mt-20 text-red-500">{error}</p>;
  if (!quizData.length)
    return <p className="text-center mt-20 text-gray-500">No questions available.</p>;

  // ✅ Pass topic, level, description as props
  return (
    <div className="bg-gray-50">
    {/* <Navbar/>
    <div className="px-12 pt-8"> */}
    <QuizLayout
      questions={quizData}
      topic={topic}
      level={level}
      description={description}
      />
    </div>
    // </div>
  );
}
