// src/Components/Resume/ResumePage.jsx

import Navbar from "../../Components/Layout/Navbar";
import Footer from "../../Components/Layout/Footer";
import MinimalisticViewer from "./MinimalisticComponent/MinimalisticViewer";

export default function MinimalisticResumePage() {
  return (
    <div>
      <Navbar />
      <MinimalisticViewer />
      <Footer />
    </div>
  );
}
