// import React, { createContext, useContext, useState } from 'react';

// const LanguageContext = createContext();

// export const useLanguage = () => useContext(LanguageContext);

// export const LanguageProvider = ({ children }) => {
//   const [language, setLanguage] = useState('en'); // اللغة الافتراضية هي الإنجليزي

//   const toggleLanguage = () => {
//     setLanguage(language === 'en' ? 'ar' : 'en'); // لو اللغة الإنجليزية هي الحالية، حولها لعربي
//   };

//   return (
//     <LanguageContext.Provider value={{ language, toggleLanguage }}>
//       {children}
//     </LanguageContext.Provider>
//   );
// };
