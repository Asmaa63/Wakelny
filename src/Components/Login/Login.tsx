import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaGoogle, FaFacebook, FaTwitter } from "react-icons/fa";
import { auth } from "../../FireBase/firebaseLowyerRegister"; // تأكدي من إعداد Firebase بشكل صحيح
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

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // تسجيل الدخول باستخدام البريد وكلمة المرور
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login successful!", { position: "top-center", autoClose: 2000 });
      navigate("/HomePage"); // إعادة التوجيه إلى الصفحة الرئيسية بعد تسجيل الدخول
    } catch (error: any) {
      console.error("Login Error:", error);
      const errorCode = error.code;

      if (errorCode === "auth/wrong-password") {
        toast.error("Incorrect password. Please try again.", { position: "top-center", autoClose: 3000 });
      } else if (errorCode === "auth/user-not-found") {
        toast.error("No account found with this email. Please check or sign up.", { position: "top-center", autoClose: 3000 });
      } else {
        toast.error("An unexpected error occurred. Please try again.", { position: "top-center", autoClose: 3000 });
      }
    } finally {
      setLoading(false);
    }
  };

  // دالة لتسجيل الدخول الاجتماعي باستخدام المزوّد المناسب
  const handleSocialLogin = async (provider: any) => {
    try {
      await signInWithPopup(auth, provider);
      toast.success("Login successful!", { position: "top-center", autoClose: 2000 });
      navigate("/HomePage");
    } catch (error) {
      console.error("Social login error:", error);
      toast.error("An error occurred. Please try again.", { position: "top-center", autoClose: 3000 });
    }
  };

  // إنشاء مثيلات لمزودي المصادقة
  const googleProvider = new GoogleAuthProvider();
  const facebookProvider = new FacebookAuthProvider();
  const twitterProvider = new TwitterAuthProvider();

  return (
    <div className="pt-24 pb-6 flex items-center justify-center min-h-screen bg-gray-50">
      <ToastContainer />
      <form onSubmit={handleLogin} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-4 text-yellow-500">Login</h1>

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-yellow-400"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 mb-6 w-full focus:outline-none focus:ring-2 focus:ring-yellow-400"
          required
        />

        <button
          type="submit"
          className="block text-center w-full bg-yellow-400 text-white py-2 px-4 rounded hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* خيارات تسجيل الدخول الاجتماعي */}
        <div className="mt-6">
          <p className="text-center text-gray-600 mb-4">Or sign in with</p>
          <div className="flex flex-col space-y-4">
            <button
              type="button"
              onClick={() => handleSocialLogin(googleProvider)}
              className="flex items-center justify-center w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <FaGoogle className="mr-2" />
              Continue with Google
            </button>
            <button
              type="button"
              onClick={() => handleSocialLogin(facebookProvider)}
              className="flex items-center justify-center w-full bg-blue-700 text-white py-2 px-4 rounded hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <FaFacebook className="mr-2" />
              Continue with Facebook
            </button>
            <button
              type="button"
              onClick={() => handleSocialLogin(twitterProvider)}
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
