import React, { useState, useEffect } from 'react';
import { Home, Calendar, Book, User, LogOut } from 'lucide-react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import axios from 'axios';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import apiUrl from '../config';

const localizer = momentLocalizer(moment);

const TutorPage = () => {
  const [activeView, setActiveView] = useState('lessons');
  const [lessons, setLessons] = useState([
    { title: 'Introducing Yourself', image: '/api/placeholder/300/150' },
    { title: 'Greetings', image: '/api/placeholder/300/150' },
    { title: 'Family', image: '/api/placeholder/300/150' },
  ]);
  const [learners, setLearners] = useState([
    { name: 'Victor Mwangi', xp: '10XP', course: 'Family' },
    { name: 'Abigael Njeri', xp: '50XP', course: 'Greetings' },
  ]);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    if (activeView === 'calendar') {
      fetchBookings();
    }
  }, [activeView]);

  const fetchBookings = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/tutor-bookings/`);
      const formattedBookings = response.data.map(booking => ({
        id: booking.id,
        title: `Session with ${booking.student_name}`,
        start: new Date(booking.start_time),
        end: new Date(booking.end_time)
      }));
      setBookings(formattedBookings);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  const handleLogout = async (e) => {
	  e.preventDefault();
	  try {
		  await axios.post(`${apiUrl}/auth/token/logout/`, {},
			  {
				  headers: {
					  'Authorization': `Token ${localStorage.getItem('auth_token')}`
					  }
			  });
		  localStorage.removeItem('auth_token');
		  window.location.href = '/login';
	  } catch (error) {
		  console.error('Error logging out: ',  error);
	  }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white p-6 flex flex-col">
        <div className="mb-8">
          <img src="https://imgur.com/a/sc8lDTn" alt="SignBonga" className="w-12 h-12" />
        </div>
        <nav className="space-y-4 flex-grow">
          <a href="#" className="flex items-center text-red-500 font-medium" onClick={() => setActiveView('lessons')}>
            <Home className="mr-2" size={20} />
            Home
          </a>
          <a href="#" className="flex items-center text-gray-600" onClick={() => setActiveView('calendar')}>
            <Calendar className="mr-2" size={20} />
            Calendar
          </a>
          <a href="#" className="flex items-center text-gray-600">
            <Book className="mr-2" size={20} />
            Your Lessons
          </a>
        </nav>
        <div className="mt-auto space-y-4">
          <a href="#" className="flex items-center text-gray-600">
            <User className="mr-2" size={20} />
            Profile
          </a>
          <button onClick={handleLogout} className="flex items-center text-red-500">
            <LogOut className="mr-2" size={20} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8">
        <div className="bg-red-500 text-white p-6 rounded-lg mb-8">
          <h1 className="text-2xl font-bold">Create Lessons</h1>
        </div>

        {activeView === 'lessons' && (
          <>
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Your Lessons</h2>
              <div className="grid grid-cols-3 gap-4">
                {lessons.map((lesson, index) => (
                  <div key={index} className="bg-white rounded-lg overflow-hidden shadow">
                    <img src={lesson.image} alt={lesson.title} className="w-full h-40 object-cover" />
                    <div className="p-4">
                      <h3 className="font-medium">{lesson.title}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">Your Learners</h2>
              <table className="w-full bg-white rounded-lg overflow-hidden">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">XP</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course Title</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {learners.map((learner, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">{learner.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
                          {learner.xp}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">{learner.course}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          </>
        )}

        {activeView === 'calendar' && (
          <section className="h-[calc(100vh-200px)]">
            <h2 className="text-xl font-semibold mb-4">Your Schedule</h2>
            <BigCalendar
              localizer={localizer}
              events={bookings}
              startAccessor="start"
              endAccessor="end"
              style={{ height: '100%' }}
            />
          </section>
        )}
      </main>
    </div>
  );
};

export default TutorPage;
