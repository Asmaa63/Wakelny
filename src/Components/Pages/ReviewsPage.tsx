import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../FireBase/firebaseLowyerRegister";
import { FaStar } from "react-icons/fa";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next"; 

const ReviewsPage: React.FC = () => {
  const { t } = useTranslation(); 
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [rating, setRating] = useState<number>(0);
  const [hover, setHover] = useState<number>(0);
  const [reviewText, setReviewText] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    if (rating === 0) {
      toast.error(t("selectRating")); 
      return;
    }
    try {
      const reviewsRef = collection(db, "Lawyers", id, "reviews");
      await addDoc(reviewsRef, {
        rating,
        text: reviewText,
        createdAt: new Date().toISOString(),
      });
      toast.success(t("submitted")); 
      navigate(`/lawyer/${id}`);
    } catch (error: any) {
      toast.error(t("error")); 
    }
  };

  return (
    <div className="pt-24 flex justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-2xl p-6 bg-white shadow-lg rounded-lg border border-yellow-500">
        <h2 className="text-2xl font-bold text-center mb-6">
          {t("title")} 
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="flex justify-center mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                className={`cursor-pointer text-3xl ${(hover || rating) >= star ? "text-yellow-500" : "text-gray-300"
                  }`}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
                onClick={() => setRating(star)}
              />
            ))}
          </div>
          <div className="mb-4">
            <textarea
              className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-yellow-500"
              rows={4}
              placeholder={t("placeholder")} 
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="block w-full bg-yellow-500 text-white py-3 rounded-lg hover:bg-yellow-600 transition text-center"
          >
            {t("submit")} 
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReviewsPage;
