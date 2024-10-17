import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Layout from './components/Layout';
import LandingPage from './components/LandingPage';
import AboutUs from './components/AboutUs';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';

function App() {
  return (
	  <Routes>
	    <Route path="/" element={<Layout />}>
			<Route index element={<LandingPage />} />
			<Route path="/about-us" element={<AboutUs />} />
			<Route path="/sign-in" element={<SignIn />} />
			<Route path="/sign-up" element={<SignUp />} />
	    </Route>
	  </Routes>
  );
};

export default App;
