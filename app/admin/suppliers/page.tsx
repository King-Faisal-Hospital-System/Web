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
  MoreHorizontal,
  Plus,
  Eye,
  DollarSign
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Supplier {
  id: string;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  orders: number;
  totalValue: string;
  status: "active" | "pending";
}

interface PurchaseOrder {
  id: string;
  supplier: string;
  product: string;
  amount: string;
  date: string;
  status: string;
}

const suppliersData: Supplier[] = [
  {
    id: "1",
    name: "PharmaSupply Ltd",
    contactPerson: "Alice Uwimana",
    email: "pharma@supply.rw",
    phone: "+250 788 123 456",
    orders: 5,
    totalValue: "2,500,000 RWF",
    status: "active",
  },
  {
    id: "2",
    name: "MediHealth Ltd",
    contactPerson: "Eric Nkurunziza",
    email: "medihealth@supply.rw",
    phone: "+250 788 654 321",
    orders: 3,
    totalValue: "1,200,000 RWF",
    status: "active",
  },
  {
    id: "3",
    name: "LifeCare Ltd",
    contactPerson: "Grace Mukamana",
    email: "lifecare@supply.rw",
    phone: "+250 789 123 987",
    orders: 7,
    totalValue: "3,800,000 RWF",
    status: "pending",
  },
];

const purchaseOrdersData: PurchaseOrder[] = [
  {
    id: "PO-2024-001",
    supplier: "PharmaSupply Ltd",
    product: "Paracetamol 500mg (1000)",
    amount: "250,000 RWF",
    date: "2024-01-25",
    status: "Delivered",
  },
  {
    id: "PO-2024-002",
    supplier: "MediHealth Ltd",
    product: "Ibuprofen 200mg (500)",
    amount: "150,000 RWF",
    date: "2024-02-02",
    status: "Pending",
  },
];

export default function SuppliersPage() {
  const [openSupplierId, setOpenSupplierId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"suppliers" | "purchaseOrders">(
    "suppliers"
  );
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleMenuToggle = (id: string) => {
    setOpenSupplierId(openSupplierId === id ? null : id);
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".supplier-menu") && !target.closest(".menu-button")) {
        setOpenSupplierId(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const totalSuppliers = suppliersData.length;
  const activeSuppliers = suppliersData.filter((s) => s.status === "active").length;
  const pendingApprovals = suppliersData.filter((s) => s.status === "pending").length;

  //  filtering purchase orders 
  const filteredOrders = purchaseOrdersData.filter(
    (order) =>
      (statusFilter === "All" || order.status === statusFilter) &&
      (order.id.toLowerCase().includes(search.toLowerCase()) ||
        order.supplier.toLowerCase().includes(search.toLowerCase()) ||
        order.product.toLowerCase().includes(search.toLowerCase()))
  );

  const handleAddSupplier = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    setIsModalOpen(false);
  };

  const paymentTerms = ["15 Days", "30 Days", "45 Days"];

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
                  className="flex items-center space-x-3 bg-[var(--primary)] text-white rounded-lg px-3 py-2"
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

              <li>
                <Link
                  href="/admin/users"
                  className="flex items-center space-x-3 hover:bg-[var(--input-field)] rounded-lg px-3 py-2"
                >
                  <DollarSign size={20} />
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
                width={40}
                height={40}
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
         
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-2xl font-extrabold">Supplier Management</h1>
              <p className="text-gray-500 -mt-1">Manage suppliers and orders</p>
            </div>
            <button onClick={handleAddSupplier} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--primary)] text-white hover:opacity-90 shadow">
              <Plus size={18} />
              <span>Add Supplier</span>
            </button>
          </div>

        
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <p className="text-gray-500 text-sm mb-1">Total Suppliers</p>
              <p className="text-xl font-bold tracking-tight">{totalSuppliers}</p>
            </div>

            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <p className="text-gray-500 text-sm mb-1">Active Suppliers</p>
              <p className="text-xl font-bold tracking-tight">{activeSuppliers}</p>
            </div>

            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <p className="text-gray-500 text-sm mb-1">Pending Approvals</p>
              <p className="text-xl font-bold tracking-tight text-orange-500">
                {pendingApprovals}
              </p>
            </div>
          </div>

        
          <div className="flex space-x-2 border border-gray-300 rounded-md w-fit mb-6">
            <button
              onClick={() => setActiveTab("suppliers")}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                activeTab === "suppliers"
                  ? "bg-white shadow border"
                  : "bg-transparent"
              }`}
            >
              Suppliers
            </button>
            <button
              onClick={() => setActiveTab("purchaseOrders")}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                activeTab === "purchaseOrders"
                  ? "bg-white shadow border"
                  : "bg-transparent"
              }`}
            >
              Purchase Orders
            </button>
          </div>

         
          {activeTab === "suppliers" ? (
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h2 className="text-lg font-semibold mb-5">Suppliers</h2>
              <table className="w-full text-left">
                <thead>
                  <tr className="text-xs text-gray-500">
                    <th className="py-2">Supplier</th>
                    <th className="py-2">Contact Person</th>
                    <th className="py-2">Contact Info</th>
                    <th className="py-2">Orders</th>
                    <th className="py-2">Total Value</th>
                    <th className="py-2 text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {suppliersData.map((s) => (
                    <tr key={s.id} className="border-t border-gray-100">
                      <td className="py-4">
                        <p className="font-semibold">{s.name}</p>
                        <p className="text-xs text-gray-500">TIN: 123456789</p>
                      </td>
                      <td className="py-4">{s.contactPerson}</td>
                      <td className="py-4 text-sm">
                        <p className="text-[var(--primary)] font-medium">
                          {s.email}
                        </p>
                        <p>{s.phone}</p>
                      </td>
                      <td className="py-4">{s.orders}</td>
                      <td className="py-4">{s.totalValue}</td>
                      <td className="py-4 text-right relative">
                        <button
                          onClick={() => handleMenuToggle(s.id)}
                          className="menu-button inline-flex items-center justify-center h-8 w-8 rounded-full hover:bg-gray-100"
                        >
                          <MoreHorizontal size={18} />
                        </button>
                        {openSupplierId === s.id && (
                          <div className="supplier-menu absolute right-0 mt-2 w-36 bg-white border border-gray-200 shadow-lg rounded-lg overflow-hidden z-10">
                            <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50">
                              View
                            </button>
                            <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50">
                              Edit
                            </button>
                            <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50">
                              Create Order
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center gap-3 mb-5">
                <input
                  type="text"
                  placeholder="Search purchase orders..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="flex-1 px-3 py-2 border rounded-md"
                />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 border rounded-md"
                >
                  <option>All</option>
                  <option>Delivered</option>
                  <option>Pending</option>
                  <option>Cancelled</option>
                </select>
              </div>

              <h2 className="text-lg font-semibold mb-5">Purchase Orders</h2>
              <table className="w-full text-left">
                <thead>
                  <tr className="text-xs text-gray-500">
                    <th className="py-2">Order</th>
                    <th className="py-2">Supplier</th>
                    <th className="py-2">Products</th>
                    <th className="py-2">Total Amount</th>
                    <th className="py-2">Order Date</th>
                    <th className="py-2">Status</th>
                    <th className="py-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="border-t border-gray-100">
                      <td className="py-4">{order.id}</td>
                      <td className="py-4 font-semibold">{order.supplier}</td>
                      <td className="py-4">{order.product}</td>
                      <td className="py-4">{order.amount}</td>
                      <td className="py-4">{order.date}</td>
                      <td className="py-4">
                        <span
                          className={`px-3 py-1 rounded-md text-white text-xs ${
                            order.status === "Delivered"
                              ? "bg-green-600"
                              : order.status === "Pending"
                              ? "bg-yellow-500"
                              : "bg-red-600"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="py-4">
                        <button className="text-gray-600 hover:text-black">
                          <Eye className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

        
          {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-[40rem]">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-bold">Add Supplier</h2>
                  <button onClick={handleCloseModal} className="text-gray-500 hover:text-gray-700">
                    &times;
                  </button>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Company Name</label>
                        <input
                          type="text"
                          placeholder="Company name"
                          className="mt-1 p-2 w-full border rounded-lg bg-gray-100"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Contact Person</label>
                        <input
                          type="text"
                          placeholder="Contact person name"
                          className="mt-1 p-2 w-full border rounded-lg bg-gray-100"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                          type="email"
                          placeholder="email@company.com"
                          className="mt-1 p-2 w-full border rounded-lg bg-gray-100"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Phone</label>
                        <input
                          type="tel"
                          placeholder="+250 788 123 456"
                          className="mt-1 p-2 w-full border rounded-lg bg-gray-100"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Address</label>
                      <textarea
                        placeholder="Complete address"
                        className="mt-1 p-2 w-full border rounded-lg bg-gray-100"
                        rows={2}
                      ></textarea>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Tax ID</label>
                        <input
                          type="text"
                          placeholder="TIN-123456789"
                          className="mt-1 p-2 w-full border rounded-lg bg-gray-100"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Payment Terms (Days)</label>
                        <select className="mt-1 p-2 w-full border rounded-lg bg-gray-100">
                          <option value="">Select payment terms</option>
                          {paymentTerms.map((term) => (
                            <option key={term} value={term}>{term}</option>
                          ))}
                        </select>
                      </div>
                    </div>
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
                        Add Supplier
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}