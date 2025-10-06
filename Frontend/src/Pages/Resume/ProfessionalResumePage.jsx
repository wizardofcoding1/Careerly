// src/Components/Resume/ResumePage.jsx

import Navbar from "../../Components/Layout/Navbar";
import Footer from "../../Components/Layout/Footer";
import ResumeViewer from "./ProfessionalResumeComponents/ResumeViewer";

export default function ResumePage() {
  return (
    <div>
      <Navbar />
      <ResumeViewer />
      <Footer />
    </div>
  );
}
