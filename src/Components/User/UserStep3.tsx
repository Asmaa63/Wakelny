import React from 'react';
import { FaGavel } from 'react-icons/fa';

const UserStep3: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl">
        {/* Header */}
        <header className="flex items-center justify-between border-b pb-4 mb-6">
          <div className="flex items-center">
            <FaGavel className="text-yellow-500 text-2xl mr-2" />
            <h1 className="text-xl font-bold text-gray-800">Wakelny</h1>
          </div>
          <span className="text-sm text-gray-600">Step 3 of 3</span>
        </header>

        {/* Confirmation Section */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Confirm Your Details</h2>
          <p className="text-sm text-gray-600 mb-6">
            Please review your information below. You can go back to make any changes if needed.
          </p>

          <div className="border rounded-lg p-4">
            <h3 className="text-lg font-bold text-gray-800 mb-2">Client Review Details</h3>

            {/* Personal Information */}
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-gray-700 mb-1">Personal Information:</h4>
              <p className="text-sm text-gray-600">Name: John Smith</p>
              <p className="text-sm text-gray-600">Email: john.smith@example.com</p>
              <p className="text-sm text-gray-600">Phone: (555) 123-4567</p>
            </div>

            {/* Address */}
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-gray-700 mb-1">Address:</h4>
              <p className="text-sm text-gray-600">Country: USA</p>
              <p className="text-sm text-gray-600">Province: California</p>
            </div>

            {/* Preferences */}
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-gray-700 mb-1">Preferences:</h4>
              <p className="text-sm text-gray-600">Preferred Lawyer Type: Family Law</p>
            </div>

            {/* Edit Link */}
            {/* <div className="text-right">
              <button className="text-sm text-blue-500 hover:underline">Edit</button>
            </div> */}
          </div>
        </div>

        {/* Register Button */}
        <div className="mt-6">
          <button className="block text-center w-full bg-yellow-400 text-white py-2 px-4 rounded hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400">
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserStep3;
