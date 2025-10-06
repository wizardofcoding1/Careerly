import { Link } from "react-router-dom";

export default function CareerlyQuickLink() {
  return (
    <div className="flex flex-col gap-2">
      <div>
        <h4 className="font-bold text-lg">Quick Links</h4>
      </div>

      <div>
        <ul className="text-sm flex flex-col gap-2">
          <li className="text-gray-500 hover:text-white transition-colors delay-100 cursor-pointer">
            <Link to="/">Home</Link>
          </li>
          <li className="text-gray-500 hover:text-white mt-2 transition-colors delay-100 cursor-pointer">
            <Link to="/about">About Us</Link>
          </li>
          <li className="text-gray-500 hover:text-white mt-2 transition-colors delay-100 cursor-pointer">
            <Link to="/contact">Contact Us</Link>
          </li>
          <li className="text-gray-500 hover:text-white mt-2 transition-colors delay-100 cursor-pointer">
            <Link to="/privacy-policy">Privacy Policy</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
