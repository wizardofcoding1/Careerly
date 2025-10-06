// src/Components/Resume/Creative/CreativeCard.jsx
import { motion } from "framer-motion";
import { Download, PencilLine, Eye, FileText } from "lucide-react";

export default function CreativeCard({ file, onPreview, onDownload }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white border-2 border-purple-200 rounded-xl shadow-md overflow-hidden flex flex-col"
    >
      {/* Thumbnail */}
      <div className="h-40 flex items-center justify-center bg-gradient-to-r from-pink-100 to-purple-100">
        <FileText className="w-16 h-16 text-purple-500" />
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h2 className="text-lg font-bold text-purple-700 text-center mb-4">
          {file.name}
        </h2>

        <div className="mt-auto flex flex-col gap-3">
          {/* 👁 Preview */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => onPreview(file.url)}
            className="w-full bg-purple-100 text-purple-700 py-2 rounded-lg hover:bg-purple-200 flex items-center justify-center gap-2 text-sm font-medium"
          >
            <Eye size={16} /> Preview
          </motion.button>

          {/* 📥 Download */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => onDownload(file.url, file.url.split('/').pop())}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 rounded-lg hover:opacity-90 flex items-center justify-center gap-2 text-sm font-medium"
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
            className="w-full bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 flex items-center justify-center gap-2 text-sm font-medium"
          >
            <PencilLine size={16} /> Use Resume
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
