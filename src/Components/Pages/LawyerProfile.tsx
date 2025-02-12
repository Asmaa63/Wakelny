import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../FireBase/firebaseLowyerRegister";
import { FaUserCircle, FaPhone, FaMapMarkerAlt, FaBriefcase, FaInfoCircle } from "react-icons/fa";

interface Lawyer {
  id: string;
  name: string;
  image?: string;
  phone?: string;
  experience?: string;
  practiceAreas?: string[];
  location?: string;
  details?: string;
}

const LawyerProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [lawyer, setLawyer] = useState<Lawyer | null>(null);

  useEffect(() => {
    const fetchLawyer = async () => {
      if (!id) return;
      const docRef = doc(db, "Lawyers", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setLawyer({ id: docSnap.id, ...docSnap.data() } as Lawyer);
      } else {
        console.error("No such lawyer found!");
      }
    };
    fetchLawyer();
  }, [id]);

  if (!lawyer) {
    return <p className="text-center text-gray-500 mt-10">Loading lawyer profile...</p>;
  }

  return (
    <div className="pt-24 flex justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-2xl p-6 bg-white shadow-lg rounded-lg border border-yellow-500">
        {/* صورة المحامي */}
        <div className="flex justify-center">
          {lawyer.image ? (
            <img src={lawyer.image} alt={lawyer.name} className="w-32 h-32 rounded-full object-cover border-4 border-yellow-500" />
          ) : (
            <FaUserCircle className="w-32 h-32 text-gray-400" />
          )}
        </div>

        {/* بيانات المحامي */}
        <h2 className="text-2xl font-bold text-center mt-4 text-yellow-600">{lawyer.name}</h2>
        <p className="text-center text-gray-500 flex justify-center items-center gap-2">
          <FaMapMarkerAlt className="text-yellow-500" /> {lawyer.location || "Location not specified"}
        </p>

        <div className="mt-6 space-y-4 text-gray-700">
          <p className="flex items-center gap-2">
            <FaPhone className="text-yellow-500" /> <strong>Phone:</strong> {lawyer.phone || "Not provided"}
          </p>
          <p className="flex items-center gap-2">
            <FaBriefcase className="text-yellow-500" /> <strong>Experience:</strong> {lawyer.experience || "Not specified"}
          </p>
          <p className="flex items-center gap-2">
            <FaInfoCircle className="text-yellow-500" /> <strong>Practice Areas:</strong> {lawyer.practiceAreas?.join(", ") || "Not specified"}
          </p>
          <p className="flex items-center gap-2">
            <FaInfoCircle className="text-yellow-500" /> <strong>Details:</strong> {lawyer.details || "No additional details provided."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LawyerProfile;
