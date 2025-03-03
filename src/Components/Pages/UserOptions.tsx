import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next"; // استيراد الترجمة

const UserOptions: React.FC = () => {
  const { t } = useTranslation(); // استخدام الترجمة

  return (
    <div className="bg-white py-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* For Clients */}
        <div className="bg-gray-100 rounded-lg shadow-md p-6 flex flex-col items-center text-center">
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            {t("clientsTitle")}
          </h2>
          <p className="text-gray-600 mb-4">
            {t("clientsDescription")}
          </p>
          <Link
            to="/ClientStep1"
            className="bg-yellow-400 text-white font-medium py-2 px-6 rounded-lg hover:bg-yellow-500"
          >
            {t("signUpIn")}
          </Link>
        </div>

        {/* For Lawyers */}
        <div className="bg-gray-200 rounded-lg shadow-md p-6 flex flex-col items-center text-center">
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            {t("lawyersTitle")}
          </h2>
          <p className="text-gray-600 mb-4">
            {t("lawyersDescription")}
          </p>
          <Link
            to="/lowyerStep1"
            className="bg-yellow-400 text-white font-medium py-2 px-6 rounded-lg hover:bg-yellow-500"
          >
            {t("signUpIn")}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserOptions;
