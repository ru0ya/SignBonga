import React, { useState, useEffect } from 'react';
import { Home, BookOpen, User, LogOut } from 'lucide-react';

const LearningDashboard = () => {
  const [lessons, setLessons] = useState([]);
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const lessonsResponse = await fetch('/api/lessons/');
        const coursesResponse = await fetch('/api/courses/');

        if (!lessonsResponse.ok || !coursesResponse.ok) {
          throw new Error('Failed to fetch data');
        }

        const lessonsData = await lessonsResponse.json();
        const coursesData = await coursesResponse.json();

        setLessons(lessonsData);
        setCourses(coursesData);
        setIsLoading(false);
      } catch (error) {
        setError('Error fetching data. Please try again later.');
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white p-6 flex flex-col">
        <div className="mb-8">
          <img src="/api/placeholder/50/50" alt="Logo" className="w-12 h-12" />
        </div>
        <nav className="space-y-4 flex-grow">
          <a href="#" className="flex items-center text-red-500 font-medium">
            <Home className="mr-2" size={20} />
            Home
          </a>
          <a href="#" className="flex items-center text-gray-600">
            <BookOpen className="mr-2" size={20} />
            Test Yourself
          </a>
        </nav>
        <div className="mt-auto space-y-4">
          <a href="#" className="flex items-center text-gray-600">
            <User className="mr-2" size={20} />
            Profile
          </a>
          <a href="#" className="flex items-center text-red-500">
            <LogOut className="mr-2" size={20} />
            Logout
          </a>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="bg-red-500 text-white p-6 rounded-lg mb-8">
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
      </main>
    </div>
  );
};

export default LearningDashboard;
