import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="p-4 flex justify-between items-center bg-[#acb3b5]">
      <div className="flex items-center">
        <img
          src="https://imgur.com/zuoCsSp.png"
          alt="SignBonga Logo"
          className="mr-2 w-16 h-16 md:w-24 md:h-24"
        />
        <span className="text-white font-bold text-lg md:text-2xl">SIGNBONGA</span>
      </div>

      {/* Hamburger Menu for Mobile */}
      <div className="md:hidden">
        <button
          onClick={toggleMenu}
          className="text-white focus:outline-none"
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
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>
      </div>

      {/* Nav links for larger screens */}
      <nav className="hidden md:block">
        <ul className="flex space-x-4 text-white">
          <li className="transition-transform duration-300 transform hover:-translate-y-2 hover:bg-red-600 hover:rounded-full px-4 py-2">
            <Link to="/">Home</Link>
          </li>
          <li className="transition-transform duration-300 transform hover:-translate-y-2 hover:bg-red-600 hover:rounded-full px-4 py-2">
            <Link to="/about-us">About Us</Link>
          </li>
          <li className="transition-transform duration-300 transform hover:-translate-y-2 hover:bg-red-600 hover:rounded-full px-4 py-2">
            <Link to="/sign-in">Sign In</Link>
          </li>
        </ul>
      </nav>

      {isMenuOpen && (
        <nav className="absolute top-16 right-0 w-full bg-[#acb3b5] p-4 md:hidden">
          <ul className="flex flex-col items-center space-y-4 text-white">
            <li className="transition-transform duration-300 transform hover:-translate-y-2 hover:bg-red-600 hover:rounded-full px-4 py-2 w-full text-center">
              <Link to="/" onClick={toggleMenu}>Home</Link>
            </li>
            <li className="transition-transform duration-300 transform hover:-translate-y-2 hover:bg-red-600 hover:rounded-full px-4 py-2 w-full text-center">
              <Link to="/about-us" onClick={toggleMenu}>About Us</Link>
            </li>
            <li className="transition-transform duration-300 transform hover:-translate-y-2 hover:bg-red-600 hover:rounded-full px-4 py-2 w-full text-center">
              <Link to="/sign-in" onClick={toggleMenu}>Sign In</Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
