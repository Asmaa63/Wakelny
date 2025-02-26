import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiUser, FiPlus } from "react-icons/fi";
import { auth } from "../../FireBase/firebaseLowyerRegister";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../FireBase/firebaseLowyerRegister";

const RegisterLawyer: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    location: "",
    experience: "",
    practiceAreas: [] as string[],
    aboutMe: "",
    email: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });

  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.agree) {
      setError("You must agree to the terms and conditions.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      await setDoc(doc(db, "Lawyers", userCredential.user.uid), {
        name: formData.name,
        phone: formData.phone,
        location: formData.location,
        experience: formData.experience,
        practiceAreas: formData.practiceAreas,
        email: formData.email,
        details: formData.aboutMe,
      });
      setSuccess(true);
    } 
    catch (error: any) {
  if (error.code === "auth/email-already-in-use") {
    setErrorMessage("This email is already registered. Please use a different email.");
  } else {
    setErrorMessage(error.message);
  }
}
    finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCheckboxChange = (area: string) => {
    setFormData((prevData) => {
      const newPracticeAreas = prevData.practiceAreas.includes(area)
        ? prevData.practiceAreas.filter((item) => item !== area)
        : [...prevData.practiceAreas, area];
      return { ...prevData, practiceAreas: newPracticeAreas };
    });
  };

  return (
    <div className="mt-16 flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-bold text-yellow-500 mb-6">Register</h1>
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-3xl relative">
        <div className="flex flex-col items-center mb-6 relative">
          <label className="cursor-pointer relative">
            <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
            <div className="relative">
              {image ? (
                <img
                  src={image}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover border-4 border-yellow-500"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center border-4 border-yellow-500">
                  <FiUser className="w-12 h-12 text-gray-400" />
                </div>
              )}
              <div className="absolute bottom-0 right-0 bg-yellow-500 text-white p-1 rounded-full">
                <FiPlus className="w-5 h-5" />
              </div>
            </div>
          </label>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-yellow-500"
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-yellow-500"
            required
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-yellow-500"
            required
          />
          <input
            type="text"
            name="experience"
            placeholder="Experience"
            value={formData.experience}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-yellow-500"
            required
          />
        </div>
        <div className="relative col-span-2 mt-4">
          <label className="block text-gray-700 mb-2 font-medium">Practice Areas</label>
          <div className="border border-gray-300 rounded-lg p-3 bg-white focus:ring-2 focus:ring-yellow-500">
            {["State Council", "Civil", "Misdemeanor", "Criminal", "Family", "Economic"].map((area) => (
              <div key={area} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id={area}
                  checked={formData.practiceAreas.includes(area)}
                  onChange={() => handleCheckboxChange(area)}
                  className="mr-2 w-5 h-5 text-yellow-500 focus:ring-yellow-500"
                />
                <label htmlFor={area} className="text-gray-700">
                  {area}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-yellow-500"
            required
          />
          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Create Password"
              value={formData.password}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          <div className="relative w-full">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500"
            >
              {showConfirmPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>
        <textarea
          className="border border-gray-300 rounded-lg p-2 w-full mt-4 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          name="aboutMe"
          placeholder="About"
          value={formData.aboutMe}
          onChange={handleChange}
          required
        />
        <div className="flex items-center mt-4 pb-4">
          <input
            type="checkbox"
            id="agree"
            name="agree"
            checked={formData.agree}
            onChange={handleChange}
            className="mr-2 w-5 h-5 text-yellow-500 focus:ring-yellow-500"
          />
          <label htmlFor="agree" className="text-gray-700">
            I agree to the{" "}
            <Link to="/terms" className="text-yellow-500 underline">
              terms and conditions
            </Link>
          </label>
        </div>
        <button
          type="submit"
          className="block w-full bg-yellow-500 text-white py-3 rounded-lg hover:bg-yellow-600 transition text-center"
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
      {error && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-red-500 font-semibold">{error}</p>
            <button onClick={() => setError(null)} className="mt-4 bg-gray-500 text-white px-4 py-2 rounded-lg">
              OK
            </button>
          </div>
        </div>
      )}
      {errorMessage && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
      <h2 className="text-xl font-bold mb-2 text-red-600">Registration Error</h2>
      <p className="text-gray-700">{errorMessage}</p>
      <button
        onClick={() => setErrorMessage(null)}
        className="mt-4 bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 transition"
      >
        OK
      </button>
    </div>
  </div>
)}
      {success && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-green-500 font-semibold">Registration successful!</p>
            <button onClick={() => navigate("/login")} className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded-lg">
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisterLawyer;
