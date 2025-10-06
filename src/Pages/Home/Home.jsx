import Navbar from "../../Components/Layout/Navbar";
import ResumeAndQuizTemplate from "./HomePageComponent/ResumeAndQuizTemplates";
import SearchBar from "./HomePageComponent/SearchBar";
import ResumeComponent from "./HomePageComponent/ResumeComponent";
import QuizSection from "./HomePageComponent/QuizSection";
import Footer from "../../Components/Layout/Footer";
import AIChatWidget from "../../Components/AI/AIChatWidget";

export default function Home() {
    return (
        <div className="bg-gray-50">
            <Navbar />
            <div className="px-12 pt-8">
                <ResumeAndQuizTemplate />
                <SearchBar />
                <ResumeComponent />
                <QuizSection />
            </div>
            <Footer />
            <AIChatWidget />
        </div>
    );
}


