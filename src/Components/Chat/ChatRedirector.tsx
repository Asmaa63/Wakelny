// Components/Chat/ChatRedirector.tsx

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ChatRedirector: React.FC = () => {
  const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        console.log("User from localStorage:", user); // ✅ شوفي دا بيطبع إيه
        const role = user.role;

        if (role === "lawyer") {
            console.log("Navigating to /chat/lawyer");
            navigate("/chat/lawyer");
        } else if (role === "client") {
            console.log("Navigating to /chat/client");
            navigate("/chat/client");
        } else {
            console.log("Navigating to /login");
            navigate("/login");
        }
    }, []);

  return null; // مش محتاجين UI هنا
};

export default ChatRedirector;
