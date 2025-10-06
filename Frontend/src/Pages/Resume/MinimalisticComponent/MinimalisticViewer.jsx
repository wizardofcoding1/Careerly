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
      // Use a direct approach for downloading
      window.open(fileUrl, '_blank');
      
      // Alternative approach if the above doesn't work
      // const a = document.createElement("a");
      // a.href = fileUrl;
      // a.target = "_blank";
      // a.download = fileName || fileUrl.split("/").pop();
      // document.body.appendChild(a);
      // a.click();
      // document.body.removeChild(a);
    } catch (err) {
      console.error("Download failed:", err);
      alert("Failed to download the file. Please try again or check your connection.");
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
