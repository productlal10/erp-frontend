import React from 'react';

const HomePage = ({username}) => {
  return (
    <div className="flex-1 p-8 m-4 bg-white shadow-lg rounded-xl">
      <h2 className="mb-4 text-2xl font-semibold text-gray-700">Welcome to Home</h2>
      <p className="text-gray-600">You are logged in as <strong>{username}</strong>.</p>
    </div>
  );
};

export default HomePage;