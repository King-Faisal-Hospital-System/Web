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
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Clock,
  Search,
  MoreHorizontal,
  Eye,
  Pencil,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { issueStock, recordReceipt } from "@/store/slices/inventorySlice";

export default function InventoryPage() {
  const [openMenu, setOpenMenu] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const medicines = useSelector(
    (state: RootState) => state.inventory.medicines
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="flex h-screen">
     
      <aside className="w-64 bg-white shadow-sm flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-normal h-20">
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
                  className="flex items-center space-x-3 bg-[var(--primary)] text-white rounded-lg px-3 py-2"
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
                  <Users size={20} />
                  <span>Invoices</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/payments"
                  className="flex items-center space-x-3 hover:bg-[var(--input-field)] rounded-lg px-3 py-2"
                >
                  <CreditCard size={20} />
                  <span>Payments</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="px-4 pb-6 space-y-3">
          <div className="flex items-center space-x-3 hover:bg-[var(--input-field)] rounded-lg px-3 py-2 cursor-pointer">
            <Settings size={20} />
            <span>Settings</span>
          </div>
          <div className="flex items-center space-x-3 hover:bg-[var(--input-field)] rounded-lg px-3 py-2 cursor-pointer">
            <Headphones size={20} />
            <span>Support</span>
          </div>
          <div className="flex items-center space-x-3 hover:bg-red-100 text-red-600 rounded-lg px-3 py-2 cursor-pointer">
            <LogOut size={20} />
            <span>Logout</span>
          </div>
        </div>
      </aside>

     
      <div className="flex flex-col flex-1">
        {/* header */}
        <div className="flex justify-between items-center bg-white px-6 py-4 border-b h-50 border-gray-200">
          <div className="relative w-72">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 w-full rounded-lg bg-[var(--input-field)] outline-none focus:ring-2 focus:ring-[var(--primary)]"
            />
          </div>

          <div className="flex items-center space-x-4">
            <Bell size={22} className="cursor-pointer" />
            <div className="flex items-center space-x-2">
              <Image
                src="/profile.jpg"
                alt="User"
                className="w-10 h-10 rounded-full"
                width={80}
                height={80}
              />
              <div>
                <p className="text-sm font-semibold">Dr. Dylan</p>
                <p className="text-xs text-gray-500">Pharmacist</p>
              </div>
            </div>
          </div>
        </div>

        {/* body */}
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold">Inventory Management</h1>
              <p className="text-gray-500">
                Manage your stock levels and track products
              </p>
            </div>
            <button className="px-5 py-2 bg-[var(--primary)] text-white rounded-lg shadow hover:opacity-90">
              Add Product
            </button>
          </div>

          <div className="space-y-4">
            {medicines.map((med) => (
              <div
                key={med.id}
                ref={menuRef}
                className="p-4 border rounded-lg relative bg-white"
              >
                <div className="absolute top-3 right-3">
                  {openMenu === med.id && (
                    <div className="absolute right-0 mt-2 w-40 bg-white border shadow-lg rounded-lg z-10">
                      <button className="flex items-center w-full px-4 py-2 text-sm hover:bg-gray-50">
                        <Eye size={16} className="mr-2" /> View Details
                      </button>
                      <button className="flex items-center w-full px-4 py-2 text-sm hover:bg-gray-50">
                        <Pencil size={16} className="mr-2" /> Edit Product
                      </button>
                      <button
                        onClick={() =>
                          dispatch(recordReceipt({ id: med.id, quantity: 100 }))
                        }
                        className="flex items-center w-full px-4 py-2 text-sm hover:bg-gray-50"
                      >
                        <TrendingUp size={16} className="mr-2" /> Record Receipt
                      </button>
                      <button
                        onClick={() =>
                          dispatch(issueStock({ id: med.id, quantity: 50 }))
                        }
                        className="flex items-center w-full px-4 py-2 text-sm hover:bg-gray-50"
                      >
                        <TrendingDown size={16} className="mr-2" /> Issue Stock
                      </button>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{med.name}</h3>
                  <span
                    className={`text-xs font-bold px-2 py-1 rounded ${
                      med.status === "GOOD"
                        ? "text-green-600 bg-green-100"
                        : "text-orange-600 bg-orange-100"
                    }`}
                  >
                    {med.status}
                  </span>
                </div>

                <div className="grid grid-cols-7 gap-8 text-sm mt-3">
                  <p>Batch: {med.batch}</p>
                  <p>Received: {med.received}</p>
                  <p>Issued: {med.issued}</p>
                  <p>Balance: {med.balance}</p>
                  <p>Expiry: {med.expiry}</p>
                  <p>Unit Cost: {med.unitCost} Rwf</p>
                  <button
                    onClick={() =>
                      setOpenMenu(openMenu === med.id ? null : med.id)
                    }
                    className="p-1 rounded-full"
                  >
                    <MoreHorizontal size={20} />
                  </button>
                </div>
                <p className="text-gray-700 mt-1 font-semibold">
                  Total Value: {(med.received * med.unitCost).toLocaleString()}{" "}
                  Rwf
                </p>

                {med.status === "LOW" && (
                  <div className="mt-2 bg-orange-50 border-l-4 border-orange-400 text-orange-700 p-2 text-sm rounded">
                    <AlertTriangle className="inline mr-2" size={16} />
                    Low stock level – Only {med.balance} units remaining
                    (Reorder needed)
                  </div>
                )}
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
