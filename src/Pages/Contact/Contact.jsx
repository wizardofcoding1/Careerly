import Navbar from "../../Components/Layout/Navbar";
import Footer from "../../Components/Layout/Footer";
import ContactHeader from "./ContactComponent/ContactHeader";
import ContactForm from "./ContactComponent/ContactForm";
export default function Contact() {
  return (
    <div className="bg-gray-100">
      <Navbar />
      <div className="min-h-screen bg-gray-100 px-15 pt-8">
        <ContactHeader />
        <ContactForm />
      </div>
      <Footer />
    </div>
  );
}
