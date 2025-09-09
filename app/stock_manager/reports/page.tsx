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
import { useLanguageContext } from "../../../components/LanguageProvider";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu, closeMenu } from "@/store/slices/reportMenuSlice";
import { fetchReports, generateReport, fetchReportStats, Report } from "@/store/slices/reportSlice";
import { fetchMedicines, Medicine } from "@/store/slices/inventorySlice";
import { RootState, AppDispatch } from "@/store/store";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";



export default function ReportsPage() {
  const { t } = useLanguageContext();
  const dispatch = useDispatch<AppDispatch>();
  const { reports, loading, error, generatingReport, stats, loadingStats } = useSelector((state: RootState) => state.reports);
  const { medicines } = useSelector((state: RootState) => state.inventory);
  const openReportId = useSelector((state: RootState) => state.reportMenu.openReportId);
  
  const [activeTab, setActiveTab] = useState<"saved" | "inventory" | "expired">("saved");
  const [reportType, setReportType] = useState<"INVENTORY_REPORT" | "EXPIRATION_REPORT">("INVENTORY_REPORT");

  useEffect(() => {
    dispatch(fetchReports());
    dispatch(fetchMedicines());
    dispatch(fetchReportStats());
  }, [dispatch]);

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
    switch (status.toLowerCase()) {
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

  const handleGenerateReport = async () => {
    try {
      await dispatch(generateReport(reportType));
      
      setTimeout(() => {
        dispatch(fetchReports());
      }, 2000);
    } catch (error) {
      console.error('Failed to generate report:', error);
    }
  };

  const handleDownloadReport = (report: any) => {
    if (report.file_url) {
      const link = document.createElement('a');
      link.href = report.file_url;
      link.download = `${report.name || report.type}_${new Date(report.createdAt).toLocaleDateString()}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  
  const medicinesWithStatus = medicines
    .filter((med): med is NonNullable<typeof med> => med != null)
    .map((med) => {
      const received = med.received ?? med.quantity ?? 0;
      const issued = med.issued ?? 0;
      const balance = received - issued;
      const unitCost = med.unit_price ?? 0;

      return {
        ...med,
        received,
        issued,
        balance,
        unitCost,
        status: (balance < 10 ? "LOW" : "GOOD") as Medicine["status"],
        totalValue: received * unitCost,
        formattedExpiry: med.expiry ? new Date(med.expiry).toLocaleDateString() : "-",
        displayBatch: med.batch_number ?? "-",
      };
    });

  
  const expiredItems = medicinesWithStatus.filter((item) => {
    const expiryDate = new Date(item.expiry || '');
    const today = new Date();
    return expiryDate < today;
  });

 
  const lowStockItems = medicinesWithStatus.filter((item) => item.status === "LOW");

  return (
    <div className="flex h-screen">
      {/* sidebar */}
      <Sidebar/>

      <div className="flex flex-col flex-1">
        {/* header */}
        <Header/>

        {/* body */}
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-2xl font-extrabold">Reports Management</h1>
              <p className="text-gray-500 -mt-1">
                Generate comprehensive reports data
              </p>
            </div>
            <button 
              onClick={handleGenerateReport}
              disabled={generatingReport}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--primary)] text-white hover:opacity-90 shadow disabled:opacity-50"
            >
              <Download size={18} />
              <span>{generatingReport ? 'Generating...' : 'Generate Report'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <p className="text-gray-500 text-sm mb-1">Monthly Revenue</p>
              {loadingStats ? (
                <div className="animate-pulse">
                  <div className="h-6 bg-gray-200 rounded w-32 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-24"></div>
                </div>
              ) : (
                <>
                  <p className="text-xl font-bold tracking-tight">
                    {stats?.financial?.monthlyRevenue?.toLocaleString() || '0'} RWF
                  </p>
                  <p className="text-gray-400 text-sm mt-1">
                    {stats?.financial?.revenueChange && parseFloat(stats.financial.revenueChange) >= 0 ? '↗' : '↘'} {Math.abs(parseFloat(stats?.financial?.revenueChange || '0'))}% from last month
                  </p>
                </>
              )}
            </div>

            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <p className="text-gray-500 text-sm mb-1">Inventory Value</p>
              {loadingStats ? (
                <div className="animate-pulse">
                  <div className="h-6 bg-gray-200 rounded w-32 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-24"></div>
                </div>
              ) : (
                <>
                  <p className="text-xl font-bold tracking-tight">
                    {stats?.financial?.inventoryValue?.toLocaleString() || '0'} RWF
                  </p>
                  <p className="text-gray-400 text-sm mt-1">Current total value</p>
                </>
              )}
            </div>

            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <p className="text-gray-500 text-sm mb-1">Expired Loss</p>
              {loadingStats ? (
                <div className="animate-pulse">
                  <div className="h-6 bg-gray-200 rounded w-32 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-24"></div>
                </div>
              ) : (
                <>
                  <p className="text-xl font-bold tracking-tight text-orange-500">
                    {stats?.financial?.expiredLoss?.toLocaleString() || '0'} RWF
                  </p>
                  <p className="text-gray-400 text-sm mt-1">
                    Total expired inventory value
                  </p>
                </>
              )}
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
                  <button 
                    onClick={() => setReportType('INVENTORY_REPORT')}
                    className={`px-4 py-2 rounded-md text-sm ${
                      reportType === 'INVENTORY_REPORT' 
                        ? 'bg-[var(--primary)] text-white' 
                        : 'border border-gray-300 text-gray-700 bg-white'
                    }`}
                  >
                    Inventory
                  </button>
                  <button 
                    onClick={() => setReportType('EXPIRATION_REPORT')}
                    className={`px-4 py-2 rounded-md text-sm ${
                      reportType === 'EXPIRATION_REPORT' 
                        ? 'bg-[var(--primary)] text-white' 
                        : 'border border-gray-300 text-gray-700 bg-white'
                    }`}
                  >
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
                    {loading ? (
                      <tr>
                        <td colSpan={6} className="py-8 text-center">
                          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[var(--primary)] mx-auto"></div>
                        </td>
                      </tr>
                    ) : error ? (
                      <tr>
                        <td colSpan={6} className="py-8 text-center text-red-500">
                          Error: {error}
                        </td>
                      </tr>
                    ) : reports.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-8 text-center text-gray-500">
                          No reports found
                        </td>
                      </tr>
                    ) : (
                      reports.map((r) => (
                        <tr key={r._id} className="border-t border-gray-100">
                          <td className="py-5 align-middle">
                            <p className="font-medium text-sm">{r.name || `${r.type} Report`}</p>
                          </td>
                          <td className="py-5 align-middle">
                            <span className="inline-flex items-center text-xs px-2 py-1 rounded border border-gray-300 bg-white text-gray-700">
                              {r.type.replace('_', ' ')}
                            </span>
                          </td>
                          <td className="py-5 align-middle font-semibold text-sm">
                            {new Date(r.createdAt).toLocaleDateString()}
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
                            {new Date(r.createdAt).toLocaleDateString()}
                          </td>
                          <td className="py-5 align-middle text-right relative">
                            <button
                              onClick={() => dispatch(toggleMenu(r._id))}
                              className="menu-button inline-flex items-center justify-center h-8 w-8 rounded-full hover:bg-gray-100"
                            >
                              <MoreHorizontal size={18} />
                            </button>
                            {openReportId === r._id && (
                              <div className="report-menu absolute right-0 mt-2 w-36 bg-white border border-gray-200 shadow-lg rounded-lg overflow-hidden z-10">
                                <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50">
                                  View
                                </button>
                                <button 
                                  onClick={() => handleDownloadReport(r)}
                                  disabled={!r.file_url}
                                  className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 disabled:opacity-50"
                                >
                                  Download
                                </button>
                              </div>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </>
            )}

            {activeTab === "inventory" && (
              <div>
                <h3 className="font-semibold text-lg mb-4">Available Stock</h3>

                <div className="space-y-4">
                  {loading ? (
                    <div className="flex justify-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[var(--primary)]"></div>
                    </div>
                  ) : medicinesWithStatus.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      No inventory data available
                    </div>
                  ) : (
                    medicinesWithStatus.map((item, index) => (
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
                              {item.status === "GOOD" ? "✓" : item.status === "LOW" ? "!" : "×"}
                            </div>

                            <div>
                              <p className="font-semibold">{item.name}</p>
                              <p className="text-sm text-gray-600">
                                {item.product_description || item.category}
                              </p>
                              <p className="text-xs text-gray-500 mt-1">
                                Batch: {item.displayBatch}
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

                        <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-sm mb-2">
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
                              {item.formattedExpiry}
                            </span>
                          </p>
                          <p>
                            Unit Cost:{" "}
                            <span className="font-medium">
                              {item.unitCost.toFixed(2)} Rwf
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
                            {item.totalValue.toLocaleString()} Rwf
                          </span>
                        </p>
                      </div>
                    ))
                  )}

                  <div className="flex justify-between items-center mt-4 border-t pt-3 text-sm text-gray-600">
                    <p>
                      Total: {medicinesWithStatus.length} medicines • Low: {lowStockItems.length} • Value:{" "}
                      <span className="font-semibold">
                        {medicinesWithStatus.reduce((total, item) => total + item.totalValue, 0).toLocaleString()} Rwf
                      </span>
                    </p>
                    <button 
                      onClick={() => {
                        setReportType("INVENTORY_REPORT");
                        handleGenerateReport();
                      }}
                      className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-100 text-gray-700"
                    >
                      <Download size={16} /> Export List
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "expired" && (
              <div>
                <div className="p-6 bg-white rounded-lg shadow-md">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-semibold">
                      Expired Products Report
                    </h2>
                    <div className="text-red-600 font-bold text-right">
                      Total Loss Value
                      <div className="text-xl">
                        {expiredItems.reduce((sum, item) => sum + item.totalValue, 0).toLocaleString()} RWF
                      </div>
                    </div>
                  </div>

                  {loading ? (
                    <div className="flex justify-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[var(--primary)]"></div>
                    </div>
                  ) : expiredItems.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      No expired products found
                    </div>
                  ) : (
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="py-2">Product Name</th>
                          <th className="py-2">Category</th>
                          <th className="py-2">Quantity Expired</th>
                          <th className="py-2">Loss Value</th>
                          <th className="py-2">Batch</th>
                          <th className="py-2">Expiry Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {expiredItems.map((item, index) => (
                          <tr key={index} className="border-b border-gray-100">
                            <td className="py-3 font-medium">{item.name}</td>
                            <td className="py-3">{item.category || 'N/A'}</td>
                            <td className="py-3">{item.received}</td>
                            <td className="py-3 text-red-600 font-semibold">
                              {item.totalValue.toLocaleString()} RWF
                            </td>
                            <td className="py-3">{item.displayBatch}</td>
                            <td className="py-3 text-red-500">
                              {item.formattedExpiry}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}

                  <div className="mt-4 flex justify-between items-center text-sm text-gray-600">
                    <p>
                      Total Expired Products: {expiredItems.length} •{" "}
                      <span className="text-red-600 font-semibold">
                        Total Loss: {expiredItems.reduce((sum, item) => sum + item.totalValue, 0).toLocaleString()} RWF
                      </span>
                    </p>
                    <button 
                      onClick={() => {
                        setReportType("EXPIRATION_REPORT");
                        handleGenerateReport();
                      }}
                      className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-100 text-gray-700"
                    >
                      <Download size={16} /> Export Report
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
