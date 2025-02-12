import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../../FireBase/firebaseLowyerRegister";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

interface UserData {
  name: string;
  phone: string;
  location: string;
  experience: string;
  imageUrl: string;
  userType: string;
}

interface AuthContextType {
  user: any;
  userData: UserData | null;
  setUserData: React.Dispatch<React.SetStateAction<UserData | null>>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const clientRef = doc(db, "Clients", currentUser.uid);
        const lawyerRef = doc(db, "Lawyers", currentUser.uid);

        const clientSnap = await getDoc(clientRef);
        const lawyerSnap = await getDoc(lawyerRef);

        if (clientSnap.exists()) {
          setUserData({
            name: clientSnap.data().name || "",
            phone: clientSnap.data().phone || "",
            location: clientSnap.data().location || "",
            experience: clientSnap.data().experience || "",
            imageUrl: clientSnap.data().imageUrl || "",
            userType: "client",
          });
        } else if (lawyerSnap.exists()) {
          setUserData({
            name: lawyerSnap.data().name || "",
            phone: lawyerSnap.data().phone || "",
            location: lawyerSnap.data().location || "",
            experience: lawyerSnap.data().experience || "",
            imageUrl: lawyerSnap.data().imageUrl || "",
            userType: "Lawyer",
          });
        } else {
          setUserData(null);
        }
      } else {
        setUserData(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, userData, setUserData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
