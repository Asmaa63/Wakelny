import React, { useState } from "react";
import { Link } from "react-router-dom";

const LowyerStep1: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);

  // Handle file upload
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  // Handle drag & drop
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      setFile(event.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <form className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
        <h1 className="text-2xl font-bold text-center mb-4">Client Registration</h1>
        <h3 className="text-lg font-medium text-center mb-6">Step 1 of 3: Basic Information</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          {/* First Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              First Name
            </label>
            <input
              type="text"
              placeholder="First Name"
              className="border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          {/* Last Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Last Name
            </label>
            <input
              type="text"
              placeholder="Last Name"
              className="border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          {/* Email Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Email Address"
              className="border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          {/* Phone Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              placeholder="Phone Number"
              className="border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Password"
              className="border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          {/* Specification */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Specification
            </label>
            <input
              type="text"
              placeholder="Enter your specification"
              className="border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
        </div>

        {/* Certifications */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Certifications
          </label>
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className="border-2 border-dashed border-gray-300 rounded px-4 py-6 flex justify-center items-center text-sm text-gray-600 cursor-pointer hover:border-yellow-400"
          >
            {file ? (
              <p>{file.name}</p>
            ) : (
              <p>Drag & Drop your file here or click to upload</p>
            )}
          </div>
          <input
            type="file"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        {/* Terms & Conditions */}
        <div className="flex items-center justify-between mb-4">
          <label className="text-sm text-gray-600 flex items-center">
            <input type="checkbox" className="mr-2" />
            I agree to the Terms & Conditions
          </label>
        </div>

        <Link
  to="/lowyerstep2"
  className="block text-center w-full bg-yellow-400 text-white py-2 px-4 rounded hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
>
  Next
</Link>

      </form>
    </div>
  );
};

export default LowyerStep1;
