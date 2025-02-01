import React, { useState } from "react";
import { FaBalanceScale, FaBuilding, FaGavel, FaUserShield, FaUsers, FaChartBar } from "react-icons/fa";

const categories = [
  { id: "State Council", name: "مجلس دولة / State Council", icon: <FaBalanceScale /> },
  { id: "Civil", name: "مدني / Civil", icon: <FaBuilding /> },
  { id: "Misdemeanors", name: "جنح / Misdemeanors", icon: <FaGavel /> },
  { id: "Criminal", name: "جنائي / Criminal", icon: <FaUserShield /> },
  { id: "Family", name: "أسرة / Family", icon: <FaUsers /> },
  { id: "Economic", name: "اقتصادية / Economic", icon: <FaChartBar /> },
];

interface CategorySelectorProps {
  setSelectedCategories: (categories: string[]) => void;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({ setSelectedCategories }) => {
  const [selectedCategories, setLocalCategories] = useState<string[]>([]);

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
