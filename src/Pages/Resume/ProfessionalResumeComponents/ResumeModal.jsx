// src/Components/Resume/ResumeModal.jsx
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function ResumeModal({ selectedFileUrl, onClose }) {
  const viewerUrl = selectedFileUrl
    ? `https://docs.google.com/gview?url=${encodeURIComponent(selectedFileUrl)}&embedded=true`
    : null;

  return (
    <AnimatePresence>
      {selectedFileUrl && (
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
            className="bg-white rounded-lg shadow-xl p-6 max-w-5xl w-full h-[85vh] flex flex-col relative overflow-hidden"
          >
            {/* ❌ Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 z-10"
            >
              <X className="w-6 h-6" />
            </button>

            {/* 📄 Google Docs Viewer */}
            <div className="flex-1 overflow-hidden mt-8">
              <iframe
                src={viewerUrl}
                style={{ width: "100%", height: "100%" }}
                frameBorder="0"
                title="DOCX Viewer"
              ></iframe>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
