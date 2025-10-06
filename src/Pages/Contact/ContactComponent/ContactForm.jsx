import { useState } from "react";
import { User, Mail, Phone, FileText, CheckCircle, XCircle, Loader2 } from "lucide-react";
import axios from "axios";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    description: "",
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("Please fill in all fields before submitting.");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone" && value.length > 10) return;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.description) {
      setErrorMessage("Please fill in all fields before submitting.");
      setShowError(true);
      setTimeout(() => setShowError(false), 5000);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const url = "/api/email/contact";
      const response = await axios.post(url, formData);
      console.log("Form Submitted:", response.data);
      setFormData({ firstName: "", lastName: "", email: "", phone: "", description: "" });
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 5000);
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrorMessage("Failed to send your message. Please try again later.");
      setShowError(true);
      setTimeout(() => setShowError(false), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-2xl shadow-lg max-w-2xl mx-auto mt-10 animate-fadeIn relative overflow-hidden">
      {/* Overlay for messages */}
      {(showSuccess || showError) && (
        <div className="absolute inset-0 bg-white bg-opacity-95 flex flex-col justify-center items-center z-10 animate-fadeInOut rounded-2xl">
          {showSuccess && (
            <div className="text-green-600 flex flex-col items-center gap-3">
              <CheckCircle className="w-12 h-12" />
              <span className="text-lg font-semibold">Your response has been submitted successfully!</span>
            </div>
          )}

          {showError && (
            <div className="text-red-600 flex flex-col items-center gap-3">
              <XCircle className="w-12 h-12" />
              <span className="text-lg font-semibold">{errorMessage}</span>
            </div>
          )}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* First & Last Name */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-2 bg-white p-3 rounded-xl shadow-sm transition-transform duration-300 hover:scale-105">
            <User className="w-5 h-5 text-blue-500" />
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full outline-none"
              required
            />
          </div>

          <div className="flex items-center gap-2 bg-white p-3 rounded-xl shadow-sm transition-transform duration-300 hover:scale-105">
            <User className="w-5 h-5 text-blue-500" />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full outline-none"
              required
            />
          </div>
        </div>

        {/* Email */}
        <div className="flex items-center gap-2 bg-white p-3 rounded-xl shadow-sm transition-transform duration-300 hover:scale-105">
          <Mail className="w-5 h-5 text-blue-500" />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full outline-none"
            required
          />
        </div>

        {/* Phone */}
        <div className="flex items-center gap-2 bg-white p-3 rounded-xl shadow-sm transition-transform duration-300 hover:scale-105">
          <Phone className="w-5 h-5 text-blue-500" />
          <input
            type="number"
            name="phone"
            placeholder="Phone (10 digits)"
            value={formData.phone}
            onChange={handleChange}
            className="w-full outline-none"
            required
          />
        </div>

        {/* Description */}
        <div className="flex items-start gap-2 bg-white p-3 rounded-xl shadow-sm transition-transform duration-300 hover:scale-105">
          <FileText className="w-5 h-5 text-blue-500 mt-1" />
          <textarea
            name="description"
            placeholder="Your message..."
            rows="4"
            value={formData.description}
            onChange={handleChange}
            className="w-full outline-none resize-none"
            required
          ></textarea>
        </div>

        {/* Buttons */}
        <div className="flex justify-between gap-4 mt-4">
          <button
            type="button"
            onClick={() => setFormData({ firstName: "", lastName: "", email: "", phone: "", description: "" })}
            className="w-full bg-gray-200 text-gray-700 py-3 rounded-xl shadow-md hover:bg-gray-300 transition-transform duration-300 hover:scale-105"
          >
            Clear
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-3 rounded-xl shadow-md hover:bg-blue-700 transition-transform duration-300 hover:scale-105 flex items-center justify-center"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Sending...
              </>
            ) : (
              "Submit"
            )}
          </button>
        </div>
      </form>

      {/* Animation */}
      <style>{`
        .animate-fadeInOut {
          animation: fadeInOut 5s ease-in-out forwards;
        }
        @keyframes fadeInOut {
          0% { opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { opacity: 0; }
        }
        .animate-fadeIn {
          animation: fadeIn 1s ease-in-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
