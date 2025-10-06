import { Trophy } from 'lucide-react';
import TypeWriter from "@/Components/Common/TypewritingEffect";
export default function QuizSectionBenefits() {

    const quizBenefits = [
        {
            title: "Personalized Learning :",
            description: "Get instant feedback and track your progress based on your performance.",
        },
        {
            title: "Skill Improvement :",
            description: "Strengthen weak areas and build confidence through structured practice.",
        },
        {
            title: "Fun & Interactive :",
            description: " Makes learning engaging and less stressful with gamified elements.",
        },
        {
            title: "Performance Insights :",
            description: " Understand your strengths and weaknesses with detailed results.",
        },
        {
            title: "Career Growth :",
            description: "Identify areas for professional development and career advancement.",
        }
    ];

    return (
        <div className='bg-[#EFF6FF] px-4 py-2 rounded-md shadow-gray-100 mt-4 mb-4'>
            <h4 className='text-lg font-bold '>Quiz Benefits</h4>
            <div className='flex flex-row justify-between items-center gap-4'>
                <div>
                    <ul className="text-sm">
                        {quizBenefits.map((benefit, index) => (
                            <li key={index}
                                className="p-2 flex flex-col relative pl-5 
                                        before:content-['•'] before:absolute 
                                        before:left-0 before:top-2 
                                        before:text-purple-600 
                                        before:text-lg">
                                <b className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent text-sm">
                                    {benefit.title}
                                </b>
                                <TypeWriter text={benefit.description}
                                    speed={80}
                                    delay={index * 500} // staggered delay
                                />
                            </li>

                        ))}
                    </ul>

                </div>

                <div className='hidden md:block lg:block'>
                    <Trophy className='w-20 h-24 ' color='#FFD700' strokeWidth={1.5} />
                </div>
            </div>
        </div>
    );
}