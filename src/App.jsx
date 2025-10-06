import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import About from "./Pages/About/About";
import Contact from "./Pages/Contact/Contact";
import YTVideo from "./Pages/YouTubeVideo/YTVideo";
import PrivacyPolicy from "./Pages/PrivacyPolicy/PrivacyPolicy";
import ScrollToTop from "./Components/Common/ScrollToTop";
import Video from "./Pages/Videos/video";

import ProfessionalResumePage from "./Pages/Resume/ProfessionalResumePage";
import CreativeResumePage from "./Pages/Resume/CreativeResumePage";
import ExecutiveResumePage from "./Pages/Resume/ExecutiveResumePage";
import MinimalisticResumePage from "./Pages/Resume/MinimalisticResumePage";

// ✅ Quiz
import QuizSetup from "./Components/QuizRequirement/QuizSetup";
import QuizPage from "./Pages/Quizzes/QuizPage"; // your QuizPage component

// ✅ Clerk Auth
import ProtectedRoute from "./Components/Authenticate/ProtectedRoute";
import SyncUser from "./Components/Authenticate/SyncUser";

// ✅ AI
import ChatBotPageFull from "./Components/AI/ChatBotPageFull";
import { ChatProvider } from "./Components/AI/ChatContext";

function App() {
  return (
    <ChatProvider>
      <Router>
        {/* 👇 runs silently, syncs Clerk user with MongoDB */}
        <SyncUser />  
        <ScrollToTop />
        <Routes>
          {/* Public Route */}
          <Route path="/" element={<Home />} />

          {/* Protected Routes */}
          <Route path="/about" element={<ProtectedRoute><About /></ProtectedRoute>} />
          <Route path="/contact" element={<ProtectedRoute><Contact /></ProtectedRoute>} />
          <Route path="/privacy-policy" element={<ProtectedRoute><PrivacyPolicy /></ProtectedRoute>} />
          <Route path="/Careerly-Video" element={<ProtectedRoute><YTVideo /></ProtectedRoute>} />
          <Route path="/video" element={<ProtectedRoute><Video /></ProtectedRoute>} />

          {/* ✅ Quiz Routes */}
          <Route path="/quiz-setup" element={<ProtectedRoute><QuizSetup /></ProtectedRoute>} />
          <Route path="/quiz" element={<ProtectedRoute><QuizPage /></ProtectedRoute>} />
         
          <Route path="/resume-templates/professional" element={<ProtectedRoute><ProfessionalResumePage /></ProtectedRoute>} />
          <Route path="/resume-templates/creative" element={<ProtectedRoute><CreativeResumePage /></ProtectedRoute>} />
          <Route path="/resume-templates/executive" element={<ProtectedRoute><ExecutiveResumePage /></ProtectedRoute>} />
          <Route path="/resume-templates/minimalistic" element={<ProtectedRoute><MinimalisticResumePage /></ProtectedRoute>} />

          {/* ✅ AI Chat */}
          <Route path="/ai-chat" element={<ProtectedRoute><ChatBotPageFull /></ProtectedRoute>} />
        </Routes>
      </Router>
    </ChatProvider>
  );
}

export default App;
