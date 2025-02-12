import React, { useEffect, useState } from "react";
import { auth, db } from "../../FireBase/firebaseLowyerRegister";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { FaEdit, FaSave, FaCamera, FaUser } from "react-icons/fa";

const UserProfile: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [userType, setUserType] = useState<string | null>(null);

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

      const updatedData = {
        name: user.name,
        phone: user.phone,
        email: user.email,
        ...(userType === "Lawyer" && {
          experience: user.experience,
          location: user.location,
          practiceAreas: user.practiceAreas,
        }),
      };

      await updateDoc(userDocRef, updatedData);

      console.log("Profile updated successfully!");
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
        {/* صورة البروفايل */}
        <div className="relative w-32 h-32 mx-auto">
          {user.profileImage ? (
            <img
              src={user.profileImage}
              alt="Profile"
              className="w-32 h-32 mx-auto rounded-full border-4 border-yellow-500 object-cover"
            />
          ) : (
            <div className="w-32 h-32 mx-auto rounded-full border-4 border-yellow-500 flex items-center justify-center bg-gray-200">
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

        <h2 className="text-3xl font-bold text-yellow-500 mt-4">{userType} Profile</h2>
        <div className="text-gray-700 space-y-4 mt-4">
          {/* البيانات العامة */}
          <p className="text-lg text-left"><strong className="text-yellow-500">Name:</strong> {isEditing ? <input type="text" value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} className="border-b border-gray-400 focus:outline-none focus:border-yellow-500 w-full" /> : user.name || "No Name"}</p>
          <p className="text-lg text-left"><strong className="text-yellow-500">Phone:</strong> {isEditing ? <input type="text" value={user.phone} onChange={(e) => setUser({ ...user, phone: e.target.value })} className="border-b border-gray-400 focus:outline-none focus:border-yellow-500 w-full" /> : user.phone || "Not provided"}</p>
          <p className="text-lg text-left"><strong className="text-yellow-500">Email:</strong> {user.email}</p>

          {/* حقول خاصة بالمحامي فقط */}
          {userType === "Lawyer" && (
            <>
              <p className="text-lg text-left"><strong className="text-yellow-500">Experience:</strong> {isEditing ? <input type="text" value={user.experience} onChange={(e) => setUser({ ...user, experience: e.target.value })} className="border-b border-gray-400 focus:outline-none focus:border-yellow-500 w-full" /> : user.experience || "Not provided"}</p>
              <p className="text-lg text-left"><strong className="text-yellow-500">Location:</strong> {isEditing ? <input type="text" value={user.location} onChange={(e) => setUser({ ...user, location: e.target.value })} className="border-b border-gray-400 focus:outline-none focus:border-yellow-500 w-full" /> : user.location || "Not provided"}</p>
              <p className="text-lg text-left"><strong className="text-yellow-500">Practice Areas:</strong> {isEditing ? <input type="text" value={user.practiceAreas} onChange={(e) => setUser({ ...user, practiceAreas: e.target.value })} className="border-b border-gray-400 focus:outline-none focus:border-yellow-500 w-full" /> : user.practiceAreas || "Not provided"}</p>
            </>
          )}
        </div>

        <button className="mt-6 px-6 py-2 bg-yellow-500 text-white rounded-lg flex items-center mx-auto" onClick={isEditing ? handleSave : handleEdit}>
          {isEditing ? <FaSave className="mr-2" /> : <FaEdit className="mr-2" />} {isEditing ? "Save" : "Edit"}
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
