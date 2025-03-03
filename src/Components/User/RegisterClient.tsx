import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../FireBase/firebaseLowyerRegister";
import { createUserWithEmailAndPassword } from "firebase/auth";
import toast from "react-hot-toast";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { FiUser, FiPlus } from "react-icons/fi";
import { useTranslation } from "react-i18next";

const storage = getStorage();
const db = getFirestore();


const RegisterClient: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

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
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log("Image selected:", file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.agree) {
      setPopupMessage(t("You must agree to the terms and conditions."));
      setShowPopup(true);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setPopupMessage(t("Passwords do not match."));
      setShowPopup(true);
      return;
    }

    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;

      let imageUrl = "";
      if (image) {
        const imageRef = ref(storage, `clients/${user.uid}.jpg`);
        const response = await fetch(image);
        const blob = await response.blob();
        await uploadBytes(imageRef, blob);
        imageUrl = await getDownloadURL(imageRef);
      }

      await setDoc(doc(db, "clients", user.uid), {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        imageUrl,
      });

      setPopupMessage(t("Registration Successful!"));
      setShowPopup(true);
    }
    catch (error: any) {
      console.error("Firebase error:", error);
      if (error.code === "auth/email-already-in-use") {
        setPopupMessage(t("This email is already in use. Redirecting to login"));
        setShowPopup(true);
        setTimeout(() => navigate("/login"), 3000);
      } else {
        toast.error(error.message);
      }
    }

    finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-16 flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 relative">
      <h1 className="text-4xl font-bold text-yellow-500 mb-6">{t("Register")}</h1>
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-3xl">
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
            placeholder={t("Name")}
            value={formData.name}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-yellow-500"
            required
          />
          <input
            type="text"
            name="phone"
            placeholder={t("Phone")}
            value={formData.phone}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-yellow-500"
            required
          />
          <input
            type="email"
            name="email"
            placeholder={t("Email")}
            value={formData.email}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-yellow-500"
            required
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder={t("Create Password")}
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
              {showPassword ? t("Hide") : t("Show")}
            </button>
          </div>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder={t("Confirm Password")}
              value={formData.confirmPassword}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500"
            >
              {showPassword ? t("Hide") : t("Show")}
            </button>
          </div>
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
          <label htmlFor="agree" className="text-gray-700">
            {t("I agree to the terms and conditions.")}
          </label>
        </div>
        <button
          type="submit"
          className="block w-full bg-yellow-500 text-white py-3 rounded-lg hover:bg-yellow-600 transition text-center"
        >
          {loading ? t("Registering...") : t("Register")}
        </button>
      </form>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-xl font-bold mb-4">{popupMessage}</h2>
            <button onClick={() => navigate("/login")} className="bg-yellow-500 text-white px-4 py-2 rounded-lg">{t("OK")} </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisterClient;
