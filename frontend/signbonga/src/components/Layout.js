import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './NavBar';

const Layout = ({ children }) => {
	return (
		<div className="flex flex-col min-h-screen bg-gray-100">
			<Navbar />
		    <main>
		      <Outlet />
		    </main>
		    <footer className="p-4 text-center">
		      <p>&copy; 2024 SignBonga. All rights reserved.</p>
		    </footer>
		</div>
	);
};

export default Layout;
