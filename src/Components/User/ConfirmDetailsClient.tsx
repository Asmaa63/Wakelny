import React from "react";
import { useNavigate } from "react-router-dom";

const ConfirmDetailsClient: React.FC = () => {
  const navigate = useNavigate();
  const userDetails = JSON.parse(localStorage.getItem("userDetails") || "{}");

  const handleConfirm = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-yellow-500 mb-6">Confirm Details</h1>
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <p className="mb-2"><strong>Name:</strong> {userDetails.name}</p>
        <p className="mb-2"><strong>Phone:</strong> {userDetails.phone}</p>
        <p className="mb-2"><strong>Email:</strong> {userDetails.email}</p>
        <button
          onClick={handleConfirm}
          className="w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition mt-4"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default ConfirmDetailsClient;
