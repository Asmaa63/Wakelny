import React, { useState } from "react";
import { FaGavel } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  // استخدام useTranslation للحصول على الدالة t وكائن i18n
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("language", lng); // حفظ اللغة الجديدة
    window.location.reload(); // إعادة تحميل الصفحة لتحديث الترجمة
  };


  return (
    <nav className="bg-gray-100 shadow-md p-4 fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <FaGavel className="text-yellow-500 text-4xl mr-2" />
          <span className="text-3xl font-bold text-gray-800">Wakelny</span>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-6">
          <Link
            to="/"
            className="text-gray-800 hover:text-yellow-500 font-medium text-lg"
          >
            {t("Home")}
          </Link>
          <Link
            to="/dashboard"
            className="text-gray-800 hover:text-yellow-500 font-medium text-lg"
          >
            {t("Dashboard")}
          </Link>
          <Link
            to="/search"
            className="text-gray-800 hover:text-yellow-500 font-medium text-lg"
          >
            {t("Search")}
          </Link>
          <Link
            to="/profile"
            className="text-gray-800 hover:text-yellow-500 font-medium text-lg"
          >
            {t("Profile")}
          </Link>

          {/* Login Button */}
          <Link
            to="/login"
            className="bg-yellow-400 text-white font-semibold py-2 px-8 rounded-lg shadow-md hover:bg-yellow-500 transform hover:scale-105 transition-all"
          >
            {t("login")}
          </Link>

          {/* زر تغيير اللغة */}
          <div className="flex space-x-2">
            <select
              value={i18n.language} // تعيين اللغة الحالية كقيمة افتراضية
              onChange={(e) => changeLanguage(e.target.value)}
              className="p-2 border rounded"
            >
              <option value="en">English</option>
              <option value="ar">العربية</option>
            </select>
          </div>

        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-800 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={
                isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
              }
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-4 space-y-2">
          <Link
            to="/"
            className="block text-gray-800 hover:text-yellow-500 text-lg"
          >
            {t("Home")}
          </Link>
          <Link
            to="/dashboard"
            className="block text-gray-800 hover:text-yellow-500 text-lg"
          >
            {t("Dashboard")}
          </Link>
          <Link
            to="/search"
            className="block text-gray-800 hover:text-yellow-500 text-lg"
          >
            {t("Search")}
          </Link>
          <Link
            to="/profile"
            className="block text-gray-800 hover:text-yellow-500 text-lg"
          >
            {t("profile")}
          </Link>
          <div className="flex space-x-2">
            <select
              value={i18n.language} // تعيين اللغة الحالية كقيمة افتراضية
              onChange={(e) => changeLanguage(e.target.value)}
              className="p-2 border rounded"
            >
              <option value="en">English</option>
              <option value="ar">العربية</option>
            </select>
          </div>
          <Link
            to="/login"
            className="block bg-yellow-500 hover:bg-yellow-600 text-white font-medium text-lg py-2 px-4 rounded text-center"
          >
            {t("login")}
          </Link>

        </div>

      )}
    </nav>
  );
};

export default Header;
