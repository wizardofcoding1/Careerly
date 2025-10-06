import QuizSectionCard from './QuizSectionComponent/QuizSectionCard';
import QuizSectionHeader from './QuizSectionComponent/QuizSectionHeader';
import QuizSectionBenefits from './QuizSectionComponent/QuizSectionBenefits';


export default function QuizSection() {




    return (
        <div className='mt-8 mb-8 shadow-md rounded-2xl bg-white px-8 pb-4' id="quizZone">
            <QuizSectionHeader />
            <QuizSectionCard />
            <QuizSectionBenefits />
        </div>
    );
}