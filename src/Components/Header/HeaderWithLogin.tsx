import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaGavel } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import { signOut } from "firebase/auth";
import { auth, db } from "../../FireBase/firebaseLowyerRegister";
import { doc, deleteDoc, getDoc } from "firebase/firestore";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

const HeaderWithLogin: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [setUser] = useState<any>(null);
  const [language, setLanguage] = useState(localStorage.getItem("language") || "en");
  const [_, forceUpdate] = useState(false); // تحديث إجباري عند تغيير اللغة
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language, i18n]);

  const changeLanguage = (lng: string) => {
    setLanguage(lng);
    localStorage.setItem("language", lng);
    i18n.changeLanguage(lng).then(() => {
      forceUpdate((prev) => !prev); // يجبر إعادة التحديث بعد تغيير اللغة
    });
  };

  useEffect(() => {
    const fetchUserData = async () => {
      if (auth.currentUser) {
        const userDoc = await getDoc(doc(db, "users", auth.currentUser.uid));
        if (userDoc.exists()) {
          setUser(userDoc.data());
        }
      }
    };
    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      if (auth.currentUser) {
        await deleteDoc(doc(db, "users", auth.currentUser.uid));
      }
      await signOut(auth);
      toast.success("Logged out successfully!");
      navigate("/login");
    } catch (error) {
      toast.error("Failed to log out. Try again.");
    }
  };

  return (
    <nav className="bg-gray-100 shadow-md p-4 fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <FaGavel className="text-yellow-500 text-4xl mr-2" />
          <Link to="/">
            <span className="text-3xl font-bold text-gray-800">Wakelny</span>
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/HomePage" className="text-gray-800 hover:text-yellow-500 font-medium text-lg">
            {t("Home")}
          </Link>
          <Link to="/Dashboard" className="text-gray-800 hover:text-yellow-500 font-medium text-lg">
            {t("Dashboard")}
          </Link>
          <Link to="/Search" className="text-gray-800 hover:text-yellow-500 font-medium text-lg">
            {t("Search")}
          </Link>
          <Link to="/FavoriteLowyer" className="text-gray-800 hover:text-yellow-500 font-medium text-lg">
            {t("Favorite")}
          </Link>

          {/* Profile Icon */}
          <Link to="/profile" className="relative text-gray-800 hover:text-yellow-500 text-lg border rounded-full p-2 border-yellow-400">
            <FiUser className="text-2xl cursor-pointer transition-all transform hover:scale-110" />
          </Link>

          {/* Language Toggle Dropdown */}
          <select
            value={language}
            onChange={(e) => changeLanguage(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="en">English</option>
            <option value="ar">العربية</option>
          </select>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="bg-yellow-400 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-yellow-500 flex items-center space-x-2 transform hover:scale-105 transition-all"
          >
            <span>{t("Logout")}</span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-gray-800 focus:outline-none" onClick={() => setIsOpen(!isOpen)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-4 space-y-2">
          <Link to="/" className="block text-gray-800 hover:text-yellow-500 text-lg">{t("Home")}</Link>
          <Link to="/Dashboard" className="block text-gray-800 hover:text-yellow-500 text-lg">{t("Dashboard")}</Link>
          <Link to="/Search" className="block text-gray-800 hover:text-yellow-500 text-lg">{t("Search")}</Link>
          <Link to="/FavoriteLowyer" className="block text-gray-800 hover:text-yellow-500 text-lg">{t("Favorite")}</Link>
          <Link to="/profile" className="block text-gray-800 hover:text-yellow-500 text-lg">{t("Profile")}</Link>

          {/* Language Selector */}
          <select
            value={language}
            onChange={(e) => changeLanguage(e.target.value)}
            className="p-2 border rounded w-full"
          >
            <option value="en">English</option>
            <option value="ar">العربية</option>
          </select>

          <button
            onClick={handleLogout}
            className="block w-full text-center bg-yellow-500 hover:bg-yellow-600 text-white font-medium text-lg py-2 px-4 rounded"
          >
            {t("Logout")}
          </button>
        </div>
      )}
    </nav>
  );
};

export default HeaderWithLogin;
