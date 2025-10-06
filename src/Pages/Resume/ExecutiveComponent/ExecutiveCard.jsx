// src/Components/Resume/Executive/ExecutiveResumeCard.jsx
import { motion } from "framer-motion";
import { Download, PencilLine, Eye, FileText } from "lucide-react";

export default function ExecutiveResumeCard({ file, onPreview, onDownload }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="bg-gray-800 border border-gray-700 rounded-xl shadow-lg overflow-hidden flex flex-col text-white"
    >
      {/* Thumbnail Placeholder */}
      <div className="h-40 flex items-center justify-center bg-gray-900">
        <FileText className="w-16 h-16 text-gray-500" />
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h2 className="text-lg font-semibold text-white text-center mb-4">
          {file.name}
        </h2>

        <div className="mt-auto flex flex-col gap-3">
          {/* 👁️ Preview */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => onPreview(file.url)}
            className="w-full bg-gray-700 text-gray-200 py-2 rounded-lg hover:bg-gray-600 flex items-center justify-center gap-2 text-sm font-medium"
          >
            <Eye size={16} /> Preview
          </motion.button>

          {/* 📥 Download */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => onDownload(file.url, file.url.split("/").pop())}
            className="w-full bg-yellow-500 text-gray-900 py-2 rounded-lg hover:bg-yellow-400 flex items-center justify-center gap-2 text-sm font-medium"
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
