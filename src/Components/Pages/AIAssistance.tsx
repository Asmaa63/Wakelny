import React from "react";
import { useTranslation } from "react-i18next";

const AIAssistance: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-yellow-100 p-6 rounded-lg shadow-lg text-center max-w-3xl mx-auto my-10">
      <p className="text-yellow-900 font-semibold text-lg">
        {t("ai_assistance_message")}
      </p>
      <button className="mt-4 bg-yellow-500 text-white px-6 py-2 rounded-full font-medium hover:bg-yellow-600 transition">
        {t("get_ai_assistance")}
      </button>
    </div>
  );
};

export default AIAssistance;
