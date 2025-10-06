// src/Components/Resume/ResumeViewer.jsx
import { useState } from "react";
import ResumeHero from "./ResumeHero";
import ResumeGrid from "./ResumeGrid";
import ResumeModal from "./ResumeModal";
import { resumeFiles } from "./resumeData"; 


export default function ResumeViewer() {
  const [selectedFileUrl, setSelectedFileUrl] = useState(null);

  const downloadFile = async (fileUrl, fileName) => {
    try {
      const response = await fetch(fileUrl);
      if (!response.ok) throw new Error("Network response was not ok");
      const blob = await response.blob();

      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error("Download failed:", err);
      alert("Failed to download the file.");
    }
  };

  return (

    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col items-center p-6">
      
      <ResumeHero />
      <ResumeGrid
        files={resumeFiles}
        onPreview={(url) => setSelectedFileUrl(url)}
        onDownload={downloadFile}
      />
      <ResumeModal
        selectedFileUrl={selectedFileUrl}
        onClose={() => setSelectedFileUrl(null)}
      />
    </div>


    
  );
}
