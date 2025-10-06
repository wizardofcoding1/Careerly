import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom"; // ✅ Import Link from react-router-dom
import SignUpPage from "../Authenticate/SignUpPage";
import { SignedIn } from "@clerk/clerk-react";

export default function Navbar() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <nav className="w-full bg-white shadow-md px-6 py-4 flex justify-between items-center sticky top-0 z-50 rounded-br-md">
                {/* Left Section */}
                <div className="flex items-center space-x-2">
                    <SignUpPage />
                    {/* <span className="font-bold text-lg text-gray-800">
                        Username
                    </span> */}
                </div>

                {/* Desktop Links */}
                <div className="navbar-f hidden md:flex space-x-8">
                    <Link
                        to="/"
                        className="navbar hover:text-blue-500 transition-colors delay-100"
                    >
                        Home
                    </Link>
                    <Link
                        to="/about"
                        className="navbar hover:text-blue-500 transition-colors delay-100"
                    >
                        About Us
                    </Link>
                    <Link
                        to="/contact"
                        className="navbar hover:text-blue-500 transition-colors delay-100"
                    >
                        Contact Us
                    </Link>
                    <SignedIn>
                    <Link to="/video" className="navbar hover:text-blue-500">
                        Videos
                    </Link>
                    </SignedIn>
                </div>

                {/* Logo */}
                <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Careerly
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <button onClick={() => setOpen(!open)}>
                        {open ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </nav>

            {/* Mobile Dropdown */}
            {open && (
                <div className="navbar-m bg-white shadow-md flex flex-col items-center py-6 space-y-4 md:hidden z-40 sticky top-16">
                    <Link to="/" className="navbar hover:text-blue-500">
                        Home
                    </Link>
                    <Link to="/about" className="navbar hover:text-blue-500">
                        About Us
                    </Link>
                    <Link to="/contact" className="navbar hover:text-blue-500">
                        Contact Us
                    </Link>
                    <SignedIn>
                    <Link to="/video" className="navbar hover:text-blue-500">
                        Videos
                    </Link>
                    </SignedIn>
                </div>
            )}
        </>
    );
}
