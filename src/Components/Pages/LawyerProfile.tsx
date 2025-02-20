import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  doc,
  getDoc,
  collection,
  getDocs,
} from "firebase/firestore";
import { db } from "../../FireBase/firebaseLowyerRegister";
import {
  FaUserCircle,
  FaPhone,
  FaMapMarkerAlt,
  FaBriefcase,
  FaInfoCircle,
  FaHeart,
  FaStar,
} from "react-icons/fa";

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

interface Review {
  id: string;
  rating: number;
  text: string;
  createdAt?: string;
}

const LawyerProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [lawyer, setLawyer] = useState<Lawyer | null>(null);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [averageRating, setAverageRating] = useState<number>(0);

  useEffect(() => {
    const fetchLawyer = async () => {
      if (!id) return;
      const docRef = doc(db, "Lawyers", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const lawyerData = docSnap.data() as Omit<Lawyer, "id">;
        setLawyer({ ...lawyerData, id: docSnap.id });
      } else {
        console.error("No such lawyer found!");
      }
    };

    const fetchReviews = async () => {
      if (!id) return;
      const reviewsRef = collection(db, "Lawyers", id, "reviews");
      const reviewsSnap = await getDocs(reviewsRef);
      const fetchedReviews: Review[] = [];
      let totalRating = 0;
      reviewsSnap.forEach((reviewDoc) => {
        const data = reviewDoc.data() as Omit<Review, "id">;
        fetchedReviews.push({ ...data, id: reviewDoc.id });
        totalRating += data.rating;
      });
      setReviews(fetchedReviews);
      if (fetchedReviews.length > 0) {
        setAverageRating(totalRating / fetchedReviews.length);
      } else {
        setAverageRating(0);
      }
    };

    fetchLawyer();
    fetchReviews();
  }, [id]);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favoriteLawyers") || "[]");
    if (id && savedFavorites.includes(id)) {
      setIsFavorite(true);
    }
  }, [id]);

  const toggleFavorite = () => {
    if (!id) return;
    const savedFavorites = JSON.parse(localStorage.getItem("favoriteLawyers") || "[]");
    let updatedFavorites;

    if (isFavorite) {
      updatedFavorites = savedFavorites.filter((favId: string) => favId !== id);
    } else {
      updatedFavorites = [...savedFavorites, id];
    }

    localStorage.setItem("favoriteLawyers", JSON.stringify(updatedFavorites));
    setIsFavorite(!isFavorite);
  };

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FaStar
          key={i}
          className={`inline-block ${
            i <= rating ? "text-yellow-500" : "text-gray-300"
          }`}
        />
      );
    }
    return stars;
  };

  if (!lawyer) {
    return <p className="text-center text-gray-500 mt-10">Loading lawyer profile...</p>;
  }

  return (
    <div className="pt-24 flex justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-2xl p-6 bg-white shadow-lg rounded-lg border border-yellow-500 relative">
        <FaHeart
          className={`absolute top-4 right-4 text-3xl cursor-pointer ${
            isFavorite ? "text-red-500" : "text-gray-400"
          }`}
          onClick={toggleFavorite}
        />
        <div className="flex justify-center">
          {lawyer.image ? (
            <img
              src={lawyer.image}
              alt={lawyer.name}
              className="w-32 h-32 rounded-full object-cover border-4 border-yellow-500"
            />
          ) : (
            <FaUserCircle className="w-32 h-32 text-gray-400" />
          )}
        </div>
        <h2 className="text-2xl font-bold text-center mt-4 text-yellow-600">
          {lawyer.name}
        </h2>
        <p className="text-center text-gray-500 flex justify-center items-center gap-2">
          <FaMapMarkerAlt className="text-yellow-500" />
          {lawyer.location || "Location not specified"}
        </p>
        <div className="mt-6 space-y-4 text-gray-700">
          <p className="flex items-center gap-2">
            <FaPhone className="text-yellow-500" /> <strong>Phone:</strong>{" "}
            {lawyer.phone || "Not provided"}
          </p>
          <p className="flex items-center gap-2">
            <FaBriefcase className="text-yellow-500" /> <strong>Experience:</strong>{" "}
            {lawyer.experience || "Not specified"}
          </p>
          <p className="flex items-center gap-2">
            <FaInfoCircle className="text-yellow-500" /> <strong>Practice Areas:</strong>{" "}
            {lawyer.practiceAreas?.join(", ") || "Not specified"}
          </p>
          <p className="flex items-center gap-2">
            <FaInfoCircle className="text-yellow-500" /> <strong>Details:</strong>{" "}
            {lawyer.details
              ? lawyer.details
              : "No additional details available at the moment."}
          </p>
        </div>

        <div className="mt-6 text-center">
          <h3 className="text-xl font-semibold">Rating</h3>
          <div className="flex justify-center mt-2">
            {renderStars(Math.round(averageRating))}
          </div>
          <p className="mt-2 text-gray-500">
            Average Rating: {averageRating.toFixed(1)} ({reviews.length} reviews)
          </p>
        </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={() => navigate("/chat")}
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-6 rounded-full shadow-md transform transition duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-300 mr-4"
          >
            Chat
          </button>
          <button
            onClick={() => navigate(`/lawyer/${id}/reviews`)}
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-6 rounded-full shadow-md transform transition duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-300"
          >
            Reviews
          </button>
        </div>

        {reviews.length > 0 && (
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">User Reviews</h3>
            {reviews.map((review) => (
              <div key={review.id} className="border border-gray-200 p-4 rounded mb-4">
                <div className="flex items-center mb-2">
                  {renderStars(review.rating)}
                </div>
                <p className="text-gray-700">{review.text}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LawyerProfile;
