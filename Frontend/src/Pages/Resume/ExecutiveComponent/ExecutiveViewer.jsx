// src/Components/Resume/Executive/ExecutiveResumePage.jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ExecutiveHero from "./ExecutiveHero";
import ExecutiveGrid from "./ExecutiveGrid";
import ExecutiveModal from "./ExecutiveModal";
import executiveFiles from "./resumeExecutiveData";


export default function ExecutiveViewer() {
  const [selectedFileUrl, setSelectedFileUrl] = useState(null);

  const downloadFile = async (fileUrl, fileName) => {
    try {
      const response = await fetch(fileUrl);
      if (!response.ok) throw new Error("Network error");
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = fileName;
      a.click();
      URL.revokeObjectURL(blobUrl);
    } catch {
      alert("Download failed.");
    }
  };

  return (


    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-6">
      <ExecutiveHero category="Executive" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-gray-800 rounded-xl shadow-2xl p-6 max-w-5xl w-full border border-gray-700 mt-6"
      >
        <h1 className="text-3xl font-bold text-white mb-6 text-center">
          Executive Resume Templates
        </h1>

        <ExecutiveGrid
          files={executiveFiles}
          onPreview={(url) => setSelectedFileUrl(url)}
          onDownload={downloadFile}
        />
      </motion.div>

      <AnimatePresence>
        {selectedFileUrl && (
          <ExecutiveModal
            url={selectedFileUrl}
            onClose={() => setSelectedFileUrl(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
