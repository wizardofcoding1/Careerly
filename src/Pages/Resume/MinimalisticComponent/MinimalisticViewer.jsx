// src/Components/Resume/ResumePage.jsx
import { useState } from "react";
import MinimalisticHero from "./MinimalisticHero";
import MinimalisticGrid from "./MinimalisticGrid";
import Minimalisticmodal from "./MinimalisticModal";
import { minimalisticData } from "./MinimalisticData"; 



export default function MinimalisticViewer() {
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

    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-teal-100 flex flex-col items-center p-6">
      
      <MinimalisticHero />
      <MinimalisticGrid
        files={minimalisticData}
        onPreview={(url) => setSelectedFileUrl(url)}
        onDownload={downloadFile}
      />
      <Minimalisticmodal
        selectedFileUrl={selectedFileUrl}
        onClose={() => setSelectedFileUrl(null)}
      />
    </div>


    
  );
}
