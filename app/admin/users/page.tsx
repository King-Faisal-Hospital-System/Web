"use client";

import {
  Package,
  FileText,
  Users,
  Truck,
  CreditCard,
  Search,
  Bell,
  Settings,
  Headphones,
  LogOut,
  DollarSign,
  LayoutDashboard
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { fetchAllUsers, verifyUser, User } from "@/services/user.services";
import { useLanguageContext } from "../../../components/LanguageProvider";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export default function UserManagementPage() {
  const [users, setUsers] = useState<User[]>([]);
  const { t } = useLanguageContext();

  const loadUsers = async () => {
    try {
      const data = await fetchAllUsers(); 
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleAction = async (userId: string, action: "approve" | "reject") => {
    try {
      await verifyUser(userId, action);
      loadUsers();
    } catch (error) {
      console.error(`Error ${action} user:`, error);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar/>

    
      <div className="flex flex-col flex-1">
        {/* header */}
        <Header/>

        {/* body */}
        <main className="flex-1 p-6 overflow-y-auto">
          <div>
            <h1 className="text-2xl font-extrabold">User Management</h1>
            <p className="text-gray-500 -mt-1">Manage users</p>
          </div>

       
          <div className="bg-white p-6 mt-6 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-lg font-semibold mb-5">All Users</h2>
            <table className="w-full text-left">
              <thead>
                <tr className="text-xs text-gray-500">
                  <th className="py-3 px-4">User</th>
                  <th className="py-3 px-4">Date Joined</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user._id} className="border-t border-gray-100">
                    <td className="py-4 px-4">{user.fullname}</td>
                    <td className="py-4 px-4">{new Date(user.createdAt).toLocaleDateString()}</td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 rounded-md text-white text-xs ${user.isVerified ? "bg-green-600" : "bg-orange-500"}`}>
                        {user.isVerified ? "APPROVED" : "PENDING"}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      {!user.isVerified ? (
                        <button
                          onClick={() => handleAction(user._id, "approve")}
                          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:opacity-75"
                        >
                          Approve
                        </button>
                      ) : (
                        <button
                          onClick={() => handleAction(user._id, "reject")}
                          className="px-4 py-2 bg-orange-500 text-white rounded-md hover:opacity-75"
                        >
                          Revoke
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}
