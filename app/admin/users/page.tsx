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
      <aside className="w-64 bg-white shadow-sm flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-normal h-20">
            <Image src="/logo.png" alt="Logo" width={80} height={80} />
          </div>

          <nav className="mt-6">
            <ul className="space-y-2 px-4">
              <li>
                <Link href="/admin/home" className="flex items-center space-x-3 hover:bg-[var(--input-field)] rounded-lg px-3 py-2">
                  <LayoutDashboard size={20} />
                  <span>Dashboard</span>
                </Link>
              </li>
              <li>
                <Link href="/admin/inventory" className="flex items-center space-x-3 hover:bg-[var(--input-field)] rounded-lg px-3 py-2">
                  <Package size={20} />
                  <span>Inventory</span>
                </Link>
              </li>
              <li>
                <Link href="/admin/reports" className="flex items-center space-x-3 hover:bg-[var(--input-field)] rounded-lg px-3 py-2">
                  <FileText size={20} />
                  <span>Reports</span>
                </Link>
              </li>
              <li>
                <Link href="/admin/suppliers" className="flex items-center space-x-3 hover:bg-[var(--input-field)] rounded-lg px-3 py-2">
                  <Truck size={20} />
                  <span>Suppliers</span>
                </Link>
              </li>
              <li>
                <Link href="/admin/invoices" className="flex items-center space-x-3 hover:bg-[var(--input-field)] rounded-lg px-3 py-2">
                  <DollarSign size={20} />
                  <span>Invoices</span>
                </Link>
              </li>
              <li>
                <Link href="/admin/payments" className="flex items-center space-x-3 hover:bg-[var(--input-field)] rounded-lg px-3 py-2">
                  <CreditCard size={20} />
                  <span>Payments</span>
                </Link>
              </li>
              <li>
                <Link href="/admin/users" className="flex items-center space-x-3 bg-[var(--primary)] text-white rounded-lg px-3 py-2">
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
          <Link href="/admin/support" className="flex items-center space-x-3 hover:bg-[var(--input-field)] rounded-lg px-3 py-2 cursor-pointer">
            <Headphones size={20} />
            <span>Support</span>
          </Link>
          <Link href="/admin/logout" className="flex items-center space-x-3 hover:bg-red-100 text-red-600 rounded-lg px-3 py-2 cursor-pointer">
            <LogOut size={20} />
            <span>Logout</span>
          </Link>
        </div>
      </aside>

    
      <div className="flex flex-col flex-1">
        {/* header */}
        <div className="flex justify-between items-center bg-white px-6 py-4 border-b border-gray-200">
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
              <Image src="/profile.jpg" alt="User" className="w-10 h-10 rounded-full" width={40} height={40} />
              <div>
                <p className="text-sm font-semibold">Dr. Dylan</p>
                <p className="text-xs text-gray-500">Pharmacist</p>
              </div>
            </div>
          </div>
        </div>

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
