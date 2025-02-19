import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaGavel } from "react-icons/fa";
import { FiUser} from "react-icons/fi";
import { signOut } from "firebase/auth";
import { auth, db } from "../../FireBase/firebaseLowyerRegister";
import { doc, deleteDoc, getDoc } from "firebase/firestore";
import toast from "react-hot-toast";

const HeaderWithLogin: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [ setUser] = useState<any>(null);
  const navigate = useNavigate();

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
        await deleteDoc(doc(db, "users", auth.currentUser.uid)); // حذف بيانات المستخدم
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
            Home
          </Link>
          <Link to="/HomePage" className="text-gray-800 hover:text-yellow-500 font-medium text-lg">
            Dashboard
          </Link>
          <Link to="/HomePage" className="text-gray-800 hover:text-yellow-500 font-medium text-lg">
            Search
          </Link>
          <Link to="/FavoriteLowyer" className="text-gray-800 hover:text-yellow-500 font-medium text-lg">
            Favorite
          </Link>

          {/* Profile Icon */}
          <Link to="/profile" className="relative text-gray-800 hover:text-yellow-500 text-lg border rounded-full p-2 border-yellow-400">
  <FiUser className="text-2xl cursor-pointer transition-all transform hover:scale-110" />
</Link>


          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="bg-yellow-400 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-yellow-500 flex items-center space-x-2 transform hover:scale-105 transition-all"
          >
            <span>Logout</span>
          </button>
        </div>
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
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>
      </div>






      {/* User Profile Component */}

{/* Mobile Menu Button */}
        

{/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-4 space-y-2">
          <Link
            to="/"
            className="block text-gray-800 hover:text-yellow-500 text-lg"
          >
            Home
          </Link>
          <Link
            to="/dashboard"
            className="block text-gray-800 hover:text-yellow-500 text-lg"
          >
            Dashboard
          </Link>
          <Link
            to="/search"
            className="block text-gray-800 hover:text-yellow-500 text-lg"
          >
            Search
          </Link>
          <Link
            to="/FavoriteLowyer"
            className="block text-gray-800 hover:text-yellow-500 text-lg"
          >
           favorite 
          </Link>
          <Link
            to="/profile"
            className="block text-gray-800 hover:text-yellow-500 text-lg"
          >
            Profile
          </Link>
          <Link
            to="/login"
            className="block bg-yellow-500 hover:bg-yellow-600 text-white font-medium text-lg py-2 px-4 rounded text-center"
          >
            Login
          </Link>
        </div>
      )}
    </nav>
  );
};

export default HeaderWithLogin;
