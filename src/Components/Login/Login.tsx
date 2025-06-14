import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaGoogle, FaFacebook, FaTwitter } from "react-icons/fa";
import { auth } from "../../FireBase/firebaseLowyerRegister";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  TwitterAuthProvider,
} from "firebase/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useTranslation } from "react-i18next";

const Login: React.FC = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      // هنا بعد تسجيل الدخول بنجاح، خدي userId وخزنيه في localStorage
      const userId = userCredential.user.uid;
      localStorage.setItem("userId", userId);

      toast.success(t("loginSuccess"), { position: "top-center", autoClose: 2000 });
      navigate("/HomePage");
    } catch (error: any) {
      console.error("Login Error:", error);
      const errorCode = error.code;

      if (errorCode === "auth/wrong-password") {
        toast.error(t("wrongPassword"), { position: "top-center", autoClose: 3000 });
      } else if (errorCode === "auth/user-not-found") {
        toast.error(t("userNotFound"), { position: "top-center", autoClose: 3000 });
      } else {
        toast.error(t("unexpectedError"), { position: "top-center", autoClose: 3000 });
      }
    } finally {
      setLoading(false);
    }
  };


  const handleSocialLogin = async (provider: any) => {
    try {
      const result = await signInWithPopup(auth, provider);

      const userId = result.user.uid;
      localStorage.setItem("userId", userId);

      toast.success(t("loginSuccess"), { position: "top-center", autoClose: 2000 });
      navigate("/HomePage");
    } catch (error) {
      console.error("Social login error:", error);
      toast.error(t("unexpectedError"), { position: "top-center", autoClose: 3000 });
    }
  };

  const googleProvider = new GoogleAuthProvider();
  const facebookProvider = new FacebookAuthProvider();
  const twitterProvider = new TwitterAuthProvider();

  return (
    <div className="pt-24 pb-6 flex items-center justify-center min-h-screen bg-gray-50">
      <ToastContainer />
      <form onSubmit={handleLogin} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-4 text-yellow-500">{t("login")}</h1>

        <input
          type="email"
          placeholder={t("email")}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-yellow-400"
          required
        />

        <div className="relative mb-6">
          <input
            type={showPassword ? "text" : "password"}
            placeholder={t("password")}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500"
          >
            {showPassword ? t("hide") : t("show")}
          </button>
        </div>

        <button
          type="submit"
          className="block text-center w-full bg-yellow-400 text-white py-2 px-4 rounded hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          disabled={loading}
        >
          {loading ? t("logging...") : t("login")}
        </button>

        <div className="mt-6">
          <p className="text-center text-gray-600 mb-4">{t("or Sign In With")}</p>
          <div className="flex flex-col space-y-4">
            <button
              type="button"
              onClick={() => handleSocialLogin(googleProvider)}
              className="flex items-center justify-center w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              <FaGoogle className="mr-2" />
              {t("continue with google")}
            </button>
            <button
              type="button"
              onClick={() => handleSocialLogin(facebookProvider)}
              className="flex items-center justify-center w-full bg-blue-700 text-white py-2 px-4 rounded hover:bg-blue-800"
            >
              <FaFacebook className="mr-2" />
              {t("continue with facebook")}
            </button>
            <button
              type="button"
              onClick={() => handleSocialLogin(twitterProvider)}
              className="flex items-center justify-center w-full bg-sky-400 text-white py-2 px-4 rounded hover:bg-sky-500"
            >
              <FaTwitter className="mr-2" />
              {t("continue with twitter")}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
