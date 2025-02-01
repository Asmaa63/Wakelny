import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../FireBase/firebaseLowyerRegister";
import { FaUserCircle } from "react-icons/fa";

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

  useEffect(() => {
    const fetchLawyers = async () => {
      const querySnapshot = await getDocs(collection(db, "Lawyers"));
      const lawyersData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name || "Unknown",
        image: doc.data().image || "",
        practiceAreas: doc.data().practiceAreas || [],
        location: doc.data().location || "Unknown location",
      }));
      setLawyers(lawyersData);
    };

    fetchLawyers();
  }, []);

  // تصفية المحامين بناءً على البحث والمحافظة والفئات المختارة
  const filteredLawyers = lawyers.filter((lawyer) =>
    lawyer.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (!selectedGov || lawyer.location === selectedGov) &&
    ( selectedCategories.length === 0 || lawyer.practiceAreas?.some(area => selectedCategories.includes(area)))
  );

  return (
    <div className="p-6">
      {filteredLawyers.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredLawyers.map((lawyer) => (
            <div
              key={lawyer.id}
              className="bg-white shadow-lg rounded-lg p-4 text-center border border-yellow-500"
            >
              {/* صورة المحامي */}
              {lawyer.image ? (
                <img
                  src={lawyer.image}
                  alt={lawyer.name}
                  className="w-24 h-24 rounded-full mx-auto object-cover border-2 border-yellow-500"
                />
              ) : (
                <FaUserCircle className="w-24 h-24 text-gray-400 mx-auto" />
              )}

              {/* اسم المحامي */}
              <h3 className="text-lg font-semibold mt-3">{lawyer.name}</h3>

              {/* المجالات القانونية */}
              <p className="text-sm text-yellow-600 font-medium mt-1">
                {lawyer.practiceAreas && lawyer.practiceAreas.length > 0 
    ? lawyer.practiceAreas.join(" / ") 
    : "Not specified"}
              </p>

              {/* المحافظة */}
              <p className="text-sm text-gray-500 mt-1">{lawyer.location}</p>
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
