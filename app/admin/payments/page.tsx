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
import { fetchPayments, createPayment, updatePayment, deletePayment, Payment } from "@/store/slices/paymentSlice";
import { fetchInvoices } from "@/store/slices/invoiceSlice";




interface PaymentMethod {
  name: string;
  account: string;
  processingTime: string;
  status: string;
  notes?: string; 
}



const initialPaymentMethodsData: PaymentMethod[] = [
  { name: "MTN Mobile Money", account: "**** **** 224", processingTime: "Processing Instant Fee 1%", status: "Active" },
  { name: "Airtel Money", account: "**** **** 234", processingTime: "Processing Instant Fee 1%", status: "Active" },
  { name: "Bank of Kigali", account: "**** **** 234", processingTime: "Processing 1-2 business days Fee 1%", status: "Active" },
  { name: "GT Bank Rwanda", account: "1234567890", processingTime: "Processing 2-5 business days Fee 1%", status: "Active" },
];

const SidebarNavItem = ({ href, icon: Icon, label, active = false }: { href: string; icon: React.ElementType; label: string; active?: boolean }) => (
  <li>
    <Link
      href={href}
      className={`flex items-center space-x-3 rounded-lg px-3 py-2 ${active ? "bg-[var(--primary)] text-white" : "hover:bg-[var(--input-field)]"}`}
    >
      <Icon size={20} />
      <span>{label}</span>
    </Link>
  </li>
);

const PaymentActionMenu = ({ paymentId, isOpen, onClose }: { paymentId: string; isOpen: boolean; onClose: () => void }) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node) && isOpen) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div ref={menuRef} className="invoice-menu absolute right-0 mt-2 w-40 bg-white border border-gray-200 shadow-lg rounded-lg overflow-hidden z-10">
      <button className="w-full flex items-center space-x-2 text-left px-4 py-2 text-sm hover:bg-gray-50">
        <Eye size={16} />
        <span>View</span>
      </button>
      <button className="w-full flex items-center space-x-2 text-left px-4 py-2 text-sm hover:bg-gray-50">
        <Download size={16} />
        <span>Download</span>
      </button>
    </div>
  );
};

export default function PaymentsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { payments, loading, error } = useSelector((state: RootState) => state.payments);
  const { invoices } = useSelector((state: RootState) => state.invoices);
  
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [activeTab, setActiveTab] = useState<"history" | "methods">("history");
  const [openPaymentId, setOpenPaymentId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);
  const [editingPayment, setEditingPayment] = useState<Payment | null>(null);
  const [paymentMethodsData, setPaymentMethodsData] = useState<PaymentMethod[]>(initialPaymentMethodsData);
  const [formData, setFormData] = useState({
    invoice: "",
    amount: 0,
    method: "",
    notes: "",
  });

  useEffect(() => {
    dispatch(fetchPayments());
    dispatch(fetchInvoices());
  }, [dispatch]);

  const filteredPayments = payments.filter(
    (payment) =>
      (statusFilter === "All" || payment.status.toLowerCase() === statusFilter.toLowerCase()) &&
      (payment._id.toLowerCase().includes(search.toLowerCase()) ||
        payment.method.toLowerCase().includes(search.toLowerCase()))
  );

  const handleMenuToggle = (id: string) => {
    setOpenPaymentId((prev) => (prev === id ? null : id));
  };

  const handleNewPayment = () => {
    setFormData({ invoice: "", amount: 0, method: "", notes: "" });
    setSelectedMethod(null);
    setEditingPayment(null);
    setIsModalOpen(true);
  };

  const handleConfigureMethod = (method: PaymentMethod) => {
    setSelectedMethod({ ...method, notes: method.notes || "" }); 
    setFormData({ invoice: "", amount: 0, method: "", notes: "" }); 
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMethod(null);
    setEditingPayment(null);
    setFormData({ invoice: "", amount: 0, method: "", notes: "" });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (selectedMethod) {
     
      setPaymentMethodsData(prevMethods => 
        prevMethods.map(method => 
          method.name === selectedMethod.name 
            ? { ...selectedMethod }
            : method
        )
      );
      
     
      alert(`${selectedMethod.name} configuration updated successfully!`);
    } else {
      
      try {
        if (editingPayment) {
          await dispatch(updatePayment({ id: editingPayment._id, ...formData }));
        } else {
          await dispatch(createPayment(formData));
        }
      } catch (error) {
        console.error('Payment operation failed:', error);
      }
    }
    
    handleCloseModal();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (selectedMethod) {
      setSelectedMethod((prev) => prev ? { ...prev, [name]: value } : null);
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: name === "amount" ? parseFloat(value) || 0 : value,
      }));
    }
  };

  const paymentMethods = ["MOMO", "AIRTEL_MONEY", "BANK CARD", "CASHLESS"];
  
  const handleEditPayment = (payment: Payment) => {
    setEditingPayment(payment);
    setFormData({
      invoice: payment.invoice,
      amount: payment.amount,
      method: payment.method,
      notes: payment.notes || "",
    });
    setIsModalOpen(true);
  };
  
  const handleDeletePayment = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this payment?')) {
      try {
        await dispatch(deletePayment(id));
      } catch (error) {
        console.error('Delete payment failed:', error);
      }
    }
  };

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
              <SidebarNavItem href="/admin/home" icon={LayoutDashboard} label="Dashboard" />
              <SidebarNavItem href="/admin/inventory" icon={Package} label="Inventory" />
              <SidebarNavItem href="/admin/reports" icon={FileText} label="Reports" />
              <SidebarNavItem href="/admin/suppliers" icon={Truck} label="Suppliers" />
              <SidebarNavItem href="/admin/invoices" icon={DollarSign} label="Invoices" />
              <SidebarNavItem href="/admin/payments" icon={CreditCard} label="Payments" active />
              <SidebarNavItem href="/admin/users" icon={Users} label="Users" />
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
        <header className="flex justify-between items-center bg-white px-6 py-4 border-b border-gray-200">
          <div className="relative w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search payments, invoices, or suppliers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 w-full rounded-lg bg-[var(--input-field)] outline-none focus:ring-2 focus:ring-[var(--primary)]"
              aria-label="Search payments, invoices, or suppliers"
            />
          </div>
          <div className="flex items-center space-x-4">
            <Bell size={22} className="cursor-pointer" aria-label="Notifications" />
            <div className="flex items-center space-x-2">
              <Image src="/profile.jpg" alt="User profile" className="w-10 h-10 rounded-full" width={40} height={40} />
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
              <h1 className="text-2xl font-extrabold">Payment Management</h1>
              <p className="text-gray-500 -mt-1">Manage Payments</p>
            </div>
            <button
              onClick={handleNewPayment}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--primary)] text-white hover:opacity-90 shadow"
              aria-label="Add new payment"
            >
              <Plus size={18} />
              <span>New Payment</span>
            </button>
          </div>

        
          <div className="bg-white px-6 py-4 border-b border-gray-200">
            <div className="flex space-x-4 mb-4">
              <button
                className={`px-4 py-2 rounded-lg ${activeTab === "history" ? "bg-gray-200" : "bg-gray-100"}`}
                onClick={() => setActiveTab("history")}
                aria-label="View payment history"
              >
                Payment History
              </button>
              <button
                className={`px-4 py-2 rounded-lg ${activeTab === "methods" ? "bg-gray-200" : "bg-gray-100"}`}
                onClick={() => setActiveTab("methods")}
                aria-label="View payment methods"
              >
                Payment Methods
              </button>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative w-1/2">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search payments, invoices, or suppliers..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full rounded-lg bg-gray-100 outline-none focus:ring-2 focus:ring-[var(--primary)]"
                  aria-label="Search payments, invoices, or suppliers"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 rounded-lg bg-gray-100"
                aria-label="Filter by status"
              >
                <option value="All">All Status</option>
                <option value="COMPLETED">Completed</option>
                <option value="PROCESSING">Processing</option>
              </select>
            </div>
          </div>

        
          {activeTab === "history" ? (
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mt-4">
              <h2 className="text-lg font-semibold mb-5">Payments Transactions ({filteredPayments.length})</h2>
              <table className="w-full text-left" role="grid">
                <thead>
                  <tr className="text-xs text-gray-500">
                    <th className="py-2" role="columnheader">Payments</th>
                    <th className="py-2" role="columnheader">Transaction ID</th>
                    <th className="py-2" role="columnheader">Invoice</th>
                    <th className="py-2" role="columnheader">Supplier</th>
                    <th className="py-2" role="columnheader">Amount</th>
                    <th className="py-2" role="columnheader">Method</th>
                    <th className="py-2" role="columnheader">Date</th>
                    <th className="py-2" role="columnheader">Status</th>
                    <th className="py-2" role="columnheader">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={9} className="py-8 text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[var(--primary)] mx-auto"></div>
                      </td>
                    </tr>
                  ) : error ? (
                    <tr>
                      <td colSpan={9} className="py-8 text-center text-red-500">
                        Error: {error}
                      </td>
                    </tr>
                  ) : filteredPayments.length === 0 ? (
                    <tr>
                      <td colSpan={9} className="py-8 text-center text-gray-500">
                        No payments found
                      </td>
                    </tr>
                  ) : (
                    filteredPayments.map((payment) => (
                      <tr key={payment._id} className="border-t border-gray-100" role="row">
                        <td className="py-4" role="cell">PAY-{payment._id.slice(-6)}</td>
                        <td className="py-4" role="cell">{payment._id.slice(-8)}</td>
                        <td className="py-4" role="cell">INV-{payment.invoice.slice(-6)}</td>
                        <td className="py-4 font-semibold" role="cell">N/A</td>
                        <td className="py-4" role="cell">{payment.amount.toLocaleString()} RWF</td>
                        <td className="py-4" role="cell">{payment.method}</td>
                        <td className="py-4" role="cell">{new Date(payment.createdAt).toLocaleDateString()}</td>
                        <td className="py-4" role="cell">
                          <span
                            className={`px-3 py-1 rounded-md text-white text-xs ${
                              payment.status === "COMPLETED" ? "bg-green-600" : "bg-orange-500"
                            }`}
                          >
                            {payment.status}
                          </span>
                        </td>
                        <td className="py-4 text-right relative" role="cell">
                          <button
                            onClick={() => handleMenuToggle(payment._id)}
                            className="menu-button inline-flex items-center justify-center h-8 w-8 rounded-full hover:bg-gray-100"
                            aria-label={`Actions for payment ${payment._id}`}
                          >
                            <MoreHorizontal size={18} />
                          </button>
                          {openPaymentId === payment._id && (
                            <div className="invoice-menu absolute right-0 mt-2 w-40 bg-white border border-gray-200 shadow-lg rounded-lg overflow-hidden z-10">
                              <button 
                                onClick={() => handleEditPayment(payment)}
                                className="w-full flex items-center space-x-2 text-left px-4 py-2 text-sm hover:bg-gray-50"
                              >
                                <Eye size={16} />
                                <span>Edit</span>
                              </button>
                              <button 
                                onClick={() => handleDeletePayment(payment._id)}
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
          ) : (
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mt-4">
              <h2 className="text-lg font-semibold mb-5">Payment Methods</h2>
              <div className="space-y-4">
                {paymentMethodsData.map((method, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h3 className="text-lg font-semibold">{method.name}</h3>
                      <p className="text-gray-500">{method.account}</p>
                      <p className="text-gray-500">{method.processingTime}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <button className="text-white bg-[var(--primary)] px-3 py-1 rounded-lg">{method.status}</button>
                      <button
                        onClick={() => handleConfigureMethod(method)}
                        className="px-3 py-1 bg-gray-300 text-gray-700 rounded-lg"
                        aria-label={`Configure ${method.name}`}
                      >
                        Configure
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

         
          {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-[40rem]">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-bold">
                    {selectedMethod ? `Configure ${selectedMethod.name}` : "New Payment"}
                  </h2>
                  <button onClick={handleCloseModal} className="text-gray-500 hover:text-gray-700">
                    &times;
                  </button>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    {selectedMethod ? (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Payment Method Name</label>
                          <input
                            type="text"
                            name="name"
                            value={selectedMethod.name}
                            onChange={handleChange}
                            className="mt-1 p-2 w-full border rounded-lg bg-gray-100"
                            readOnly
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Account Number</label>
                          <input
                            type="text"
                            name="account"
                            value={selectedMethod.account}
                            onChange={handleChange}
                            className="mt-1 p-2 w-full border rounded-lg bg-gray-100"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Processing Time</label>
                          <input
                            type="text"
                            name="processingTime"
                            value={selectedMethod.processingTime}
                            onChange={handleChange}
                            className="mt-1 p-2 w-full border rounded-lg bg-gray-100"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Status</label>
                          <select
                            name="status"
                            value={selectedMethod.status}
                            onChange={handleChange}
                            className="mt-1 p-2 w-full border rounded-lg bg-gray-100"
                          >
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Notes</label>
                          <textarea
                            name="notes"
                            value={selectedMethod.notes || ""}
                            onChange={handleChange}
                            placeholder="Enter configuration notes"
                            className="mt-1 p-2 w-full border rounded-lg bg-gray-100"
                            rows={3}
                          ></textarea>
                        </div>
                      </>
                    ) : (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Invoice</label>
                          <select
                            name="invoice"
                            value={formData.invoice}
                            onChange={handleChange}
                            className="mt-1 p-2 w-full border rounded-lg bg-gray-100"
                            required
                          >
                            <option value="">Select invoice</option>
                            {invoices.map((invoice) => (
                              <option key={invoice._id} value={invoice._id}>
                                INV-{invoice._id.slice(-6)} - {invoice.total_value.toLocaleString()} RWF
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Amount</label>
                            <input
                              type="number"
                              step="0.01"
                              name="amount"
                              value={formData.amount}
                              onChange={handleChange}
                              placeholder="Enter amount"
                              className="mt-1 p-2 w-full border rounded-lg bg-gray-100"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Payment Method</label>
                            <select
                              name="method"
                              value={formData.method}
                              onChange={handleChange}
                              className="mt-1 p-2 w-full border rounded-lg bg-gray-100"
                              required
                            >
                              <option value="">Select method</option>
                              {paymentMethods.map((method) => (
                                <option key={method} value={method}>{method.replace('_', ' ')}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Notes</label>
                          <textarea
                            name="notes"
                            value={formData.notes}
                            onChange={handleChange}
                            placeholder="Enter payment notes"
                            className="mt-1 p-2 w-full border rounded-lg bg-gray-100"
                            rows={3}
                          ></textarea>
                        </div>
                      </>
                    )}
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
                        {loading ? 'Saving...' : selectedMethod ? "Save Configuration" : (editingPayment ? "Update Payment" : "Add Payment")}
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