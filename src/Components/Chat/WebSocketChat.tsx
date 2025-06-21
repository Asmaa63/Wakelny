import React, { useEffect, useRef, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

type Message = {
    sender: "user" | "bot";
    text: string;
};

const WebSocketChat: React.FC = () => {
    const ws = useRef<WebSocket | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState<string>("");
    const navigate = useNavigate();

    // ✅ Get role from localStorage
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const userRole: "client" | "lawyer" = user.role || "client";

    useEffect(() => {
        console.log("User loaded from localStorage:", user);
        console.log("userRole is:", userRole);
    }, []);

    useEffect(() => {
        ws.current = new WebSocket("wss://legal-ai-assistant-1.onrender.com/ws/chat");

        ws.current.onmessage = (event: MessageEvent) => {
            const message = event.data;

            // ✅ Format bot message before displaying
            const formattedMessage = formatBotMessage(message);

            setMessages((prev) => [...prev, { sender: "bot", text: formattedMessage }]);
        };

        ws.current.onerror = (err) => {
            console.error("WebSocket error:", err);
        };

        return () => {
            ws.current?.close();
        };
    }, []);

    const sendMessage = () => {
        if (!input.trim() || !ws.current) return;

        const payload = `[${userRole.toUpperCase()}] ${input}`;
        console.log("userRole is:", userRole);
        console.log("Payload sent:", payload);

        ws.current.send(
            JSON.stringify({
                message: payload,
                sender: userRole === "lawyer" ? "LAWYER" : "CLIENT",
            })
        );

        setMessages((prev) => [...prev, { sender: "user", text: input }]);
        setInput(""); // clear input
    };

    // ✅ تنسيق نص البوت
    const formatBotMessage = (text: string) => {
        return text
            .replace(/\\n/g, "<br/>")
            .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
            .replace(/\*(.*?)<br\/>/g, "• $1<br/>");
    };

    return (
        <div className="flex flex-col h-screen">
            {/* Header */}
            <div className="flex items-center p-4 bg-yellow-500 text-white">
                <FaArrowLeft className="cursor-pointer mr-4" onClick={() => navigate(-1)} />
                <h2 className="text-xl font-bold">Chat AI</h2>
            </div>

            {/* Chat Body */}
            <div className="flex flex-col flex-1 overflow-y-auto p-4 bg-gray-100">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`mb-2 max-w-[75%] px-4 py-2 rounded-lg ${msg.sender === "user"
                                ? "bg-green-200 self-end text-right"
                                : "bg-gray-300 self-start text-left"
                            }`}
                    >
                        {msg.sender === "bot" ? (
                            <div dangerouslySetInnerHTML={{ __html: msg.text }} />
                        ) : (
                            msg.text
                        )}
                    </div>
                ))}
            </div>

            {/* Input */}
            <div className="flex p-4 border-t border-gray-300 bg-white">
                <input
                    type="text"
                    className="flex-1 border border-gray-300 rounded-lg px-4 py-2 mr-2 focus:outline-none"
                    placeholder="Type your message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                />
                <button
                    className="bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600 transition"
                    onClick={sendMessage}
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default WebSocketChat;
