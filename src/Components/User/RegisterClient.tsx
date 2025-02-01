import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../FireBase/firebaseLowyerRegister"; // Firebase Authentication
import { createUserWithEmailAndPassword } from "firebase/auth";
import toast from "react-hot-toast"; // لإظهار رسائل التنبيه
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { FiUser, FiPlus } from "react-icons/fi";

const storage = getStorage();
const db = getFirestore();

const RegisterClient: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });

  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.agree) {
      toast.error("You must agree to the terms and conditions.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      // إنشاء المستخدم في Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;

      let imageUrl = "";
      if (image) {
        const imageRef = ref(storage, `clients/${user.uid}.jpg`);
        const response = await fetch(image);
        const blob = await response.blob();
        await uploadBytes(imageRef, blob);
        imageUrl = await getDownloadURL(imageRef); // الحصول على رابط الصورة
      }

      // حفظ بيانات العميل في Firestore
      await setDoc(doc(db, "clients", user.uid), {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        imageUrl, // حفظ رابط الصورة
      });

      toast.success("Registration successful!");
      navigate("/HomePage");
    } catch (error: any) {
      console.log("Error during registration:", error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-16 flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-bold text-yellow-500 mb-6">Register Client</h1>
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
        <button type="submit" className="block w-full bg-yellow-500 text-white py-3 rounded-lg hover:bg-yellow-600 transition text-center">
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default RegisterClient;