import React from 'react';

const AboutUs = () => {
  return (
    <div className="bg-[#edeeef] min-h-screen p-8">
      <h1 className="text-red-600 text-3xl font-bold mb-8">ABOUT US</h1>
      
      <div className="flex flex-col lg:flex-row items-start">
        <div className="lg:w-2/3 pr-8">
          <h2 className="text-4xl font-bold mb-6">
            Learn the <span className="text-green-700">Kenyan Sign Language</span><br />
            in an easy and fun way.
          </h2>
          
          <div className="flex items-start mb-8">
	        <img src="https://imgur.com/AcO7zfi.png" alt="boy-signing" className="mr-4 lg:w-64 w-1/3 h-auto" />
			
            
            <div>
              <p className="mb-4">
                At SignBonga, we make learning Kenyan Sign Language (KSL) simple, accessible, and engaging. 
                Whether you want to start as a learner or share your knowledge as a tutor, our platform offers 
                interactive lessons and real-time feedback powered by machine learning. Learn at your own 
                pace, improve with AI-powered support, and connect with a community passionate about 
                breaking communication barriers.
              </p>
              <p>
                Join us today as a learner or tutor and be part of the movement to make conversations inclusive for 
                everyone.
              </p>
            </div>
          </div>
        </div>
        
        <div className="lg:w-1/3 flex justify-end">
	        <img src="https://imgur.com/UvTBFa1.png" alt="classroom" className="lg:w-64 w-auto h-auto" />
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
