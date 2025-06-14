import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    collection,
    addDoc,
    query,
    orderBy,
    onSnapshot,
    serverTimestamp,
    setDoc,
    doc,
} from "firebase/firestore";
import { db } from "../../FireBase/firebaseLowyerRegister";
import { FaArrowLeft, FaUser } from "react-icons/fa";

const ChatRoom = () => {
    const { lawyerId } = useParams();
    const navigate = useNavigate();

    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState<any[]>([]);
    const [currentUserId, setCurrentUserId] = useState<string | null>(null);

    useEffect(() => {
        const storedUserId = localStorage.getItem("userId");
        if (!storedUserId) {
            console.warn("المستخدم غير مسجل الدخول، إعادة التوجيه...");
            navigate("/login");
        } else {
            setCurrentUserId(storedUserId);
        }
    }, []);

    const chatId =
        currentUserId && lawyerId
            ? currentUserId < lawyerId
                ? `${currentUserId}_${lawyerId}`
                : `${lawyerId}_${currentUserId}`
            : "";

    useEffect(() => {
        if (!chatId || !currentUserId || !lawyerId) return;

        const messagesRef = collection(db, "Chats", chatId, "messages");
        const q = query(messagesRef, orderBy("timestamp"));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const newMessages = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setMessages(newMessages);
        });

        return () => unsubscribe();
    }, [chatId, currentUserId, lawyerId]);

    const sendMessage = async () => {
        if (!currentUserId || !lawyerId || !chatId) {
            console.error("Missing IDs - cannot send message.", {
                currentUserId,
                lawyerId,
                chatId,
            });
            return;
        }

        if (message.trim() === "") {
            console.warn("Empty message - not sending.");
            return;
        }

        try {
            await setDoc(
                doc(db, "Chats", chatId),
                {
                    participants: [currentUserId, lawyerId],
                },
                { merge: true }
            );

            await addDoc(collection(db, "Chats", chatId, "messages"), {
                senderId: currentUserId,
                receiverId: lawyerId,
                message: message.trim(),
                timestamp: serverTimestamp(),
            });

            setMessage("");
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    return (
        <div className="flex flex-col h-screen bg-gray-100">
            <div className="flex items-center p-4 bg-yellow-500 text-white">
                <FaArrowLeft className="cursor-pointer mr-4" onClick={() => navigate(-1)} />
                <h2 className="text-xl font-bold">Chat</h2>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-2">
                {messages.map((msg) => {
                    const isCurrentUser = msg.senderId === currentUserId;
                    const bgIconColor = isCurrentUser ? "bg-yellow-500" : "bg-green-500";

                    return (
                        <div
                            key={msg.id}
                            className={`flex items-center ${isCurrentUser ? "justify-end" : "justify-start"
                                }`}
                        >
                            {!isCurrentUser && (
                                <div
                                    className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${bgIconColor} mr-2`}
                                >
                                    <FaUser />
                                </div>
                            )}

                            <div
                                className={`max-w-xs px-4 py-2 rounded-lg break-words ${isCurrentUser
                                        ? "bg-blue-500 text-white"
                                        : "bg-white text-black"
                                    }`}
                            >
                                {msg.message}
                            </div>

                            {isCurrentUser && (
                                <div
                                    className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${bgIconColor} ml-2`}
                                >
                                    <FaUser />
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            <div className="p-4 flex gap-2 bg-white border-t border-gray-300">
                <input
                    type="text"
                    placeholder="Type a message..."
                    className="flex-1 border border-gray-300 rounded px-4 py-2"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                />
                <button
                    className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                    onClick={sendMessage}
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default ChatRoom;
