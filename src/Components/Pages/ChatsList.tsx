import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllChats } from "../../FireBase/getChats";
import getUserName from "../../FireBase/getUserById";
import { FaArrowLeft } from "react-icons/fa";

type Chat = {
  id: string;
  participants: string[];
};

const ChatList = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [userNames, setUserNames] = useState<Record<string, string>>({});
  const navigate = useNavigate();

  useEffect(() => {
    const storedId = localStorage.getItem("userId");
    if (!storedId) {
      console.warn("User ID not found in localStorage");
      return;
    }

    setCurrentUserId(storedId);

    const fetchChats = async () => {
      const allChats = await getAllChats();

      const userChats = allChats.filter((chat: any) =>
        chat.participants?.includes(storedId)
      );

      setChats(userChats);

      const otherIds = userChats
        .map((chat: any) => chat.participants.find((id: string) => id !== storedId))
        .filter((id: string | undefined): id is string => id !== undefined);

      const uniqueOtherIds = Array.from(new Set(otherIds));

      const namesMap: Record<string, string> = {};
      await Promise.all(
        uniqueOtherIds.map(async (id) => {
          const name = await getUserName(id);
          namesMap[id] = name;
        })
      );

      setUserNames(namesMap);
    };

    fetchChats();
  }, []);

  return (
    <div className="p-4">
      <div className="flex items-center p-4 bg-yellow-500 text-white mb-3 rounded">
        <FaArrowLeft className="cursor-pointer mr-4" onClick={() => navigate(-1)} />
        <h2 className="text-xl font-bold">Chat List</h2>
      </div>

      {chats.length === 0 ? (
        <p className="text-gray-500">No chats found</p>
      ) : (
        <ul className="space-y-2">
          {chats.map((chat) => {
            const otherUserId = chat.participants.find((id) => id !== currentUserId);
            const displayName = otherUserId ? userNames[otherUserId] : "Unknown User";

            return (
              <li
                key={chat.id}
                onClick={() => navigate(`/chat/${otherUserId}`)}
                className="cursor-pointer bg-white p-4 rounded shadow hover:bg-gray-100"
              >
                <span className="text-gray-700 font-medium">Chat with:</span>{" "}
                <span className="text-yellow-600 font-bold">{displayName}</span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default ChatList;
