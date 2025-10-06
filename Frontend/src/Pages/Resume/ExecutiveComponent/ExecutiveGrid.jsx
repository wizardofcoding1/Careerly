// src/Components/Resume/Executive/ExecutiveResumeGrid.jsx
import ExecutiveCard from "./ExecutiveCard";

export default function ExecutiveGrid({ files, onPreview, onDownload }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {files.map((file, idx) => (
        <ExecutiveCard
          key={idx}
          file={file}
          onPreview={onPreview}
          onDownload={onDownload}
        />
      ))}
    </div>
  );
}
