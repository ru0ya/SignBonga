import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:8000/auth/token/login', formData);
	  const accessToken = response.data.access;
      const refreshToken = response.data.refresh;
      // Store the tokens in localStorage or a more secure storage method
      localStorage.setItem('access', response.data.access);
      localStorage.setItem('refresh', response.data.refresh);
      
	  const profileResponse = await axios.get('http://localhost:8000/auth/users/me/', {
		  headers: {
			  Authorization: `Bearer ${accessToken}`,
		  },
	  });
	  const userRole = profileResponse.data.user_type;
	  
	  if (userRole === 'learner') {
		  navigate('/learner');
	  } else if (userRole === 'tutor') {
		  navigate('/tutor');
	  } else {
		  setError('Unknown role, cannot redirect.');
	  }
    } catch (err) {
      setError(err.response?.data?.detail || 'An error occurred during sign in.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-red-700 via-green-800 to-red-700 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">Sign in to your account</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">Username</label>
              <input
                id="email"
                name="email"
                type="email"
	            autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
	          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#232526] hover:bg-[#0a0d0e] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#232526]"
            >
              Sign In
            </button>
          </div>
        </form>
        {error && <p className="mt-2 text-center text-sm text-red-600">{error}</p>}
      </div>
    </div>
  );
};

export default SignIn;
