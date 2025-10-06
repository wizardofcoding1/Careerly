// src/Components/Resume/Executive/ExecutiveResumeModal.jsx
import { motion } from "framer-motion";
import { X } from "lucide-react";

export default function ExecutiveModal({ url, onClose }) {
  const viewerUrl = `https://docs.google.com/gview?url=${encodeURIComponent(url)}&embedded=true`;

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="bg-gray-900 rounded-lg shadow-xl p-4 max-w-5xl w-full h-[80vh] flex flex-col relative overflow-hidden"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-300 hover:text-white z-10"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="flex-1 overflow-hidden mt-6">
          <iframe
            src={viewerUrl}
            style={{ width: "100%", height: "100%" }}
            frameBorder="0"
            title="DOCX Viewer"
          ></iframe>
        </div>
      </motion.div>
    </motion.div>
  );
}
