import React, { useState } from "react";
import { FaGavel } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-100 shadow-md p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <FaGavel className="text-yellow-500 text-2xl mr-2" />
          <span className="text-xl font-bold text-gray-800">Wakelny</span>
        </div>
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="text-gray-800 hover:text-yellow-500 font-medium">
            Home
          </Link>
          <Link
            to="/"
            className="text-gray-800 hover:text-yellow-500 font-medium"
          >
            Dashboard
          </Link>
          <Link to="/" className="text-gray-800 hover:text-yellow-500 font-medium">
            Search
          </Link>
          <Link to="/" className="text-gray-800 hover:text-yellow-500 font-medium">
            Profile
          </Link>
        </div>
        <button
          className="md:hidden text-gray-800 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>
      </div>
      {isOpen && (
        <div className="md:hidden mt-4 space-y-2">
          <Link to="/" className="block text-gray-800 hover:text-yellow-500">
            Home
          </Link>
          <Link to="/" className="block text-gray-800 hover:text-yellow-500">
            Dashboard
          </Link>
          <Link to="/" className="block text-gray-800 hover:text-yellow-500">
            Search
          </Link>
          <Link to="/" className="block text-gray-800 hover:text-yellow-500">
            Profile
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Header;
