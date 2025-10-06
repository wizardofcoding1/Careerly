import { Brain} from 'lucide-react';
export default function QuizSectionHeader() {
    return (



            <div className=" bg-white  flex flex-col items-center mt-8 px-3 py-2 gap-4">
                <div className='p-4 bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-full flex justify-center align-ceneters w-14 mx-auto mt-4'>
                    <Brain/>
                </div>
                <h2 className='text-2xl font-bold '>
                    Career Assessment Quizzes
                </h2>

                <p className='text-sm text-center'>
                    Take our AI crafted quizzes to gain insights into your career strengths, personality traits, and professional development areas.
                </p>
            </div>
            );
        }
