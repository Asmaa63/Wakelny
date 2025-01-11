import React from "react";
import { Link } from "react-router-dom";
import { FaGoogle, FaFacebook, FaTwitter } from "react-icons/fa";

const Login: React.FC = () => {
  return (
    <div className="pt-24 pb-6 flex items-center justify-center min-h-screen bg-gray-50">
      <form className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-4">Client Registration</h1>
        <h3 className="text-lg font-medium text-center mb-6">Step 1 of 3: Basic Information</h3>

        <input
          type="email"
          placeholder="Email Address"
          className="border border-gray-300 rounded px-4 py-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
        <input
          type="password"
          placeholder="Password"
          className="border border-gray-300 rounded px-4 py-2 mb-6 w-full focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />

        {/* Login Button */}
        <Link
          to="/userstep2"
          className="block text-center w-full bg-yellow-400 text-white py-2 px-4 rounded hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        >
          Login
        </Link>

        {/* Social Media Login Buttons */}
        <div className="mt-6">
          <p className="text-center text-gray-600 mb-4">Or sign in with</p>
          <div className="flex flex-col space-y-4">
            {/* Google Button */}
            <button
              type="button"
              className="flex items-center justify-center w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <FaGoogle className="mr-2" />
              Continue with Google
            </button>
            {/* Facebook Button */}
            <button
              type="button"
              className="flex items-center justify-center w-full bg-blue-700 text-white py-2 px-4 rounded hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <FaFacebook className="mr-2" />
              Continue with Facebook
            </button>
            {/* Twitter Button */}
            <button
              type="button"
              className="flex items-center justify-center w-full bg-sky-400 text-white py-2 px-4 rounded hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-300"
            >
              <FaTwitter className="mr-2" />
              Continue with Twitter
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
