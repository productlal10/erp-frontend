// src/components/LoginScreen.js

import React from 'react';

const LoginScreen = ({ username, setUsername, password, setPassword, handleLogin, loginError, isLoading }) => {
  return (
    <div className="flex items-center justify-center min-h-screen p-4 font-sans bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-2xl">
        <h2 className="mb-6 text-3xl font-bold text-center text-gray-800">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block mb-2 font-semibold text-gray-700" htmlFor="username">Username</label>
            <input 
              type="text" 
              id="username" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              required 
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block mb-2 font-semibold text-gray-700" htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          {loginError && <p className="text-sm font-medium text-center text-red-500">{loginError}</p>}
          <button 
            type="submit" 
            className="w-full px-4 py-2 font-bold text-white transition bg-blue-600 rounded-xl hover:bg-blue-700 hover:scale-105"
            disabled={isLoading}
          >
            {isLoading ? 'Logging In...' : 'Log In'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginScreen;