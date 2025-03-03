import React, { useState } from "react";
import { FaBalanceScale, FaBuilding, FaGavel, FaUserShield, FaUsers, FaChartBar } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const CategorySelector: React.FC<{ setSelectedCategories: (categories: string[]) => void }> = ({ setSelectedCategories }) => {
  const { t } = useTranslation();
  const [selectedCategories, setLocalCategories] = useState<string[]>([]);

  const categories = [
  { id: "stateCouncil", name: t("practiceAreas.stateCouncil"), icon: <FaBalanceScale /> },
  { id: "civil", name: t("practiceAreas.civil"), icon: <FaBuilding /> },
  { id: "misdemeanor", name: t("practiceAreas.misdemeanor"), icon: <FaGavel /> },
  { id: "criminal", name: t("practiceAreas.criminal"), icon: <FaUserShield /> },
  { id: "family", name: t("practiceAreas.family"), icon: <FaUsers /> },
  { id: "economic", name: t("practiceAreas.economic"), icon: <FaChartBar /> },
];

  
  const toggleSelection = (id: string) => {
    const updatedCategories = selectedCategories.includes(id)
      ? selectedCategories.filter((cat) => cat !== id)
      : [...selectedCategories, id];

    setLocalCategories(updatedCategories);
    setSelectedCategories(updatedCategories);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {categories.map((category) => (
        <label
          key={category.id}
          className="flex items-center justify-between gap-2 p-4 bg-yellow-100 border border-yellow-300 rounded-xl shadow-lg hover:bg-yellow-200 transition-all cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <span className="text-yellow-700 text-2xl">{category.icon}</span>
            <span className="text-yellow-900 font-semibold text-lg">{category.name}</span>
          </div>
          <input
            type="checkbox"
            checked={selectedCategories.includes(category.id)}
            onChange={() => toggleSelection(category.id)}
          />
        </label>
      ))}
    </div>
  );
};

export default CategorySelector;
