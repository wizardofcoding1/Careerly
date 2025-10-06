// src/Components/Resume/Creative/CreativeGrid.jsx
import CreativeCard from "./CreativeCard";

export default function CreativeGrid({ files, onPreview, onDownload }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
      {files.map((file, idx) => (
        <CreativeCard
          key={idx}
          file={file}
          onPreview={onPreview}
          onDownload={onDownload}
        />
      ))}
    </div>
  );
}
