import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ResumeCard from "./ResumeCard"; // Import new card component
import CreativeResume from "@/assets/CreativeResume.jpg";
import ExecutiveResume from "@/assets/ExecutiveResume.jpg";
import MinimalistResume from "@/assets/MinimalistResume.jpg";
import ProfessionalResume from "@/assets/ProfessionalResume.jpg";

export default function ResumeCardComponent() {
  const navigate = useNavigate();
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const resumeTemplates = [
    {
      id: 1,
      title: "Professional",
      description: "Clean and Modern Design for Corporate Roles",
      image: ProfessionalResume,
    },
    {
      id: 2,
      title: "Creative",
      description: "Eye-catching Design for Designers & Artists",
      image: CreativeResume,
    },
    {
      id: 3,
      title: "Minimalistic",
      description: "Simple, Elegant & ATS-Friendly",
      image: MinimalistResume,
    },
    {
      id: 4,
      title: "Executive",
      description: "Bold & Professional for Senior Roles",
      image: ExecutiveResume,
    },
  ];

  const handleSelectTemplate = (id) => {
    setSelectedTemplate(id);
  };

  const handleUseTemplate = (template) => {
    setSelectedTemplate(template.id); // ensure it's selected before navigating
    setTimeout(() => {
      navigate(`/resume-templates/${template.title.toLowerCase()}`);
    }, 300); // allows animation to play before redirect
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6 mt-2">
      {resumeTemplates.map((resume) => (
        <ResumeCard
          key={resume.id}
          resume={resume}
          isSelected={selectedTemplate === resume.id}
          onSelect={() => handleSelectTemplate(resume.id)}
          onUse={handleUseTemplate}
        />
      ))}
    </div>
  );
}
