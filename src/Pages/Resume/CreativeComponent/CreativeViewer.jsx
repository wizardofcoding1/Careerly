import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CreativeHero from "./CreativeHero";
import CreativeGrid from "./CreativeGrid";
import CreativeModal from "./CreativeModal";
import {creativeData} from "./CreativeData";

export default function CreativeViewer() {
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

    <div className="min-h-screen bg-purple-100 text-white flex flex-col items-center p-6">
      <CreativeHero category="Creative" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-purple-500 rounded-xl shadow-2xl p-6 max-w-5xl w-full  mt-6"
      >
        

        <CreativeGrid
          files={creativeData}
          onPreview={(url) => setSelectedFileUrl(url)}
          onDownload={downloadFile}
        />
      </motion.div>

      <AnimatePresence>
        {selectedFileUrl && (
          <CreativeModal
            url={selectedFileUrl}
            onClose={() => setSelectedFileUrl(null)}
          />
        )}
      </AnimatePresence>
    </div>


  );
}

