import React from 'react';
import { Link } from 'react-router-dom';

const UserStep1: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <form className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-4">Client Registration</h1>
        <h3 className="text-lg font-medium text-center mb-6">Step 1 of 3: Basic Information</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            placeholder="First Name"
            className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <input
            type="text"
            placeholder="Last Name"
            className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        <input
          type="email"
          placeholder="Email Address"
          className="border border-gray-300 rounded px-4 py-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
        <input
          type="tel"
          placeholder="Phone Number"
          className="border border-gray-300 rounded px-4 py-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
        <input
          type="password"
          placeholder="Password"
          className="border border-gray-300 rounded px-4 py-2 mb-6 w-full focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />

        <div className="flex items-center justify-between mb-4">
          <label className="text-sm text-gray-600 flex items-center">
            <input type="checkbox" className="mr-2" />
            I agree to the Terms & Conditions
          </label>
        </div>

        <Link
          to="/userstep2"
          className="block text-center w-full bg-yellow-400 text-white py-2 px-4 rounded hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        >
          Next
        </Link>
      </form>
    </div>
  );
};

export default UserStep1;
