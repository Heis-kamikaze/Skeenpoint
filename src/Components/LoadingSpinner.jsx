import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="relative">
        {/* Spinner */}
        <div className="animate-spin rounded-full h-44 w-44 border-t-4 border-b-4 border-rust-200"></div>

        {/* Centered Text */}
        <div className="absolute inset-0 flex justify-center items-center">
          <span className="text-lg font-semibold text-gray-700">SkeenPoint.com.ng</span>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
