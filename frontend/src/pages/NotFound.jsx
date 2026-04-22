import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
    <p className="text-7xl font-bold text-indigo-200 mb-4">404</p>
    <h1 className="text-2xl font-bold text-gray-900 mb-2">Page not found</h1>
    <p className="text-gray-500 mb-6">The page you're looking for doesn't exist.</p>
    <Link to="/" className="text-indigo-600 font-medium hover:underline">
      Go home
    </Link>
  </div>
);

export default NotFound;
