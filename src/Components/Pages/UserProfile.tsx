import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { auth, db } from "../../FireBase/firebaseLowyerRegister";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { FaEdit, FaSave, FaCamera, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const UserProfile: React.FC = () => {
  const { t } = useTranslation();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [userType, setUserType] = useState<string | null>(null);

  const navigate = useNavigate();

  const practiceAreaKeys: Record<string, string> = {
    "state council": "stateCouncil",
    "civil": "civil",
    "misdemeanor": "misdemeanor",
    "criminal": "criminal",
    "family": "family",
    "economic": "economic"
  };
  const practiceAreasOptions = Object.values(practiceAreaKeys);

  useEffect(() => {
    const fetchUserData = async () => {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        setLoading(false);
        return;
      }
      const lawyerDoc = await getDoc(doc(db, "Lawyers", currentUser.uid));
      const clientDoc = await getDoc(doc(db, "clients", currentUser.uid));

      if (lawyerDoc.exists()) {
        setUserType("Lawyer");
        setUser({ type: "Lawyer", ...lawyerDoc.data() });
      } else if (clientDoc.exists()) {
        setUserType("Client");
        setUser({ type: "Client", ...clientDoc.data() });
      }
      setLoading(false);
    };
    fetchUserData();
  }, []);

  const handleEdit = () => setIsEditing(true);
  const handleSave = async () => {
    if (!auth.currentUser) return;
    setIsEditing(false);
    try {
      const userDocRef = doc(db, userType === "Lawyer" ? "Lawyers" : "clients", auth.currentUser.uid);
      if (imageFile) {
        const storage = getStorage();
        const storageRef = ref(storage, `profilePictures/${auth.currentUser.uid}`);
        await uploadBytes(storageRef, imageFile);
        const imageUrl = await getDownloadURL(storageRef);
        setUser({ ...user, profileImage: imageUrl });
        await updateDoc(userDocRef, { profileImage: imageUrl });
      }
      await updateDoc(userDocRef, user);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };


  const togglePracticeArea = (area: string) => {
    const currentAreas = user.practiceAreas || [];
    const updatedAreas = currentAreas.includes(area)
      ? currentAreas.filter((a: string) => a !== area)
      : [...currentAreas, area];

    setUser({ ...user, practiceAreas: updatedAreas });
  };


  if (loading) return <p className="text-lg text-gray-600 animate-pulse text-center">{t("loading")}</p>;
  if (!user) return <p className="text-lg text-red-500 text-center">{t("noUserData")}</p>;

  return (
    <div className="pt-24 flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-xl rounded-3xl p-8 w-full max-w-lg text-center">
        <div className="relative w-32 h-32 mx-auto">
          {user.profileImage ? (
            <img src={user.profileImage} alt={t("alt.profileImage")} className="w-32 h-32 rounded-full border-4 border-yellow-500 object-cover" />
          ) : (
            <div className="w-32 h-32 rounded-full border-4 border-yellow-500 flex items-center justify-center bg-gray-200">
              <FaUser className="text-gray-500 text-6xl" />
            </div>
          )}
          {isEditing && (
            <>
              <label htmlFor="imageUpload" className="absolute bottom-2 right-2 bg-gray-800 text-white p-2 rounded-full cursor-pointer">
                <FaCamera />
              </label>
              <input type="file" id="imageUpload" className="hidden" accept="image/*" onChange={handleImageChange} />
            </>
          )}
        </div>
        <h2 className="text-3xl font-bold text-yellow-500 mt-4">
          {isEditing ? <input name="name" value={user.name} onChange={handleInputChange} className="border p-1 rounded-lg" /> : user.name}
        </h2>
        <div className="text-gray-700 space-y-4 mt-4 text-left">
          {["phone", "email", "about", "experience", "location"].map((field) => (
            <p key={field}><strong className="text-yellow-500">{t(field)}:</strong> {isEditing ? <input name={field} value={user[field]} onChange={handleInputChange} className="border p-1 rounded-lg w-full" /> : user[field]}</p>
          ))}
          {userType === "Lawyer" && (
            <p>
              <strong className="text-yellow-500">{t("practiceAreas.title")}:</strong>
              {isEditing ? (
                practiceAreasOptions.map(area => (
                  <label key={area} className="block">
                    <input
                      type="checkbox"
                      checked={user.practiceAreas.includes(area)}
                      onChange={() => togglePracticeArea(area)}
                      className="mr-2"
                    />
                    {t(`practiceAreas.${area}`)}
                  </label>

                ))
              ) : (
                user.practiceAreas.map((area: string) => t(`practiceAreas.${practiceAreaKeys[area.toLowerCase()] || area}`, area)).join(", ")

              )}
              <button
                onClick={() => navigate("/chats")}
                className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg flex items-center mx-auto hover:bg-blue-600 transition"
              >
                💬 {t("viewChats") || "View Chats"}
              </button>

            </p>
            
          )}
        </div>
        <button className="mt-6 px-6 py-2 bg-yellow-500 text-white rounded-lg flex items-center mx-auto hover:bg-yellow-600 transition" onClick={isEditing ? handleSave : handleEdit}>
          {isEditing ? <FaSave className="mr-2" /> : <FaEdit className="mr-2" />} {isEditing ? t("save") : t("edit")}
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
