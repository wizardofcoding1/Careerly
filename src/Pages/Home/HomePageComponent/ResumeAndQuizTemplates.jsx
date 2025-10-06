export default function ResumeTemplate() {
    return (
        <div>
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl p-8 mb-8 ">
                <div className="text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        Build Your Dream Career
                    </h1>
                    <p className="text-xl mb-8 text-blue-100">
                        Create professional resumes, take career assessments,
                        and find your perfect job match
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    
                        <button onClick={()=>{
                            const resumeSection = document.getElementById("resume");
                            if(resumeSection){
                                resumeSection.scrollIntoView({behavior:'smooth'});
                            }}} className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
                            Create Resume
                        </button>
                        <button onClick={()=>{
                            const quizSection = document.getElementById("quizZone");
                            if(quizSection){
                                quizSection.scrollIntoView({behavior:'smooth'});
                            }
                        }} className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-200">
                            Take Quiz
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
