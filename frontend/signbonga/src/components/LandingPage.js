import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-red-700 via-green-800 to-red-700">

      <main className="flex-grow flex items-center p-8">
        <div className="w-1/2">
          <h1 className="text-5xl font-bold mb-4">
            <span className="text-[#0a0d0e]">Learn </span>
            <span className="text-red-500">Kenyan</span><br />
            <span className="text-white">Sign </span>
            <span className="text-green-500">Language</span>
          </h1>
          <p className="text-white mb-6">
            We are on a mission to break the ice and encourage inclusivity
            in communication for all. Get to learn the kenyan sign language
            using AI and a well curated learning programme at your convenience
			,have those conversations with everyone.
          </p>
	      <Link
	        to="/sign-up"
            className="bg-green-700 text-white w-40 py-1 rounded-full flex items-center justify-center text-sm transition-transform duration-300 transform hover:-translate-y-2"
	      >
           Sign Up <ChevronRight className="ml-1" />
          </Link>
        </div>
        <div className="w-1/2 flex justify-end">
	  {/*<div className="absolute right-0 bottom-30">*/}
	         <img src="https://i.imgur.com/lGl9rZK.png" alt="Person signing" className="mb-4 w-full h-auto" />
          </div>
	  {/*</div>*/}
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
