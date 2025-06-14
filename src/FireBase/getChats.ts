import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebaseLowyerRegister";

type Chat = {
  id: string;
  participants: string[];
};

export const getAllChats = async (): Promise<Chat[]> => {
  const chatsRef = collection(db, "Chats");
  const snapshot = await getDocs(chatsRef);

  const chats: Chat[] = snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      participants: data.participants || [], // تأكيد وجود participants
    };
  });

  return chats;
};
