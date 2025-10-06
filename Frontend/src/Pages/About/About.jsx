// File: src/pages/About/About.jsx
import Navbar from "../../Components/Layout/Navbar";
import Footer from "../../Components/Layout/Footer";
import AboutUsPage from "./AboutUsComponent/index"; 

export default function About() {
  return (
    <div className="bg-gray-100">
      <Navbar />
        <AboutUsPage />
      <Footer />
    </div>
  );
}
