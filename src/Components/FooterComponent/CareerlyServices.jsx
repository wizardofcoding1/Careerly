import { Link } from "react-router-dom";
import { SignedIn } from "@clerk/clerk-react";

export default function CareerlyServices() {
  return (
    <div className="flex flex-col gap-2">
      <h4 className="font-bold text-lg">Services</h4>

      <div>
        <ul className="text-sm inline-block">
          {/* Jump to Resume section */}
          <li className="text-gray-500 hover:text-white transition-colors delay-100 cursor-pointer">
            <a href="#resume">Resume Builder</a>
          </li>

          {/* Jump to Quizzes section */}
          <li className="text-gray-500 hover:text-white mt-2 transition-colors delay-100 cursor-pointer">
            <a href="#quizZone">QuizZone</a>
          </li>

          <li className="text-gray-500 hover:text-white mt-2 transition-colors delay-100 cursor-pointer">
            <Link to="/Careerly-Video">Video Vault</Link>
          </li>

          <SignedIn>
            <li className="text-gray-500 hover:text-white mt-2 transition-colors delay-100 cursor-pointer">
              <Link to="/ai-chat">Careerly AI</Link>
            </li>
          </SignedIn>
        </ul>
      </div>
    </div>
  );
}
