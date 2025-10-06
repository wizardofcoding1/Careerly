import ResumeCardComponent from "@/Pages/Home/HomePageComponent/ResumeSectionComponent/ResumeHeadComponent.jsx";
import ResumeHeadComponent from "@/Pages/Home/HomePageComponent/ResumeSectionComponent/ResumeCardComponent.jsx";
import ResumeFooterComponents from "@/Pages/Home/HomePageComponent/ResumeSectionComponent/ResumeFooterComponents.jsx";

export default function ResumeComponent() {
    return (
        <div className="px-4 py-2 mt-8 bg-white rounded-2xl shadow-md" id="resume">
            <ResumeHeadComponent/>
            <ResumeCardComponent />
            <ResumeFooterComponents/>
        </div>
    );
}
