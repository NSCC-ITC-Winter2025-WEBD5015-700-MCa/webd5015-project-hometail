import React from 'react';

const ForbiddenPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-4xl font-bold text-red-600 mb-4">403 - Forbidden</h1>
        <p className="text-xl text-gray-700 mb-6">
          You don&apos;t have permission to view this page.
        </p>
        <a
          href="/"
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Go Back to Home
        </a>
      </div>
    </div>
  );
};

export default ForbiddenPage;
