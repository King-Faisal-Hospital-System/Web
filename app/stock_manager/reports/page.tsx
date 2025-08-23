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
  Download,
  ChevronDown,
  DollarSign,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu, closeMenu } from "@/store/slices/reportMenuSlice";
import { RootState } from "@/store/store";

interface Report {
  id: string;
  name: string;
  type: string;
  period: string;
  status: string;
  generatedDate: string;
}

const reportsData: Report[] = [
  {
    id: "1",
    name: "January 2024 Inventory Summary",
    type: "Inventory",
    period: "January 2024",
    status: "completed",
    generatedDate: "2025-01-15",
  },
  {
    id: "2",
    name: "DON-002",
    type: "Expired",
    period: "Q4 2023",
    status: "completed",
    generatedDate: "2025-01-15",
  },
  {
    id: "3",
    name: "DON-003",
    type: "Supplier",
    period: "Q1 2024",
    status: "pending",
    generatedDate: "2025-01-15",
  },
  {
    id: "4",
    name: "DON-004",
    type: "Expired",
    period: "Q3 2023",
    status: "failed",
    generatedDate: "2025-01-15",
  },
];

export default function ReportsPage() {
  const dispatch = useDispatch();
  const openReportId = useSelector(
    (state: RootState) => state.reportMenu.openReportId
  );
  const [activeTab, setActiveTab] = useState<"saved" | "inventory" | "expired">(
    "saved"
  );

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".report-menu") && !target.closest(".menu-button")) {
        dispatch(closeMenu());
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [dispatch]);

  const statusClasses = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-[var(--primary)] text-white";
      case "pending":
        return "bg-gray-200 text-gray-800";
      case "failed":
        return "bg-red-500 text-white";
      default:
        return "bg-gray-100 text-gray-700";
    }
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
                  className="flex items-center space-x-3 hover:bg-[var(--input-field)] rounded-lg px-3 py-2"
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
                  className="flex items-center space-x-3 bg-[var(--primary)] text-white rounded-lg px-3 py-2"
                >
                  <FileText size={20} />
                  <span>Reports</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="px-4 pb-6 space-y-3">
          <Link
            href="/stock_manager/settings"
            className="flex items-center space-x-3 hover:bg-[var(--input-field)] rounded-lg px-3 py-2 cursor-pointer"
          >
            <Settings size={20} />
            <span>Settings</span>
          </Link>
          <Link
            href="/stock_manager/support"
            className="flex items-center space-x-3 hover:bg-[var(--input-field)] rounded-lg px-3 py-2 cursor-pointer"
          >
            <Headphones size={20} />
            <span>Support</span>
          </Link>
          <Link
            href="/stock_manager/logout"
            className="flex items-center space-x-3 hover:bg-red-100 text-red-600 rounded-lg px-3 py-2 cursor-pointer"
          >
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
              <h1 className="text-2xl font-extrabold">Reports Management</h1>
              <p className="text-gray-500 -mt-1">
                Generate comprehensive reports data
              </p>
            </div>
            <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--primary)] text-white hover:opacity-90 shadow">
              <Download size={18} />
              <span>Generate Report</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <p className="text-gray-500 text-sm mb-1">Monthly Revenue</p>
              <p className="text-xl font-bold tracking-tight">2,450,000 RWF</p>
              <p className="text-gray-400 text-sm mt-1">
                ~ 18% from last month
              </p>
            </div>

            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <p className="text-gray-500 text-sm mb-1">Inventory Value</p>
              <p className="text-xl font-bold tracking-tight">15,200,000 RWF</p>
              <p className="text-gray-400 text-sm mt-1">~ 5% from last month</p>
            </div>

            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <p className="text-gray-500 text-sm mb-1">Expired loss</p>
              <p className="text-xl font-bold tracking-tight text-orange-500">
                125,000 RWF
              </p>
              <p className="text-gray-400 text-sm mt-1">
                ~ 12% from last month
              </p>
            </div>
          </div>

          <section className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
            <h2 className="text-lg font-semibold mb-5">Generate Reports</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-5">
              <div>
                <p className="text-sm text-gray-600 mb-2">Report Period</p>
                <button className="inline-flex items-center justify-between w-56 bg-gray-100 text-gray-800 px-3 py-2 rounded-md border border-gray-200">
                  <span className="text-sm">This Month</span>
                  <ChevronDown size={16} className="text-gray-500" />
                </button>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-2">Report Type</p>
                <div className="flex items-center gap-3">
                  <button className="px-4 py-2 rounded-md bg-[var(--primary)] text-white text-sm">
                    Inventory
                  </button>
                  <button className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 text-sm bg-white">
                    Expired
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab("saved")}
                className={`px-4 py-2 rounded-md text-sm ${
                  activeTab === "saved"
                    ? "bg-gray-200 text-gray-800"
                    : "bg-gray-100 border border-gray-200 text-gray-700"
                }`}
              >
                Saved Reports
              </button>

              <button
                onClick={() => setActiveTab("inventory")}
                className={`px-4 py-2 rounded-md text-sm ${
                  activeTab === "inventory"
                    ? "bg-gray-200 text-gray-800"
                    : "bg-gray-100 border border-gray-200 text-gray-700"
                }`}
              >
                Current Inventory
              </button>

              <button
                onClick={() => setActiveTab("expired")}
                className={`px-4 py-2 rounded-md text-sm ${
                  activeTab === "expired"
                    ? "bg-gray-200 text-gray-800"
                    : "bg-gray-100 border border-gray-200 text-gray-700"
                }`}
              >
                Expired Products
              </button>
            </div>
          </section>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            {activeTab === "saved" && (
              <>
                <h3 className="font-semibold text-lg mb-4">Saved Reports</h3>
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-xs text-gray-500">
                      <th className="py-2 font-medium">Report Name</th>
                      <th className="py-2 font-medium">Type</th>
                      <th className="py-2 font-medium">Period</th>
                      <th className="py-2 font-medium">Status</th>
                      <th className="py-2 font-medium">Generated Date</th>
                      <th className="py-2 font-medium text-right pr-2">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {reportsData.map((r) => (
                      <tr key={r.id} className="border-t border-gray-100">
                        <td className="py-5 align-middle">
                          <p className="font-medium text-sm">{r.name}</p>
                        </td>
                        <td className="py-5 align-middle">
                          <span className="inline-flex items-center text-xs px-2 py-1 rounded border border-gray-300 bg-white text-gray-700">
                            {r.type}
                          </span>
                        </td>
                        <td className="py-5 align-middle font-semibold text-sm">
                          {r.period}
                        </td>
                        <td className="py-5 align-middle">
                          <span
                            className={`inline-flex items-center text-xs font-semibold px-3 py-1 rounded-full ${statusClasses(
                              r.status
                            )}`}
                          >
                            {r.status}
                          </span>
                        </td>
                        <td className="py-5 align-middle text-sm text-gray-700">
                          {r.generatedDate}
                        </td>
                        <td className="py-5 align-middle text-right relative">
                          <button
                            onClick={() => dispatch(toggleMenu(r.id))}
                            className="menu-button inline-flex items-center justify-center h-8 w-8 rounded-full hover:bg-gray-100"
                          >
                            <MoreHorizontal size={18} />
                          </button>
                          {openReportId === r.id && (
                            <div className="report-menu absolute right-0 mt-2 w-36 bg-white border border-gray-200 shadow-lg rounded-lg overflow-hidden z-10">
                              <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50">
                                View
                              </button>
                              <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50">
                                Download
                              </button>
                              <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50">
                                Delete
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}

            {activeTab === "inventory" && (
              <div>
                <h3 className="font-semibold text-lg mb-4">Available Stock</h3>

                <div className="space-y-4">
                  {[
                    {
                      name: "Paracetamol 500mg",
                      generic: "Paracetamol",
                      batch: "PAR001",
                      received: 10000,
                      issued: 250,
                      balance: 9750,
                      expiry: "2025-08-15",
                      unitCost: 0.25,
                      status: "GOOD",
                    },
                    {
                      name: "Ibuprofen 200mg",
                      generic: "Ibuprofen",
                      batch: "IBU002",
                      received: 500,
                      issued: 450,
                      balance: 50,
                      expiry: "2025-09-10",
                      unitCost: 0.15,
                      status: "LOW",
                    },
                    {
                      name: "Amoxicillin 500mg",
                      generic: "Amoxicillin",
                      batch: "AMO003",
                      received: 200,
                      issued: 200,
                      balance: 0,
                      expiry: "2024-12-01",
                      unitCost: 0.35,
                      status: "OUT",
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="border border-gray-200 rounded-xl p-4 shadow-sm relative"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-8 h-8 flex items-center justify-center rounded-full ${
                              item.status === "GOOD"
                                ? "bg-green-100 text-green-700"
                                : item.status === "LOW"
                                ? "bg-orange-100 text-orange-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {item.status === "GOOD" ? "✓" : item.status}
                          </div>

                          <div>
                            <p className="font-semibold">{item.name}</p>
                            <p className="text-sm text-gray-600">
                              {item.generic}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              Batch: {item.batch}
                            </p>
                          </div>
                        </div>

                        <span
                          className={`px-3 py-1 text-xs font-semibold rounded-full ${
                            item.status === "GOOD"
                              ? "bg-green-100 text-green-700"
                              : item.status === "LOW"
                              ? "bg-orange-100 text-orange-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {item.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-6 gap-2 text-sm mb-2">
                        <p>
                          Received:{" "}
                          <span className="font-medium">{item.received}</span>
                        </p>
                        <p>
                          Issued:{" "}
                          <span className="font-medium">{item.issued}</span>
                        </p>
                        <p>
                          Balance:{" "}
                          <span className="font-medium">{item.balance}</span>
                        </p>
                        <p>
                          Expiry:{" "}
                          <span className="font-medium text-red-500">
                            {item.expiry}
                          </span>
                        </p>
                        <p>
                          Unit Cost:{" "}
                          <span className="font-medium">
                            {item.unitCost} Rwf
                          </span>
                        </p>
                      </div>

                      {item.status === "LOW" && (
                        <div className="text-orange-700 border border-orange-200 bg-orange-50 px-3 py-1 rounded-md text-sm">
                          Low stock level - Only {item.balance} units remaining
                          (Reorder needed)
                        </div>
                      )}

                      <p className="mt-3 text-sm text-gray-700 font-medium">
                        Total Value:{" "}
                        <span className="font-semibold">
                          {(item.balance * item.unitCost).toLocaleString()} Rwf
                        </span>
                      </p>
                    </div>
                  ))}

                  <div className="flex justify-between items-center mt-4 border-t pt-3 text-sm text-gray-600">
                    <p>
                      Total: 3 medicines • Low: 1 • Value:{" "}
                      <span className="font-semibold">40,000 Rwf</span>
                    </p>
                    <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-100 text-gray-700">
                      <Download size={16} /> Export List
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "expired" && (
              <div>
                {(() => {
                  interface Product {
                    name: string;
                    supplier: string;
                    quantity: number;
                    lossValue: string;
                    orderDate: string;
                    batch: string;
                    expiryDate: string;
                  }

                  const expiredProducts: Product[] = [
                    {
                      name: "Aspirin 75mg",
                      supplier: "PharmaSupply Ltd",
                      quantity: 150,
                      lossValue: "250,000 RWF",
                      orderDate: "2024-01-25",
                      batch: "PAR-001",
                      expiryDate: "2024-01-25",
                    },
                  ];

                  const totalLoss = expiredProducts.reduce(
                    (sum, product) =>
                      sum +
                      parseInt(
                        product.lossValue.replace(/,/g, "").replace(" RWF", "")
                      ),
                    0
                  );

                  return (
                    <div className="p-6 bg-white rounded-lg shadow-md">
                      <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg font-semibold">
                          Expired Products Report
                        </h2>
                        <div className="text-orange-600 font-bold text-right">
                          Total Loss Value
                          <div className="text-xl">
                            {totalLoss.toLocaleString()} RWF
                          </div>
                        </div>
                      </div>

                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="border-b border-gray-200">
                            <th className="py-2">Product Name</th>
                            <th className="py-2">Supplier</th>
                            <th className="py-2">Quantity Expired</th>
                            <th className="py-2">Loss Value</th>
                            <th className="py-2">Order Date</th>
                            <th className="py-2">Batch</th>
                            <th className="py-2">Expiry Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          {expiredProducts.map((product, index) => (
                            <tr
                              key={index}
                              className="border-b border-gray-100"
                            >
                              <td className="py-3">{product.name}</td>
                              <td className="py-3">{product.supplier}</td>
                              <td className="py-3">{product.quantity}</td>
                              <td className="py-3">{product.lossValue}</td>
                              <td className="py-3">{product.orderDate}</td>
                              <td className="py-3">
                                <span className="bg-teal-800 text-white px-2 py-1 rounded">
                                  {product.batch}
                                </span>
                              </td>
                              <td className="py-3">{product.expiryDate}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  );
                })()}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
