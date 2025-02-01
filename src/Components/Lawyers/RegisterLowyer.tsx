import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiUser, FiPlus } from "react-icons/fi";
import { auth } from "../../FireBase/firebaseLowyerRegister"; // استيراد Firebase Auth
import { createUserWithEmailAndPassword } from "firebase/auth";
import toast from "react-hot-toast"; // لإظهار رسائل التنبيه

import { doc, setDoc } from "firebase/firestore";
import { db } from "../../FireBase/firebaseLowyerRegister"; // استيراد Firestore


const RegisterLawyer: React.FC = () => {
   const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    location: "",
    experience: "",
    practiceAreas: [] as string[],
    email: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });

  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  console.log("Register button clicked!");
  
  if (!formData.agree) {
    console.log("User did not agree to terms");
    toast.error("You must agree to the terms and conditions.");
    return;
  }

  if (formData.password !== formData.confirmPassword) {
    console.log("Passwords do not match");
    toast.error("Passwords do not match.");
    return;
  }

  setLoading(true);

  try {
    console.log("Starting registration...");
    
    const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
    
    console.log("User Created:", userCredential.user);
    toast.success("Registration successful!");

    navigate("/HomePage");

    await setDoc(doc(db, "Lawyers", userCredential.user.uid), {
  name: formData.name,
  phone: formData.phone,
  location: formData.location,
  experience: formData.experience,
  practiceAreas: formData.practiceAreas,
  email: formData.email,
});

    console.log("User Data Saved in Firestore");
  } catch (error: any) {
    console.log("Error during registration:", error);
    toast.error(error.message);
  } finally {
    setLoading(false);
  }
};


  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0]; // الحصول على الملف المرفوع
  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result as string); // تعيين الصورة في الحالة
    };
    reader.readAsDataURL(file);
  }
};

const handleCheckboxChange = (area: string) => {
  setFormData((prevData) => {
    const newPracticeAreas = prevData.practiceAreas.includes(area)
      ? prevData.practiceAreas.filter((item) => item !== area) // إزالة المجال إذا كان مختارًا بالفعل
      : [...prevData.practiceAreas, area]; // إضافة المجال إذا لم يكن مختارًا
    return { ...prevData, practiceAreas: newPracticeAreas };
  });
};


  return (
    <div className="mt-16 flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-bold text-yellow-500 mb-6">Register</h1>
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-3xl">
        {/* صورة المستخدم */}
        <div className="flex flex-col items-center mb-6 relative">
          <label className="cursor-pointer relative">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
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

        {/* الحقول */}
        <div className="grid grid-cols-2 gap-4">
          <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-yellow-500" required />
          <input type="text" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-yellow-500" required />
          <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleChange} className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-yellow-500" required />
          <input type="text" name="experience" placeholder="Experience" value={formData.experience} onChange={handleChange} className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-yellow-500" required />

          {/* Checkboxes */}
          <div className="relative col-span-2">
            <label className="block text-gray-700 mb-2 font-medium">Practice Areas</label>
            <div className="border border-gray-300 rounded-lg p-3 bg-white focus:ring-2 focus:ring-yellow-500">
              {["State Council", "Civil", "Misdemeanor", "Criminal", "Family", "Economic"].map((area) => (
                <div key={area} className="flex items-center mb-2">
                  <input type="checkbox" id={area} checked={formData.practiceAreas.includes(area)} onChange={() => handleCheckboxChange(area)} className="mr-2 w-5 h-5 text-yellow-500 focus:ring-yellow-500" />
                  <label htmlFor={area} className="text-gray-700">{area}</label>
                </div>
              ))}
            </div>
          </div>

          {/* Email & Password */}
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-yellow-500" required />
          <input type="password" name="password" placeholder="Create Password" value={formData.password} onChange={handleChange} className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-yellow-500" required />
          <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-yellow-500" required />
        </div>

<div className="flex items-center mt-4 pb-4">
  <input
    type="checkbox"
    id="agree"
    name="agree"
    checked={formData.agree}
    onChange={handleChange}
    className="mr-2 w-5 h-5 text-yellow-500 focus:ring-yellow-500"
  />
  <label htmlFor="agree" className="text-gray-700 ">
    I agree to the <Link to="/terms" className="text-yellow-500 underline">terms and conditions</Link>
  </label>
</div>

        {/* زر التسجيل */}
        <button
  type="submit"
  className="block w-full bg-yellow-500 text-white py-3 rounded-lg hover:bg-yellow-600 transition text-center"
>
  {loading ? "Registering..." : "Register"}
</button>

      </form>
    </div>
  );
};

export default RegisterLawyer;
