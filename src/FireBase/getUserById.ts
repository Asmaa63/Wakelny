import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebaseLowyerRegister";

const getUserName = async (userId: string): Promise<string> => {
  console.log("🔍 fetching name for userId:", userId);

  try {
    const userRef = doc(db, "clients", userId);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const userData = userSnap.data();
      console.log("✅ found user data:", userData);
      return userData.name || "No Name";
    } else {
      console.warn("❌ user not found for id:", userId);
      return "Unknown User";
    }
  } catch (error) {
    console.error("🔥 Error fetching user:", error);
    return "Error Fetching Name";
  }
};

export default getUserName;
