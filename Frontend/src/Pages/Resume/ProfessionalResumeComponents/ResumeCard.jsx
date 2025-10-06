// src/Components/Resume/ResumeCard.jsx
import { motion } from "framer-motion";
import { Download, PencilLine, Eye, FileText } from "lucide-react";

export default function ResumeCard({ file, onPreview, onDownload }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden flex flex-col"
    >
      {/* Thumbnail Placeholder */}
      <div className="h-40 flex items-center justify-center bg-gray-100">
        <FileText className="w-16 h-16 text-gray-400" />
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h2 className="text-lg font-semibold text-gray-800 text-center mb-4">
          {file.name}
        </h2>

        <div className="mt-auto flex flex-col gap-3">
          {/* 👁️ Preview */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => onPreview(file.url)}
            className="w-full bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 flex items-center justify-center gap-2 text-sm font-medium"
          >
            <Eye size={16} /> Preview
          </motion.button>

          {/* 📥 Download */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => onDownload(file.url, file.url.split("/").pop())}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2 text-sm font-medium"
          >
            <Download size={16} /> Download
          </motion.button>

          {/* ✍️ Use Resume */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              const a = document.createElement("a");
              a.href = file.url;
              a.download = file.url.split("/").pop();
              a.click();
            }}
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 flex items-center justify-center gap-2 text-sm font-medium"
          >
            <PencilLine size={16} /> Use Resume
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
