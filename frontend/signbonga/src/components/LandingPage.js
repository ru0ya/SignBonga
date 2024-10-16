import React from 'react';
import { ChevronRight } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-red-700 via-green-800 to-red-700">
      <header className="p-4 flex justify-between items-center">
        <div className="flex items-center">
          <img  src="https://imgur.com/LlOunbH" alt="SignBonga Logo" className="mr-2" />
          <span className="text-white font-bold">SIGNBONGA</span>
        </div>
        <nav>
          <ul className="flex space-x-4 text-white">
            <li>Home</li>
            <li className="bg-red-600 px-3 py-1 rounded">About us</li>
            <li>Learning</li>
          </ul>
        </nav>
      </header>

      <main className="flex-grow flex items-center p-8">
        <div className="w-1/2">
          <h1 className="text-5xl font-bold mb-4">
            <span className="text-white">Learn </span>
            <span className="text-red-500">Kenyan</span><br />
            <span className="text-white">Sign </span>
            <span className="text-green-500">Language</span>
          </h1>
          <p className="text-white mb-6">
            We are on a mission to break the ice and encourage inclusivity
            in communication for all. Get to learn the kenyan sign language
            and have those conversations, with everyone.
          </p>
          <button className="bg-green-700 text-white px-6 py-2 rounded-full flex items-center">
            Learn more
            <ChevronRight className="ml-2" />
          </button>
        </div>
        <div className="w-1/2 relative">
          <div className="absolute right-0 bottom-0">
            <img src="https://imgur.com/lGl9rZK" alt="Person signing" className="mb-4" />
          </div>
        </div>
      </main>

      <footer className="p-4 flex justify-center">
        <div className="flex space-x-2">
          <div className="w-2 h-2 rounded-full bg-gray-300"></div>
          <div className="w-2 h-2 rounded-full bg-gray-300"></div>
          <div className="w-2 h-2 rounded-full bg-red-500"></div>
          <div className="w-2 h-2 rounded-full bg-gray-300"></div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
