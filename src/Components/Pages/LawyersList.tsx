import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../FireBase/firebaseLowyerRegister";
import { FaUserCircle, FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface Lawyer {
  id: string;
  name: string;
  image?: string;
  practiceAreas?: string[];
  location?: string;
}

interface LawyersListProps {
  searchQuery: string;
  selectedGov: string;
  selectedCategories: string[];
}

const LawyersList: React.FC<LawyersListProps> = ({ searchQuery, selectedGov, selectedCategories }) => {
  const [lawyers, setLawyers] = useState<Lawyer[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]); // قائمة المفضلين
  const navigate = useNavigate();

  // تحميل المحامين من Firebase
  useEffect(() => {
    const fetchLawyers = async () => {
      const querySnapshot = await getDocs(collection(db, "Lawyers"));
      const lawyersData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name || "Unknown",
        image: doc.data().image || "",
        practiceAreas: Array.isArray(doc.data().practiceAreas) ? doc.data().practiceAreas : [],
        location: doc.data().location || "Unknown location",
      }));
      setLawyers(lawyersData);
    };

    fetchLawyers();
  }, []);

  // تحميل قائمة المفضلين من localStorage عند تشغيل التطبيق
  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favoriteLawyers") || "[]");
    setFavorites(savedFavorites);
  }, []);

  // دالة لحفظ/إزالة المحامي من المفضلين
  const toggleFavorite = (lawyerId: string) => {
    let updatedFavorites;
    if (favorites.includes(lawyerId)) {
      updatedFavorites = favorites.filter((id) => id !== lawyerId); // إزالة المحامي من المفضلين
    } else {
      updatedFavorites = [...favorites, lawyerId]; // إضافة المحامي للمفضلين
    }
    setFavorites(updatedFavorites);
    localStorage.setItem("favoriteLawyers", JSON.stringify(updatedFavorites)); // تحديث localStorage
  };

  // تصفية المحامين حسب البحث والفلاتر
  const filteredLawyers = lawyers.filter(
    (lawyer) =>
      lawyer.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (!selectedGov || lawyer.location === selectedGov) &&
      (selectedCategories.length === 0 || lawyer.practiceAreas?.some((area) => selectedCategories.includes(area)))
  );

  return (
    <div className="p-6">
      {filteredLawyers.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredLawyers.map((lawyer) => (
            <div
              key={lawyer.id}
              className="relative bg-white shadow-lg rounded-lg p-4 text-center border border-yellow-500 cursor-pointer"
            >
              {/* أيقونة القلب لإضافة للمفضلين */}
              <FaHeart
                className={`absolute top-3 right-3 text-2xl cursor-pointer ${
                  favorites.includes(lawyer.id) ? "text-red-500" : "text-gray-400"
                }`}
                onClick={(e) => {
                  e.stopPropagation(); // لمنع الانتقال إلى صفحة المحامي عند الضغط على القلب
                  toggleFavorite(lawyer.id);
                }}
              />

              <div onClick={() => navigate(`/lawyer/${lawyer.id}`)}>
                {lawyer.image ? (
                  <img
                    src={lawyer.image}
                    alt={lawyer.name}
                    className="w-24 h-24 rounded-full mx-auto object-cover border-2 border-yellow-500"
                  />
                ) : (
                  <FaUserCircle className="w-24 h-24 text-gray-400 mx-auto" />
                )}

                <h3 className="text-lg font-semibold mt-3">{lawyer.name}</h3>

                <p className="text-sm text-yellow-600 font-medium mt-1">
                  {Array.isArray(lawyer.practiceAreas) && lawyer.practiceAreas.length > 0
                    ? lawyer.practiceAreas.join(" / ")
                    : "Not specified"}
                </p>

                <p className="text-sm text-gray-500 mt-1">{lawyer.location}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No lawyers found matching your filters.</p>
      )}
    </div>
  );
};

export default LawyersList;
