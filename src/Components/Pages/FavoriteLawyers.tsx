import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../FireBase/firebaseLowyerRegister";
import { FaUserCircle } from "react-icons/fa";

const FavoriteLawyers: React.FC = () => {
  const [favoriteLawyers, setFavoriteLawyers] = useState<any[]>([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      const savedFavorites = JSON.parse(localStorage.getItem("favoriteLawyers") || "[]");
      const lawyersData = [];
      
      for (const id of savedFavorites) {
        const docRef = doc(db, "Lawyers", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          lawyersData.push({ id: docSnap.id, ...docSnap.data() });
        }
      }
      setFavoriteLawyers(lawyersData);
    };
    fetchFavorites();
  }, []);

  return (
    <div className="pt-24 px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-bold text-center text-yellow-600 mb-6">Favorite Lawyers</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {favoriteLawyers.length > 0 ? (
          favoriteLawyers.map((lawyer) => (
            <Link
              key={lawyer.id}
              to={`/lawyer/${lawyer.id}`}
              className="p-4 bg-white shadow-lg rounded-lg border border-yellow-500 flex flex-col items-center"
            >
              {lawyer.image ? (
                <img src={lawyer.image} alt={lawyer.name} className="w-20 h-20 rounded-full object-cover" />
              ) : (
                <FaUserCircle className="w-20 h-20 text-gray-400" />
              )}
              <h3 className="text-lg font-semibold mt-3 text-yellow-700">{lawyer.name}</h3>
              <p className="text-gray-600 text-sm">{lawyer.location || "Location not specified"}</p>
            </Link>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">No favorite lawyers added.</p>
        )}
      </div>
    </div>
  );
};

export default FavoriteLawyers;
