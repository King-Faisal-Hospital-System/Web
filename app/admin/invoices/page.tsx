"use client";

import {
  Package,
  FileText,
  Users,
  Truck,
  CreditCard,
  Search,
  Plus,
  Eye,
  Bell,
  MoreHorizontal,
  Edit,
  Send,
  Download,
  Settings,
  Headphones,
  LogOut,
  DollarSign,
  LayoutDashboard
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { fetchInvoices, createInvoice, updateInvoice, deleteInvoice, Invoice } from "@/store/slices/invoiceSlice";
import { fetchSuppliers } from "@/store/slices/supplierSlice";
import { useLanguageContext } from "../../../components/LanguageProvider";

export default function InvoicesPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [openInvoiceId, setOpenInvoiceId] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState<Invoice | null>(null);
  const [formData, setFormData] = useState({
    type: "REGULAR" as "PROFORMA" | "REGULAR",
    total_value: "",
    notes: "",
    purchase_order: "",
  });

  const { invoices, loading, error } = useSelector((state: RootState) => state.invoices);
  const { suppliers } = useSelector((state: RootState) => state.suppliers);
  const { t } = useLanguageContext();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchInvoices());
    dispatch(fetchSuppliers());
  }, [dispatch]);

  const filteredInvoices = invoices.filter(
    (invoice) =>
      (statusFilter === "All" || invoice.status === statusFilter) &&
      (invoice._id.toLowerCase().includes(search.toLowerCase()) ||
        invoice.notes?.toLowerCase().includes(search.toLowerCase()))
  );

  const handleMenuToggle = (id: string) => {
    setOpenInvoiceId((prev) => (prev === id ? null : id));
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setOpenInvoiceId(null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCreateInvoice = () => {
    setEditingInvoice(null);
    setFormData({
      type: "REGULAR",
      total_value: "",
      notes: "",
      purchase_order: "",
    });
    setIsModalOpen(true);
  };

  const handleEditInvoice = (invoice: Invoice) => {
    setEditingInvoice(invoice);
    setFormData({
      type: invoice.type,
      total_value: invoice.total_value.toString(),
      notes: invoice.notes || "",
      purchase_order: invoice.purchase_order || "",
    });
    setIsModalOpen(true);
  };

  const handleDeleteInvoice = (invoiceId: string) => {
    if (confirm("Are you sure you want to delete this invoice?")) {
      dispatch(deleteInvoice(invoiceId)).then(() => {
        dispatch(fetchInvoices());
      });
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingInvoice(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!formData.type || !formData.total_value) {
      alert("Please fill in all required fields");
      return;
    }

    const invoiceData = {
      ...formData,
      total_value: parseFloat(formData.total_value),
    };

    if (editingInvoice) {
      dispatch(updateInvoice({ id: editingInvoice._id, ...invoiceData })).then(() => {
        dispatch(fetchInvoices());
      });
    } else {
      dispatch(createInvoice(invoiceData)).then(() => {
        dispatch(fetchInvoices());
      });
    }

    setIsModalOpen(false);
  };

  const totalInvoices = invoices.length;
  const pendingInvoices = invoices.filter(inv => inv.status === "PENDING").length;
  const totalValue = invoices.reduce((sum, inv) => sum + inv.total_value, 0);

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
                <Link href="/admin/invoices" className="flex items-center space-x-3 bg-[var(--primary)] text-white rounded-lg px-3 py-2">
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
                <Link href="/admin/users" className="flex items-center space-x-3 hover:bg-[var(--input-field)] rounded-lg px-3 py-2">
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
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search invoices or suppliers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
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
              <h1 className="text-2xl font-extrabold">Invoice Management</h1>
              <p className="text-gray-500 -mt-1">Manage invoices</p>
            </div>
            <button onClick={handleCreateInvoice} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--primary)] text-white hover:opacity-90 shadow">
              <Plus size={18} />
              <span>Create Invoice</span>
            </button>
          </div>

        
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <p className="text-gray-500 text-sm mb-1">Total Invoices</p>
              <p className="text-xl font-bold tracking-tight">{totalInvoices}</p>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <p className="text-gray-500 text-sm mb-1">Pending Payment</p>
              <p className="text-xl font-bold tracking-tight text-orange-500">{pendingInvoices}</p>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <p className="text-gray-500 text-sm mb-1">Total Value</p>
              <p className="text-xl font-bold tracking-tight">{totalValue.toLocaleString()} RWF</p>
            </div>
          </div>

         
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center gap-3 mb-5">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border rounded-md"
              >
                <option value="All">All Status</option>
                <option value="DRAFT">Draft</option>
                <option value="PAID">Paid</option>
                <option value="SENT">Sent</option>
                <option value="PENDING">Pending</option>
              </select>
            </div>

            <h2 className="text-lg font-semibold mb-5">Invoices ({filteredInvoices.length})</h2>
            <table className="w-full text-left">
              <thead>
                <tr className="text-xs text-gray-500">
                  <th className="py-2">Invoice</th>
                  <th className="py-2">Type</th>
                  <th className="py-2">Supplier</th>
                  <th className="py-2">Amount</th>
                  <th className="py-2">Issue Date</th>
                  <th className="py-2">Due Date</th>
                  <th className="py-2">Status</th>
                  <th className="py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={8} className="py-8 text-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[var(--primary)] mx-auto"></div>
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan={8} className="py-8 text-center text-red-500">
                      Error: {error}
                    </td>
                  </tr>
                ) : filteredInvoices.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-8 text-center text-gray-500">
                      No invoices found
                    </td>
                  </tr>
                ) : (
                  filteredInvoices.map((invoice) => (
                    <tr key={invoice._id} className="border-t border-gray-100">
                      <td className="py-4">INV-{invoice._id.slice(-6)}</td>
                      <td className="py-4">{invoice.type}</td>
                      <td className="py-4 font-semibold">{invoice.supplier || "N/A"}</td>
                      <td className="py-4">{invoice.total_value.toLocaleString()} RWF</td>
                      <td className="py-4">{new Date(invoice.createdAt || "").toLocaleDateString()}</td>
                      <td className="py-4">{invoice.dueDate || "N/A"}</td>
                      <td className="py-4">
                        <span
                          className={`px-3 py-1 rounded-md text-white text-xs ${
                            invoice.status === "DRAFT"
                              ? "bg-gray-400"
                              : invoice.status === "PAID"
                              ? "bg-green-600"
                              : invoice.status === "SENT"
                              ? "bg-green-400"
                              : "bg-orange-500"
                          }`}
                        >
                          {invoice.status}
                        </span>
                      </td>
                      <td className="py-4 text-right relative">
                        <button
                          onClick={() => handleMenuToggle(invoice._id)}
                          className="menu-button inline-flex items-center justify-center h-8 w-8 rounded-full hover:bg-gray-100"
                        >
                          <MoreHorizontal size={18} />
                        </button>
                        {openInvoiceId === invoice._id && (
                          <div ref={menuRef} className="invoice-menu absolute right-0 mt-2 w-40 bg-white border border-gray-200 shadow-lg rounded-lg overflow-hidden z-10">
                            <button 
                              onClick={() => handleEditInvoice(invoice)}
                              className="w-full flex items-center space-x-2 text-left px-4 py-2 text-sm hover:bg-gray-50"
                            >
                              <Edit size={16} />
                              <span>Edit Invoice</span>
                            </button>
                            <button 
                              onClick={() => handleDeleteInvoice(invoice._id)}
                              className="w-full flex items-center space-x-2 text-left px-4 py-2 text-sm hover:bg-gray-50 text-red-600"
                            >
                              <span>Delete</span>
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

      
          {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-[40rem]">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-bold">{editingInvoice ? 'Edit Invoice' : 'Create Invoice'}</h2>
                  <button onClick={handleCloseModal} className="text-gray-500 hover:text-gray-700">
                    &times;
                  </button>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Invoice Type</label>
                        <select 
                          name="type"
                          value={formData.type}
                          onChange={handleInputChange}
                          className="mt-1 p-2 w-full border rounded-lg bg-gray-100"
                          required
                        >
                          <option value="">Select type</option>
                          <option value="REGULAR">Regular</option>
                          <option value="PROFORMA">Proforma</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Purchase Order</label>
                        <input
                          type="text"
                          name="purchase_order"
                          value={formData.purchase_order}
                          onChange={handleInputChange}
                          placeholder="Purchase order ID (optional)"
                          className="mt-1 p-2 w-full border rounded-lg bg-gray-100"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Total Value</label>
                      <input
                        type="number"
                        name="total_value"
                        value={formData.total_value}
                        onChange={handleInputChange}
                        step="0.01"
                        placeholder="Enter total value"
                        className="mt-1 p-2 w-full border rounded-lg bg-gray-100"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Notes</label>
                      <textarea
                        name="notes"
                        value={formData.notes}
                        onChange={handleInputChange}
                        placeholder="Enter invoice notes (optional)"
                        className="mt-1 p-2 w-full border rounded-lg bg-gray-100"
                        rows={3}
                      ></textarea>
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
                        disabled={loading}
                        className="px-4 py-2 bg-[var(--primary)] text-white rounded-lg disabled:opacity-50"
                      >
                        {loading ? 'Saving...' : (editingInvoice ? 'Update Invoice' : 'Create Invoice')}
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