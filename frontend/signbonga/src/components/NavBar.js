import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <header className="p-4 flex justify-between items-center bg-[#acb3b5]">
      <div className="flex items-center">
        <img src="https://imgur.com/zuoCsSp.png" alt="SignBonga Logo" className="mr-2 w-24 h-24" />
        <span className="text-white font-bold">SIGNBONGA</span>
      </div>
      <nav>
        <ul className="flex space-x-4 text-white">
          <li className="transition-transform duration-300 transform hover:-translate-y-2 hover:bg-red-600 hover:rounded-full px-4 py-2">
            <Link to="/">Home</Link>
          </li>
          <li className="transition-transform duration-300 transform hover:-translate-y-2 hover:bg-red-600 hover:rounded-full px-4 py-2">
            <Link to="/about-us">About us</Link>
          </li>
          <li className="transition-transform duration-300 transform hover:-translate-y-2 hover:bg-red-600 hover:rounded-full px-4 py-2">
            <Link to="/sign-in">Sign In</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
