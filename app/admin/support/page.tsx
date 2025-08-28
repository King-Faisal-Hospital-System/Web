"use client";

import {
  Headphones,
  LogOut,
  LayoutDashboard,
  Package,
  FileText,
  Users,
  Truck,
  CreditCard,
  Settings,
  DollarSign,
  Search,
  Bell,
  Send,
  Bot,
  User as UserIcon,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { useLanguageContext } from "../../../components/LanguageProvider";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export default function SupportPage() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<{ from: "bot" | "user"; text: string }[]>([
    { from: "bot", text: "Hi! I'm your AI assistant. How can I help you today?" },
  ]);
  const { t } = useLanguageContext();

  const handleSend = () => {
    if (!message.trim()) return;
    setMessages([...messages, { from: "user", text: message }]);
    setMessage("");
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "Got it 👍 I'm processing your request..." },
      ]);
    }, 800);
  };

  return (
    <div className="flex h-screen">
      {/* sidebar */}
      <Sidebar/>

     
      <div className="flex flex-col flex-1" style={{ background: "var(--background)" }}>
        {/* header */}
        <Header/>

        <main className="flex-1 flex flex-col p-6">
          <div className="flex-1 overflow-y-auto space-y-4">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex items-start space-x-2 ${
                  msg.from === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.from === "bot" && (
                  <div className="p-2 bg-gray-100 rounded-full">
                    <Bot size={20} className="text-gray-600" />
                  </div>
                )}
                <div
                  className={`px-4 py-2 rounded-lg max-w-xs ${
                    msg.from === "user"
                      ? "bg-[var(--primary)] text-white"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {msg.text}
                </div>
                {msg.from === "user" && (
                  <div className="p-2 bg-[var(--primary)] rounded-full text-white">
                    <UserIcon size={20} />
                  </div>
                )}
              </div>
            ))}
          </div>

         
          <div className="mt-4 flex space-x-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-sm"
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button
              onClick={handleSend}
              className="bg-[var(--primary)] text-white p-2 rounded-lg hover:bg-[var(--primary-dark)] transition-colors duration-200"
            >
              <Send size={20} />
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
