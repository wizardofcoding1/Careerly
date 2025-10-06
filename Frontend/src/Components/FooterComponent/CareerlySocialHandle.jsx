import { Youtube,Facebook, Github, Instagram } from "lucide-react";
import { Link } from "react-router-dom";

export default function CareerlySocialHandle(){

    return(
        <div>
        <div className="flex flex-col gap-2">
<h2 className="text-2xl font-bold text-left bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent inline-block">
  Careerly
</h2>

            
            <p className="text-sm text-left">Empowering professionals to achieve their career goals through innovative tools, resources, and personalized guidance.</p>
        </div>

        <div className="flex flex-row gap-4 mt-4 text-2xl">
        <Link to="https://www.instagram.com/ig_crosser" target="_blank" rel="noopener noreferrer"><Instagram className="hover:text-[#FF0069] transition-colors delay-100"/></Link>
       <Link to="https://www.youtube.com/@kverse30" target="_blank" rel="noopener noreferrer"><Youtube className="hover:text-[#FF0000] transition-colors delay-100"/></Link> 
        <Link to="https://www.youtube.com/@crossergaming" target="_blank" rel="noopener noreferrer"><Facebook className="hover:text-[#0866FF] transition-colors delay-100"/></Link>
        <Link to="https://github.com/wizardofcoding1" target="_blank" rel="noopener noreferrer"><Github className="hover:text-purple-600 transition-colors delay-100"/></Link>

        </div >
        

        </div>

    );
}