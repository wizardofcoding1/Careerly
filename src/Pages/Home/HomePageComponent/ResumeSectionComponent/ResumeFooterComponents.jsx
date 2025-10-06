import {PenLine,File,Download} from 'lucide-react';

export default function ResumeFooterComponents() {


    return(
        <div className="flex flex-col lg:flex-row md:flex-row justify-center  lg:justify-around md:justify-around items-center gap-4 mt-2 mb-4 px-3 py-2">
                        <div className="flex flex-row  items-center gap-2">
                            <div className="rounded-full p-2 bg-blue-100 inline-block ">
                                <PenLine className="text-blue-600" />
                            </div>
                            <p>Edit</p>
                        </div>

                        <div className="flex flex-row  items-center gap-2">
                            <div className="rounded-full p-2 bg-green-100 inline-block ">
                                <File className="text-green-600" />
                            </div>
                            <p>ATS Friendly</p>
                        </div>

                        <div className="flex flex-row  items-center gap-2">
                            <div className="rounded-full p-2 bg-purple-100 inline-block ">
                                <Download className="text-purple-600" />
                            </div>
                            <p>Download</p>
                        </div>
                    </div>
        
    );
}