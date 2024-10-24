import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import { Home, BookOpen, User, LogOut, Menu } from 'lucide-react';
import TryAI from './TryAI';
import apiUrl from '../config';

const LearningDashboard = () => {
  const [lessons, setLessons] = useState([]);
  const [courses, setCourses] = useState([]);
  const [open, setOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeView, setActiveView] = useState('dashboard');
  const navigate = useNavigate();

// const menus = [
// 	{ name: "Home", icon: Home, onClick: () => setActiveView('dashboard')},
// 	{ name: "Try AI", icon: BookOpen, onClick: () => setActiveView('tryai')},
// 	{ name: "Profile", icon: User, onClick: handleProfile, margin: true},
// 	{ name: "Logout", icon: LogOut, onClick: handleLogout, danger: true}
// ];

  // Dummy data as placeholders
  const placeholderLessons = [
    { id: 1, title: 'The Alphabet', image: 'https://via.placeholder.com/300x150', progress: 30 },
    { id: 2, title: 'Common Words', image: 'https://via.placeholder.com/300x150', progress: 60 },
    { id: 3, title: 'Family', image: 'https://via.placeholder.com/300x150', progress: 90 },
  ];

  const placeholderCourses = [
    { id: 1, title: 'Numbers', instructor: 'Jane Doe', instructor_image: 'https://via.placeholder.com/32', status: 'In Progress' },
    { id: 2, title: 'Emotions', instructor: 'John Smith', instructor_image: 'https://via.placeholder.com/32', status: 'Completed' },
    { id: 3, title: 'Complex Words', instructor: 'Sam Lee', instructor_image: 'https://via.placeholder.com/32', status: 'Not Started' },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate fetching data
        setTimeout(() => {
          setLessons(placeholderLessons);
          setCourses(placeholderCourses);
          setIsLoading(false);
        }, 1000); // Simulated delay
      } catch (error) {
        setError('Error fetching data. Please try again later.');
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${apiUrl}/auth/token/logout/`, {}, {
        headers: {
          'Authorization': `Token ${localStorage.getItem('auth_token')}`
        } 
      });
      localStorage.removeItem('auth_token');
	  navigate('/sign-in');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleProfile = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`${apiUrl}/auth/users/me/`, {
        headers: {
          'Authorization': `Token ${localStorage.getItem('auth_token')}`
        }
      });
      // Handle profile data as needed
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

const menus = [
	{ name: "Home", icon: Home, onClick: () => setActiveView('dashboard')},
	{ name: "Try AI", icon: BookOpen, onClick: () => setActiveView('tryai')},
	{ name: "Profile", icon: User, onClick: handleProfile, margin: true},
	{ name: "Logout", icon: LogOut, onClick: handleLogout, danger: true}
];

  const toggleSidebar = () => {
	  setOpen(!open);
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside 
	     className={`fixed top-0 left-0 h-screen bg-[#acb3b5] transition-all duration-300 ease-in-out
		 ${open ? "w-64" : "w-16"} z-50`}
	  >
	    <div className="flex flex-col h-full p-4">
	       {/* Logo and Toggle Button */}
           <div className="flex items-center justify-between mb-8">
		      <img 
	            src="https://i.imgur.com/zuoCsSp.png" 
                alt="SignBonga" 
                className="w-8 h-8 sm:w-10 sm:h-10 md:w-16 md:h-16 lg:w-24 lg:h-24 object-contain"
              />
	          <button
	             onClick={() => setOpen(!open)}
	             className="p-2 rounded-lg hover:bg-red transition-colors"
	          >
	            <Menu size={20} />
	          </button>
        </div>
	    {/*Navigation Menu*/}
	    <nav className="flex-grow space-y-2">
            {menus.map((menu, i) => (
              <button
                key={i}
                onClick={menu.onClick}
                className={`w-full flex items-center gap-4 px-3 py-2 rounded-lg transition-all duration-200
                  ${menu.margin ? "mt-8" : ""}
                  ${activeView === menu.name.toLowerCase() ? "bg-gray-200 text-red-500" : "text-[#06110d]"}
                  ${menu.danger ? "hover:bg-red-100 hover:text-red-500" : "hover:bg-gray-200"}
                  group relative
                `}
              >
				<div className=",in-w-[20px]">
                  <menu.icon size={20} />
				</div>
                <span 
                  className={`ml-4 transition-all duration-300  ${!open ? "w-0 opacity-0" : "w-auto opacity-100"}`}
				  style={{ whiteSpace: "nowrap", overflow: "hidden" }}
                >
                  {menu.name}
                </span>
                {/* Tooltip for collapsed state */}
                {!open && (
                  <div className="absolute left-full rounded-md px-2 py-1 ml-6 bg-[#06110d] text-white text-sm
                    invisible opacity-0 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0">
                    {menu.name}
                  </div>
                )}
              </button>
            ))}
          </nav>
        </div>
      </aside>


      {/* Main content */}
      <main className={`flex-1 transition-all duration-300 ${open ? "ml-64" : "ml-16"} p-8 overflow-y-auto`}>
        {activeView === 'dashboard' ? (
          <>
            <div className="bg-gradient-to-r from-red-700 via-green-800 to-red-700 text-white p-6 rounded-lg mb-8">
              <h1 className="text-2xl font-bold">Get Learning</h1>
            </div>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Lessons</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {lessons.map((lesson) => (
                  <div key={lesson.id} className="bg-white rounded-lg overflow-hidden shadow">
                    <img src={lesson.image || "/api/placeholder/300/150"} alt={lesson.title} className="w-full h-40 object-cover" />
                    <div className="p-4">
                      <h3 className="font-medium">{lesson.title}</h3>
                      <div className="mt-2 bg-gray-200 h-2 rounded-full">
                        <div 
                          className="bg-green-500 h-2 rounded-full" 
                          style={{width: `${lesson.progress || 0}%`}}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">Course Type</h2>
              <div className="overflow-x-auto">
                <table className="w-full bg-white rounded-lg overflow-hidden">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course Title</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Instructor</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {courses.map((course) => (
                      <tr key={course.id}>
                        <td className="px-6 py-4 whitespace-nowrap">{course.title}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <img src={course.instructor_image || "/api/placeholder/32/32"} alt={course.instructor} className="w-8 h-8 rounded-full mr-2" />
                            {course.instructor}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            {course.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </>
        ) : (
          <TryAI />
        )}
      </main>
    </div>
  );
};

export default LearningDashboard;
