import { motion } from "framer-motion";
import { Download, PencilLine, Eye, FileText } from "lucide-react";

export default function MinimalisticCard({ file, onPreview, onDownload }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="bg-white border border-teal-200 rounded-xl p-6 max-w-4xl w-full overflow-hidden flex flex-col shadow-lg"
    >
      <div className="h-40 flex items-center justify-center bg-teal-100 rounded-lg">
        <FileText className="w-16 h-16 text-teal-400" />
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h2 className="text-lg font-semibold text-teal-800 text-center mb-4">
          {file.name}
        </h2>

        <div className="mt-auto flex flex-col gap-3 ">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => onPreview(file.url)}
            className="w-full bg-teal-200 text-teal-700 py-2 rounded-lg hover:bg-teal-300 flex items-center justify-center gap-2 text-sm font-medium"
          >
            <Eye size={16} />
            Preview
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => onDownload(file.url, file.url.split("/").pop())}
            className="w-full bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 flex items-center justify-center gap-2 text-sm font-medium"
          >
            <Download size={16} /> Download
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => onDownload(file.url, file.url.split("/").pop())}
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 flex items-center justify-center gap-2 text-sm font-medium"
          >
            <PencilLine size={16} /> Use Resume
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
