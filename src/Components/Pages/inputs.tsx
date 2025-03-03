import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const Inputs: React.FC<{ setSearchQuery: (query: string) => void; setSelectedGov: (gov: string) => void }> = ({ setSearchQuery, setSelectedGov }) => {
  const { t } = useTranslation();
  const [selectedGov, setLocalGov] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const governorates = [
    "All", "Cairo", "Giza", "Alexandria", "Dakahlia", "Red Sea", "Beheira", "Fayoum",
    "Gharbiya", "Ismailia", "Menofia", "Minya", "Qaliubiya", "New Valley",
    "Suez", "Aswan", "Assiut", "Beni Suef", "Port Said", "Damietta", "Sharkia",
    "South Sinai", "Kafr El Sheikh", "Matruh", "Luxor", "Qena", "North Sinai",
    "Sohag"
  ];

  return (
    <div className="w-full max-w-md mx-auto p-6 pt-28">
      {/* Search Input */}
      <input
        type="text"
        placeholder={t("What are you looking for?")}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-yellow-400 focus:outline-none"
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {/* Dropdown Select */}
      <div className="relative mt-4">
        <button
          className="w-full px-4 py-2 border border-gray-300 bg-white rounded-lg flex justify-between items-center shadow-sm focus:ring-2 focus:ring-yellow-400 focus:outline-none"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          {selectedGov ? t(selectedGov) : t("Select Governorate")}
          <FaChevronDown className="text-gray-600" />
        </button>

        {/* Dropdown List */}
        {dropdownOpen && (
          <div className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-lg shadow-lg mt-1 z-10 max-h-60 overflow-y-auto">
            {governorates.map((gov, index) => (
              <div
                key={index}
                className={`px-4 py-2 hover:bg-yellow-100 cursor-pointer transition-all ${
                  selectedGov === gov ? "bg-yellow-100" : ""
                }`}
                onClick={() => {
                  setLocalGov(gov);
                  setSelectedGov(gov === "All" ? "" : gov);
                  setDropdownOpen(false);
                }}
              >
                {t(gov)}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Inputs;
