import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const ClientAIChat: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [messages, setMessages] = useState<{ sender: string; text: string; time?: string }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("chatMessages");
    if (saved) {
      setMessages(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    setMessages((prev) => [...prev, { sender: "You", text: input, time }]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("https://legal-ai-assistant-1.onrender.com/categorize-case", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ case_description: input }),
      });

      if (!response.ok) throw new Error("Failed to get response");

      const data = await response.json();
      const reply = data.answer || data.category || t("client_chat.defaultReply");

      setMessages((prev) => [
        ...prev,
        {
          sender: "AI",
          text: reply,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } catch (error) {
      console.error("Error sending request:", error);
      setMessages((prev) => [
        ...prev,
        {
          sender: "AI",
          text: t("client_chat.errorReply"),
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <div className="flex items-center p-4 bg-yellow-500 text-white">
        <button onClick={() => navigate(-1)} className="mr-4 text-white text-lg">←</button>
        <h2 className="text-xl font-bold">Chat AI</h2>
      </div>

      {/* Chat Body */}
      <div className="flex flex-col flex-1 overflow-y-auto p-4 bg-gray-100">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`mb-2 max-w-[75%] px-4 py-2 rounded-lg ${msg.sender === "You"
                ? "bg-green-200 self-end text-right"
                : "bg-gray-300 self-start text-left"
              }`}
          >
            {msg.text}
            <div className="text-[10px] text-gray-600 mt-1 text-right">{msg.time}</div>
          </div>
        ))}

        {loading && (
          <div className="self-start bg-gray-200 text-gray-600 italic px-4 py-2 rounded-lg text-sm">
            {t("client_chat.typing")}
          </div>
        )}
      </div>

      {/* Input */}
      <div className="flex p-4 border-t border-gray-300 bg-white">
        <input
          type="text"
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 mr-2 focus:outline-none"
          placeholder={t("client_chat.placeholder") || "اكتب سؤالك القانوني هنا..."}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          className="bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600 transition"
          onClick={handleSend}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ClientAIChat;
