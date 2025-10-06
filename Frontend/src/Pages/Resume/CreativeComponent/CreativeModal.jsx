// src/Components/Resume/Creative/CreativeModal.jsx
import { motion } from "framer-motion";
import { X } from "lucide-react";

export default function CreativeModal({ url, onClose }) {
  const viewerUrl = `https://docs.google.com/gview?url=${encodeURIComponent(url)}&embedded=true`;

  return (
    <motion.div
      className="fixed inset-0 bg-black/60 flex justify-center items-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="bg-white rounded-lg shadow-xl p-4 max-w-5xl w-full h-[80vh] flex flex-col relative"
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-purple-700 z-10"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Google Docs Viewer */}
        <div className="flex-1 overflow-hidden mt-6">
          <iframe
            src={viewerUrl}
            style={{ width: "100%", height: "100%" }}
            frameBorder="0"
            title="Creative Resume Preview"
          ></iframe>
        </div>
      </motion.div>
    </motion.div>
  );
}
