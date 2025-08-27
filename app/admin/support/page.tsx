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
      <aside className="w-64 bg-white shadow-sm flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-start h-20 px-4">
            <Image src="/logo.png" alt="Logo" width={80} height={80} />
          </div>
          <nav className="mt-6">
            <ul className="space-y-2 px-4">
              <li>
                <Link
                  href="/admin/home"
                  className="flex items-center space-x-3 hover:bg-[var(--input-field)] rounded-lg px-3 py-2"
                >
                  <LayoutDashboard size={20} />
                  <span>Dashboard</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/inventory"
                  className="flex items-center space-x-3 hover:bg-[var(--input-field)] rounded-lg px-3 py-2"
                >
                  <Package size={20} />
                  <span>Inventory</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/reports"
                  className="flex items-center space-x-3 hover:bg-[var(--input-field)] rounded-lg px-3 py-2"
                >
                  <FileText size={20} />
                  <span>Reports</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/suppliers"
                  className="flex items-center space-x-3 hover:bg-[var(--input-field)] rounded-lg px-3 py-2"
                >
                  <Truck size={20} />
                  <span>Suppliers</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/invoices"
                  className="flex items-center space-x-3 hover:bg-[var(--input-field)] rounded-lg px-3 py-2"
                >
                  <CreditCard size={20} />
                  <span>Invoices</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/payments"
                  className="flex items-center space-x-3 hover:bg-[var(--input-field)] rounded-lg px-3 py-2"
                >
                  <DollarSign size={20} />
                  <span>Payments</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/users"
                  className="flex items-center space-x-3 hover:bg-[var(--input-field)] rounded-lg px-3 py-2"
                >
                  <Users size={20} />
                  <span>Users</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="px-4 pb-6 space-y-3">
  <Link href="/admin/settings" className="flex items-center space-x-3 hover:bg-[var(--input-field)] rounded-lg px-3 py-2 cursor-pointer">
    <Settings size={20} />
    <span>Settings</span>
  </Link>
  <Link href="/admin/support" className="flex items-center text-white  space-x-3 bg-[var(--primary)] rounded-lg px-3 py-2 cursor-pointer">
    <Headphones size={20}  className="text-white"/>
    <span>Support</span>
  </Link>
  <Link href="/admin/logout" className="flex items-center space-x-3 hover:bg-red-100 text-red-600 rounded-lg px-3 py-2 cursor-pointer">
    <LogOut size={20} />
    <span>Logout</span>
  </Link>
</div>
      </aside>

     
      <div className="flex flex-col flex-1" style={{ background: "var(--background)" }}>
        {/* header */}
        <header className="flex justify-between items-center bg-white px-6 py-4 border-b border-gray-200">
          <div className="relative w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 w-full rounded-lg bg-[var(--input-field)] outline-none focus:ring-2 focus:ring-[var(--primary)]"
            />
          </div>
          <div className="flex items-center space-x-4">
            <Bell size={22} className="cursor-pointer" />
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 relative">
                <Image
                  src="/profile.jpg"
                  alt="User profile"
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              <div>
                <p className="text-sm font-semibold">Dr. Dylan</p>
                <p className="text-xs text-gray-500">Pharmacist</p>
              </div>
            </div>
          </div>
        </header>

      
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
