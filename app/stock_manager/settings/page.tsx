"use client";

import {
  LayoutDashboard,
  Package,
  FileText,
  Users,
  Truck,
  CreditCard,
  Settings,
  Headphones,
  LogOut,
  Bell,
  Search,
  Database,
  RotateCcw,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const SidebarNavItem = ({
  href,
  icon: Icon,
  label,
  active = false,
}: {
  href: string;
  icon: React.ElementType;
  label: string;
  active?: boolean;
}) => (
  <li>
    <Link
      href={href}
      className={`flex items-center space-x-3 rounded-lg px-3 py-2 ${
        active ? "bg-[var(--primary)] text-white" : "hover:bg-[var(--input-field)]"
      }`}
    >
      <Icon size={20} />
      <span>{label}</span>
    </Link>
  </li>
);

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<"general" | "backup">("general");
  const [backupToggle, setBackupToggle] = useState(false);

  return (
    <div className="flex h-screen">
      {/* sidebar */}
      <aside className="w-64 bg-white shadow-sm flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-start h-20">
            <Image src="/logo.png" alt="Logo" width={80} height={80} />
          </div>
          <nav className="mt-6">
            <ul className="space-y-2 px-4">
              <SidebarNavItem href="/stock_manager/home" icon={LayoutDashboard} label="Dashboard" />
              <SidebarNavItem href="/stock_manager/inventory" icon={Package} label="Inventory" />
              <SidebarNavItem href="/stock_manager/reports" icon={FileText} label="Reports" />
              
            </ul>
          </nav>
        </div>
         <div className="px-4 pb-6 space-y-3">
  <Link href="/stock_manager/settings" className="flex items-center space-x-3  bg-[var(--primary)] text-white rounded-lg px-3 py-2 cursor-pointer">
    <Settings size={20} className="text-white" />
    <span>Settings</span>
  </Link>
  <Link href="/stock_manager/support" className="flex items-center space-x-3 hover:bg-[var(--input-field)] rounded-lg px-3 py-2 cursor-pointer">
    <Headphones size={20} />
    <span>Support</span>
  </Link>
  <Link href="/stock_manager/logout" className="flex items-center space-x-3 hover:bg-red-100 text-red-600 rounded-lg px-3 py-2 cursor-pointer">
    <LogOut size={20} />
    <span>Logout</span>
  </Link>
</div>
      </aside>

      
      <div className="flex flex-col flex-1" style={{ background: "var(--background)" }}>
        {/* header */}
        <header className="flex justify-between items-center bg-white px-6 py-4 border-b border-gray-200">
          <div className="relative w-72">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 w-full rounded-lg bg-[var(--input-field)] outline-none focus:ring-2 focus:ring-[var(--primary)]"
              aria-label="Search settings"
            />
          </div>
          <div className="flex items-center space-x-4">
            <Bell size={22} className="cursor-pointer text-red-500" aria-label="Notifications" />
            <div className="flex items-center space-x-2">
              <Image
                src="/profile.jpg"
                alt="User profile"
                className="w-10 h-10 rounded-full"
                width={40}
                height={40}
              />
              <div>
                <p className="text-sm font-semibold">Dr. Dylan</p>
                <p className="text-xs text-gray-500">Pharmacist</p>
              </div>
            </div>
          </div>
        </header>

        {/* body */}
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-2xl font-extrabold">Settings</h1>
              <p className="text-gray-500 -mt-1">Configure Systems preferences, alerts and security</p>
            </div>
            <button
              className="px-4 py-2 rounded-lg bg-[var(--primary)] text-white hover:opacity-90 shadow"
              aria-label="Save changes"
            >
              Save Changes
            </button>
          </div>

         
          <div className="bg-white px-6 py-4 border-b border-gray-200">
            <div className="flex space-x-4 mb-4">
              <button
                className={`px-4 py-2 rounded-lg ${activeTab === "general" ? "bg-gray-200" : "bg-gray-100"}`}
                onClick={() => setActiveTab("general")}
                aria-label="View general settings"
              >
                General
              </button>
              <button
                className={`px-4 py-2 rounded-lg ${activeTab === "backup" ? "bg-gray-200" : "bg-gray-100"}`}
                onClick={() => setActiveTab("backup")}
                aria-label="View backup settings"
              >
                Backup
              </button>
            </div>
          </div>

         
          {activeTab === "general" ? (
            <div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mt-4">
                <h2 className="text-lg font-semibold mb-5">Personal Information</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                      type="text"
                      value="John Doe"
                      className="mt-1 p-2 w-full border rounded-md bg-gray-100 focus:ring-2 focus:ring-[var(--primary)]"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email Address</label>
                    <input
                      type="email"
                      value="info@byoo.rw"
                      className="mt-1 p-2 w-full border rounded-md bg-gray-100 focus:ring-2 focus:ring-[var(--primary)]"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                    <input
                      type="text"
                      value="+250 788 123 456"
                      className="mt-1 p-2 w-full border rounded-md bg-gray-100 focus:ring-2 focus:ring-[var(--primary)]"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Default Currency</label>
                    <select
                      className="mt-1 p-2 w-full border rounded-md bg-gray-100 focus:ring-2 focus:ring-[var(--primary)]"
                      defaultValue="Rwandan Franc (RWF)"
                    >
                      <option>Rwandan Franc (RWF)</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mt-4">
                <h2 className="text-lg font-semibold mb-5">Regional Settings</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Language</label>
                    <select
                      className="mt-1 p-2 w-full border rounded-md bg-gray-100 focus:ring-2 focus:ring-[var(--primary)]"
                      defaultValue="English"
                    >
                      <option>English</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Timezone</label>
                    <select
                      className="mt-1 p-2 w-full border rounded-md bg-gray-100 focus:ring-2 focus:ring-[var(--primary)]"
                      defaultValue="Africa/Kigali (CAT)"
                    >
                      <option>Africa/Kigali (CAT)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Date Format</label>
                    <select
                      className="mt-1 p-2 w-full border rounded-md bg-gray-100 focus:ring-2 focus:ring-[var(--primary)]"
                      defaultValue="DD/MM/YYYY"
                    >
                      <option>DD/MM/YYYY</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mt-4">
              <h2 className="text-lg font-semibold mb-5">Backup Status</h2>
              <p className="text-gray-700">Last Backup: August 22, 2025, 1:30 PM CAT</p>
              <p className="text-gray-700 mt-2">Status: Active</p>
              <button
                className="mt-4 px-4 py-2 rounded-lg bg-[var(--primary)] text-white hover:opacity-90 shadow"
                aria-label="Initiate backup"
              >
                Initiate Backup
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}