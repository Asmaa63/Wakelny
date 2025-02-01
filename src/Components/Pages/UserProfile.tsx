import React, { useEffect, useState } from "react";
import { auth, db } from "../../FireBase/firebaseLowyerRegister";
import { doc, getDoc } from "firebase/firestore";

const UserProfile: React.FC = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (auth.currentUser) {
        const clientDoc = await getDoc(doc(db, "clients", auth.currentUser.uid));
        const lawyerDoc = await getDoc(doc(db, "Lawyers", auth.currentUser.uid));

        if (clientDoc.exists()) {
          setUser({ type: "client", ...clientDoc.data() });
        } else if (lawyerDoc.exists()) {
          setUser({ type: "Lawyer", ...lawyerDoc.data() });
        }
      }
    };

    fetchUserData();
  }, []);

  if (!user)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg text-gray-600 animate-pulse">Loading...</p>
      </div>
    );

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md text-center">
        <h2 className="text-3xl font-bold text-yellow-500 mb-6">User Profile</h2>
        <div className="text-gray-700 space-y-4">
          <p className="text-lg">
            <strong className="text-yellow-500">Name:</strong> {user.name || "No Name"}
          </p>
          <p className="text-lg">
            <strong className="text-yellow-500">Email:</strong> {user.email || "No Email"}
          </p>
          {user.type === "lawyer" && (
            <>
              <p className="text-lg">
                <strong className="text-yellow-500">Location:</strong> {user.location || "Not provided"}
              </p>
              <p className="text-lg">
                <strong className="text-yellow-500">Experience:</strong> {user.experience || "Not provided"}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
