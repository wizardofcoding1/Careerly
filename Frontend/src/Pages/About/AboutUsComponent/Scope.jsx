import { Telescope } from "lucide-react";

export default function Scope() {


    return (

        <div className="bg-white shadow-xl rounded-2xl p-6 mt-8">

            <div className="flex flex-col">

                <Telescope fill="blue" />
                <h3 className="text-2xl font-bold text-left relative -top-3 ml-1.5">SCOPE</h3>
            </div>

            <div>
                <p className="text-gray-700 text-justify text-sm">
                    In today's competitive job market, having a well-crafted resume and strong skills is essential for career success. Our platform aims to empower students and professionals by providing them with the tools and resources they need to build impressive resumes, assess their skills, and prepare for future opportunities. By leveraging technology and expert insights, we strive to bridge the gap between talent and opportunity, helping individuals achieve their career goals and thrive in their chosen fields.
                </p>
            </div>
        </div>
    );
}