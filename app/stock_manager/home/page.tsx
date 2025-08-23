"use client";

import {
  LayoutDashboard,
  Package,
  FileText,
  Settings,
  Headphones,
  LogOut,
  Bell,
  AlertTriangle,
  Clock,
  Search,
  Plus,
  Minus,
  PlusCircle
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../../store/store";

export default function Dashboard() {
  const dashboard = useSelector((state: RootState) => state.dashboard);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAction, setSelectedAction] = useState<"receive" | "issue" | "adjust" | "count" | null>(null);
  const [formData, setFormData] = useState({ productName: "", quantity: 0, notes: "", supplier: "", batch: "", reason: "" });
  const [error, setError] = useState<string | null>(null);

  const handleQuickAction = (action: "receive" | "issue" | "adjust" | "count") => {
    setSelectedAction(action);
    setFormData({ productName: "", quantity: 0, notes: "", supplier: "", batch: "", reason: "" });
    setError(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAction(null);
    setFormData({ productName: "", quantity: 0, notes: "", supplier: "", batch: "", reason: "" });
    setError(null);
  };

  const validateForm = () => {
    if (!formData.productName.trim()) {
      setError("Product name is required.");
      return false;
    }
    if (selectedAction !== "count" && formData.quantity <= 0) {
      setError("Quantity must be greater than 0.");
      return false;
    }
    if (selectedAction === "issue" && formData.quantity > 100) {
      setError("Issued quantity cannot exceed 100.");
      return false;
    }
    if (selectedAction === "receive" && !formData.supplier.trim()) {
      setError("Supplier is required for receiving stock.");
      return false;
    }
    setError(null);
    return true;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted:", { action: selectedAction, ...formData });
      handleCloseModal();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "quantity" ? parseInt(value) || 0 : value,
    }));
  };

  return (
    <div className="flex h-screen">
      {/* sidebar */}
      <aside className="w-64 bg-white shadow-sm flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-normal h-20">
            <Image src="/logo.png" alt="Logo" width={80} height={80} />
          </div>

          <nav className="mt-6">
            <ul className="space-y-2 px-4">
              <li>
                <Link
                  href="/stock_manager/home"
                  className="flex items-center space-x-3 bg-[var(--primary)] rounded-lg px-3 py-2 text-white"
                >
                  <LayoutDashboard size={20} />
                  <span>Dashboard</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/stock_manager/inventory"
                  className="flex items-center space-x-3 hover:bg-[var(--input-field)] rounded-lg px-3 py-2"
                >
                  <Package size={20} />
                  <span>Inventory</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/stock_manager/reports"
                  className="flex items-center space-x-3 hover:bg-[var(--input-field)] rounded-lg px-3 py-2"
                >
                  <FileText size={20} />
                  <span>Reports</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="px-4 pb-6 space-y-3">
          <Link href="/stock_manager/settings" className="flex items-center space-x-3 hover:bg-[var(--input-field)] rounded-lg px-3 py-2 cursor-pointer">
            <Settings size={20} />
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

     
      <div className="flex flex-col flex-1">
        {/* header */}
        <div className="flex justify-between items-center bg-white px-6 py-4 border-b h-50 border-gray-200">
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
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">Dashboard</h1>
              <p className="text-gray-500">Monitor stock levels</p>
            </div>
            <button className="px-5 py-2 bg-[var(--primary)] text-white rounded-lg shadow hover:opacity-90">
              Generate Report
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="bg-white rounded-2xl shadow p-6 flex items-center justify-between">
              <div>
                <h2 className="text-gray-500 font-medium">Total stock items</h2>
                <p className="text-3xl font-bold text-gray-800">1247</p>
                <p className="text-gray-400 text-sm">~ this week</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Package className="h-6 w-6 text-blue-600" />
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow p-6 flex items-center justify-between">
              <div>
                <h2 className="text-gray-500 font-medium">Low Stock Items</h2>
                <p className="text-3xl font-bold text-red-600">18</p>
                <p className="text-gray-400 text-sm">~ since yesterday</p>
              </div>
              <div className="p-3 bg-red-100 rounded-full">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow p-6 flex items-center justify-between">
              <div>
                <h2 className="text-gray-500 font-medium">Expiring Soon</h2>
                <p className="text-3xl font-bold text-orange-600">12</p>
                <p className="text-gray-400 text-sm">~ within 60 days</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-full">
                <Clock className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </div>

        
          <div className="grid grid-cols-2 gap-6 mt-6">
            <div className="bg-white shadow rounded-lg p-5 border">
              <h2 className="font-semibold text-lg mb-4">Urgent Actions Required</h2>
              <ul className="space-y-4">
                <li className="flex items-center justify-between bg-green-50 rounded-lg p-3">
                  <div className="flex items-center space-x-3">
                    <span className="bg-green-100 text-green-600 p-2 rounded-full">
                      <AlertTriangle size={20} />
                    </span>
                    <div>
                      <p className="font-semibold">Paracetamol 500mg</p>
                      <p className="text-sm text-gray-500">Reorder Required, Current: 15, PAR002</p>
                    </div>
                  </div>
                  <button className="px-3 py-1 bg-[var(--primary)] text-white rounded-lg text-sm">View</button>
                </li>
                <li className="flex items-center justify-between bg-yellow-50 rounded-lg p-3">
                  <div className="flex items-center space-x-3">
                    <span className="bg-yellow-100 text-yellow-600 p-2 rounded-full">
                      <AlertTriangle size={20} />
                    </span>
                    <div>
                      <p className="font-semibold">Amoxicillin 250mg</p>
                      <p className="text-sm text-gray-500">Reorder Required, Current: 8, PAR003</p>
                    </div>
                  </div>
                  <button className="px-3 py-1 bg-[var(--primary)] text-white rounded-lg text-sm">View</button>
                </li>
                <li className="flex items-center justify-between bg-orange-50 rounded-lg p-3">
                  <div className="flex items-center space-x-3">
                    <span className="bg-orange-100 text-orange-600 p-2 rounded-full">
                      <Clock size={20} />
                    </span>
                    <div>
                      <p className="font-semibold">Ibuprofen 400mg</p>
                      <p className="text-sm text-gray-500">Expires in 5 days, Current: 45, PAR006</p>
                    </div>
                  </div>
                  <button className="px-3 py-1 bg-[var(--primary)] text-white rounded-lg text-sm">View</button>
                </li>
              </ul>
            </div>

            <div className="bg-white shadow rounded-lg p-5 border">
              <h2 className="font-semibold text-lg mb-4">Quick Actions</h2>
              <div className="space-y-4">
                <button onClick={() => handleQuickAction("receive")} className="w-full flex items-center justify-start px-3 py-2 gap-5 bg-[var(--primary)] text-white rounded-lg text-sm">
                  <Plus size={16} /> Receive Stock
                </button>
                <button onClick={() => handleQuickAction("issue")} className="w-full flex items-center justify-start px-3 py-2 gap-5 bg-white text-[var(--primary)] border border-[var(--primary)] rounded-lg text-sm">
                  <Minus size={16} /> Issue
                </button>
                <button onClick={() => handleQuickAction("adjust")} className="w-full flex items-center justify-start px-3 py-2 gap-5 bg-white text-[var(--primary)] border border-[var(--primary)] rounded-lg text-sm">
                  <PlusCircle size={16} /> Stock Adjustment
                </button>
                <button onClick={() => handleQuickAction("count")} className="w-full flex items-center justify-start px-3 py-2 gap-5 bg-white text-[var(--primary)] border border-[var(--primary)] rounded-lg text-sm">
                  <Package size={16} /> Stock Count
                </button>
              </div>
            </div>
          </div>
        </main>

      
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[40rem]">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">
                  {selectedAction === "receive" ? "Receive Stock" : selectedAction === "issue" ? "Issue Stock" : selectedAction === "adjust" ? "Stock Adjustment" : "Stock Count"}
                </h2>
                <button onClick={handleCloseModal} className="text-gray-500 hover:text-gray-700">
                  &times;
                </button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Product Name</label>
                    <input
                      type="text"
                      name="productName"
                      value={formData.productName}
                      onChange={handleChange}
                      placeholder="Select or enter product name"
                      className="mt-1 p-2 w-full border rounded-lg"
                    />
                  </div>
                  {selectedAction === "issue" && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Issued Quantity</label>
                        <input
                          type="number"
                          name="quantity"
                          value={formData.quantity}
                          onChange={handleChange}
                          min={1}
                          max={100}
                          className="mt-1 p-2 w-full border rounded-lg"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Reason for Issue</label>
                        <select
                          name="reason"
                          value={formData.reason}
                          onChange={handleChange}
                          className="mt-1 p-2 w-full border rounded-lg"
                          required
                        >
                          <option value="">Select reason</option>
                          <option value="Dispense">Dispense to Patient</option>
                          <option value="Transfer">Transfer to Another Location</option>
                          <option value="Loss">Loss/Damage</option>
                        </select>
                      </div>
                    </>
                  )}
                  {selectedAction === "receive" && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Received Quantity</label>
                        <input
                          type="number"
                          name="quantity"
                          value={formData.quantity}
                          onChange={handleChange}
                          min={1}
                          className="mt-1 p-2 w-full border rounded-lg"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Supplier</label>
                        <input
                          type="text"
                          name="supplier"
                          value={formData.supplier}
                          onChange={handleChange}
                          placeholder="Enter supplier name"
                          className="mt-1 p-2 w-full border rounded-lg"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Batch Number</label>
                        <input
                          type="text"
                          name="batch"
                          value={formData.batch}
                          onChange={handleChange}
                          placeholder="Enter batch number"
                          className="mt-1 p-2 w-full border rounded-lg"
                        />
                      </div>
                    </>
                  )}
                  {selectedAction === "adjust" && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Adjusted Quantity</label>
                      <input
                        type="number"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        min={-100}
                        max={100}
                        className="mt-1 p-2 w-full border rounded-lg"
                        required
                      />
                    </div>
                  )}
                  {selectedAction === "count" && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Counted Quantity</label>
                      <input
                        type="number"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        min={0}
                        className="mt-1 p-2 w-full border rounded-lg"
                        required
                      />
                    </div>
                  )}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Notes</label>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      placeholder="Enter any additional notes..."
                      className="mt-1 p-2 w-full border rounded-lg"
                      rows={3}
                    ></textarea>
                  </div>
                  {error && <p className="text-red-500 text-sm">{error}</p>}
                  <div className="flex justify-end space-x-4">
                    <button
                      type="button"
                      onClick={handleCloseModal}
                      className="px-4 py-2 border rounded-lg"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[var(--primary)] text-white rounded-lg"
                    >
                      {selectedAction === "receive" ? "Receive Stock" : selectedAction === "issue" ? "Issue Stock" : selectedAction === "adjust" ? "Adjust Stock" : "Save Count"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}