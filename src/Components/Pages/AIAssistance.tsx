import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const AIAssistance: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const userStr = localStorage.getItem("user");
  console.log("📦 user from localStorage:", userStr);

  let userType: "client" | "lawyer" | null = null;
  try {
    const user = JSON.parse(userStr || "{}");
    userType = user.role;
    console.log("✅ userType (role) is:", userType);
  } catch (err) {
    console.error("❌ Failed to parse user from localStorage:", err);
  }

  const handleClick = () => {
    console.log("👉 handleClick fired. userType =", userType);
    if (userType === "lawyer") {
      console.log("🔁 navigating to /chat/lawyer");
      navigate("/chat/lawyer");
    } else {
      console.log("🔁 navigating to /chat/client");
      navigate("/chat/client");
    }
  };

  return (
    <div className="bg-yellow-100 p-6 rounded-lg shadow-lg text-center max-w-3xl mx-auto my-10">
      <p className="text-yellow-900 font-semibold text-lg">
        {t("ai_assistance_message")}
      </p>
      <button
        onClick={handleClick}
        className="mt-4 bg-yellow-500 text-white px-6 py-2 rounded-full font-medium hover:bg-yellow-600 transition"
      >
        {t("get_ai_assistance")}
      </button>
    </div>
  );
};

export default AIAssistance;
