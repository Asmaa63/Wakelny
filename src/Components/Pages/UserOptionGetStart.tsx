import React from 'react';
import { Link } from 'react-router-dom';

const UserOptionGetStart: React.FC = () => {
  return (
    <div className="bg-white py-32">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* For Clients */}
        <div className="bg-gray-100 rounded-lg shadow-md p-6 flex flex-col items-center text-center">
          <h2 className="text-xl font-bold text-gray-800 mb-2">For Clients</h2>
          <p className="text-gray-600 mb-4">
            Join us to find the best legal services tailored to your needs.
          </p>
          <Link to="/ClientStep1" className="bg-yellow-400 text-white font-medium py-2 px-6 rounded-lg hover:bg-yellow-500">
            Sign Up / In
          </Link>
        </div>

        {/* For Lawyers */}
        <div className="bg-gray-200 rounded-lg shadow-md p-6 flex flex-col items-center text-center">
          <h2 className="text-xl font-bold text-gray-800 mb-2">For Lawyers</h2>
          <p className="text-gray-600 mb-4">
            Become a part of our network and connect with potential clients.
          </p>
          <Link to="/lowyerStep1" className="bg-yellow-400 text-white font-medium py-2 px-6 rounded-lg hover:bg-yellow-500">
            Sign Up / In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserOptionGetStart;
