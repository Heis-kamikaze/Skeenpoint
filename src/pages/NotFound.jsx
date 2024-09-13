import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center p-4">
      {/* Illustration */}
      <div className="w-full max-w-md mb-8">
        <img 
          src="/images/404.png" 
          alt="Not Found Illustration" 
          className="w-full h-auto"
        />
      </div>

      {/* Title */}
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        Oops! Page Not Found
      </h1>

      {/* Message */}
      <p className="text-gray-600 text-lg mb-6">
        We can't seem to find the page you're looking for. But don't worry, your skin's glow is still safe with us!
      </p>

      {/* CTA - Button */}
      <Link
        to="/"
        className="px-6 py-3 bg-rust-100 text-white font-semibold rounded-lg shadow-md hover:bg-rust-200 transition duration-300"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
