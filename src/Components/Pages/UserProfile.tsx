import React, { useEffect, useState } from "react";
import { auth, db } from "../../FireBase/firebaseLowyerRegister";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { FaEdit, FaSave, FaCamera, FaUser, FaCheck, FaTimes } from "react-icons/fa";

const UserProfile: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [userType, setUserType] = useState<string | null>(null);
  const practiceAreasOptions = ["State Council", "Civil", "Misdemeanor", "Criminal", "Family", "Economic"];
  
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

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (!auth.currentUser) {
      console.error("No authenticated user found.");
      return;
    }
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
      setUser({ ...user, profileImage: URL.createObjectURL(e.target.files[0]) });
    }
  };

  const togglePracticeArea = (area: string) => {
    const updatedAreas = user.practiceAreas.includes(area)
      ? user.practiceAreas.filter((a: string) => a !== area)
      : [...user.practiceAreas, area];
    setUser({ ...user, practiceAreas: updatedAreas });
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg text-gray-600 animate-pulse">Loading...</p>
      </div>
    );

  if (!user)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg text-red-500">No user data found</p>
      </div>
    );

  return (
    <div className="pt-24 flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-xl rounded-3xl p-8 w-full max-w-lg text-center">
        <div className="relative w-32 h-32 mx-auto">
          {user.profileImage ? (
            <img src={user.profileImage} alt="Profile" className="w-32 h-32 rounded-full border-4 border-yellow-500 object-cover" />
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
        <h2 className="text-3xl font-bold text-yellow-500 mt-4">{user.name}</h2>
        <div className="text-gray-700 space-y-4 mt-4 text-left">
          <p><strong className="text-yellow-500">Details:</strong> {user.details || "Not provided"}</p>
          <p><strong className="text-yellow-500">Phone:</strong> {user.phone || "Not provided"}</p>
          <p><strong className="text-yellow-500">Email:</strong> {user.email}</p>
          {userType === "Lawyer" && (
            <>
              <p><strong className="text-yellow-500">Experience:</strong> {user.experience || "Not provided"}</p>
              <p><strong className="text-yellow-500">Location:</strong> {user.location || "Not provided"}</p>
              <p><strong className="text-yellow-500">Practice Areas:</strong> {isEditing ? practiceAreasOptions.map(area => (
                <label key={area} className="block">
                  <input type="checkbox" checked={user.practiceAreas.includes(area)} onChange={() => togglePracticeArea(area)} className="mr-2" />
                  {area}
                </label>
              )) : user.practiceAreas.join(", ") || "Not provided"}</p>
            </>
          )}
        </div>
        <button className="mt-6 px-6 py-2 bg-yellow-500 text-white rounded-lg flex items-center mx-auto hover:bg-yellow-600 transition" onClick={isEditing ? handleSave : handleEdit}>
          {isEditing ? <FaSave className="mr-2" /> : <FaEdit className="mr-2" />} {isEditing ? "Save" : "Edit"}
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
