import { HeartHandshake } from "lucide-react";
export default function Testimonials({ testimonials }) {
    return (
        <section className="py-8 px-6 bg-gray-100 mt-8 rounded-2xl ">
            <h2 className="text-3xl font-bold text-center mb-10">
                What Learners Say
            </h2>
            <div className="max-w-6xl mx-auto flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
                {testimonials.map((t, index) => (
                    <div
                        key={index}
                        className="bg-white p-6 rounded-xl shadow-md w-80 flex-shrink-0 snap-center"
                    >
                        <div className="flex items-center gap-3 mb-3">
                            <HeartHandshake className="w-6 h-6 text-indigo-500" />
                            <h3 className="font-semibold text-slate-800">
                                {t.name}
                            </h3>
                        </div>
                        <p className="text-gray-700 italic">“{t.text}”</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
