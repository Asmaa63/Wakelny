import { useState } from "react";
import HeaderWithLogin from "../Header/HeaderWithLogin";
import Inputs from "./inputs";
import CategorySelector from "./CategorySelector";
import AIAssistance from "./AIAssistance";
import LawyersList from "./LawyersList";

function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGov, setSelectedGov] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]); // تم تغييره ليكون array of strings

  return (
    <>
      <HeaderWithLogin />
      <Inputs setSearchQuery={setSearchQuery} setSelectedGov={setSelectedGov} />
      <CategorySelector setSelectedCategories={setSelectedCategories} />
      <AIAssistance />
      <LawyersList 
        searchQuery={searchQuery} 
        selectedGov={selectedGov} 
        selectedCategories={selectedCategories} 
      />
    </>
  );
}

export default HomePage;
