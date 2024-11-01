import { Link } from "react-router-dom";
import { useState } from "react";
import { logo } from "../assets/index";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="w-full flex justify-between items-center bg-[#1f2937] bg-opacity-90 backdrop-blur-lg border-b border-gray-700 shadow-lg px-4 sm:px-8 py-4">
      <Link to="/" className="flex items-center">
        <img
          src={logo}
          alt="logo"
          className="w-24 sm:w-28 object-contain hover:opacity-90 transition-opacity duration-200"
        />
      </Link>

      {/* Hamburger Menu Icon for Mobile */}
      <button
        className="sm:hidden text-gray-300 hover:text-white focus:outline-none"
        onClick={toggleMenu}
      >
        <svg
          className="w-8 h-8"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Navigation Links */}
      <nav
        className={`${
          menuOpen ? "block" : "hidden"
        } absolute top-16 left-0 w-full bg-[#1f2937] sm:bg-transparent sm:flex sm:static sm:w-auto sm:space-x-8 sm:items-center border-t border-gray-700 sm:border-none`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-8 w-full sm:w-auto">
          <Link
            to="/chatbot"
            className="font-inter text-gray-300 hover:text-white transition-colors duration-300 px-4 py-2 sm:px-0"
            onClick={() => setMenuOpen(false)} // Close menu when link is clicked
          >
            ChatBot
          </Link>
          <Link
            to="/create-post"
            className="font-inter font-medium bg-gradient-to-r from-[#4f6bff] to-[#9f9bff] text-white px-6 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            onClick={() => setMenuOpen(false)} // Close menu when link is clicked
          >
            Create
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
