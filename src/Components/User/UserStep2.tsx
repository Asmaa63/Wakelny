import React from 'react';
import { Link } from 'react-router-dom';

const UserStep2: React.FC = () => {
  return (
    <div className="pt-24 pb-6 flex items-center justify-center min-h-screen bg-gray-50">
      <form className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl">
        <h1 className="text-2xl font-bold text-center mb-4">Role-Specific Information</h1>
        <h3 className="text-lg font-medium text-center mb-6">Registration Step 2 of 3</h3>

        {/* Section for Clients */}
        <h2 className="text-lg font-semibold mb-4">For Clients:</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <input
            type="text"
            placeholder="Street Address"
            className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <input
            type="text"
            placeholder="City"
            className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <input
            type="text"
            placeholder="State/Province"
            className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <input
            type="text"
            placeholder="Country"
            className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <input
            type="text"
            placeholder="Postal Code"
            className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        <div className="mb-6">
          <p className="text-sm font-medium mb-2">Preferred Consultation Method:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <label className="flex items-center">
              <input type="radio" name="consultation" className="mr-2" />
              Phone
            </label>
            <label className="flex items-center">
              <input type="radio" name="consultation" className="mr-2" />
              Video Call
            </label>
            <label className="flex items-center">
              <input type="radio" name="consultation" className="mr-2" />
              In-Person Consultation
            </label>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <input
            type="text"
            placeholder="Type of Legal Service Needed"
            className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <input
            type="text"
            placeholder="Budget Range"
            className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <input
            type="text"
            placeholder="Preferred Lawyer Gender or Language"
            className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        <Link to="/userstep3"
          type="submit"
          className="block text-center w-full bg-yellow-400 text-white py-2 px-4 rounded hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        >
          Next
        </Link>
      </form>
    </div>
  );
};

export default UserStep2;
