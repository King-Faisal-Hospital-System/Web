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
  PlusCircle,
  DollarSign
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../../store/store";
import {
  fetchDashboardStats,
  receiveStock,
  issueStock,
  adjustStock,
  recordStockCount
} from "../../../store/slices/dashboardSlice";
import { fetchSuppliers } from "../../../store/slices/supplierSlice";
import { useTranslation } from "../../../lib/i18n";

interface FormData {
  productName: string;
  quantity: number;
  notes: string;
  supplier: string;
  batch: string;
  requestNumber: string;
  department: string;
  issueDate: string;
  requestedBy: string;
  requestRemarks: string;
}

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

export default function Dashboard() {
  const dispatch = useDispatch<AppDispatch>();
  const { totalProducts, lowStockItems, expiringSoon, loading, error } = useSelector((state: RootState) => state.dashboard);
  const { suppliers } = useSelector((state: RootState) => state.suppliers);
  const { currentLanguage } = useSelector((state: RootState) => state.language);
  const { t } = useTranslation(currentLanguage);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAction, setSelectedAction] = useState<"receive" | "issue" | "adjust" | "count" | null>(null);
  const [formData, setFormData] = useState<FormData>({
    productName: "",
    quantity: 0,
    notes: "",
    supplier: "",
    batch: "",
    requestNumber: "",
    department: "",
    issueDate: "",
    requestedBy: "",
    requestRemarks: ""
  });
  const [formError, setFormError] = useState<string | null>(null);

  const departments = ["Pharmacy", "Emergency", "Surgery", "Outpatient"];

  useEffect(() => {
    dispatch(fetchDashboardStats());
    dispatch(fetchSuppliers());
  }, [dispatch]);

  const handleQuickAction = (action: "receive" | "issue" | "adjust" | "count") => {
    setSelectedAction(action);
    setFormData({
      productName: "",
      quantity: 0,
      notes: "",
      supplier: "",
      batch: "",
      requestNumber: action === "issue" ? `REQ-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}` : "",
      department: "",
      issueDate: action === "issue" ? new Date().toISOString().split("T")[0] : "",
      requestedBy: "",
      requestRemarks: ""
    });
    setFormError(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAction(null);
    setFormData({
      productName: "",
      quantity: 0,
      notes: "",
      supplier: "",
      batch: "",
      requestNumber: "",
      department: "",
      issueDate: "",
      requestedBy: "",
      requestRemarks: ""
    });
    setFormError(null);
  };

  const validateForm = () => {
    if (!formData.productName.trim()) {
      setFormError(t('Product name is required'));
      return false;
    }
    if (selectedAction !== "count" && formData.quantity <= 0) {
      setFormError(t('Quantity must be greater than 0'));
      return false;
    }
    if (selectedAction === "issue") {
      if (!formData.requestNumber.trim()) {
        setFormError(t('Request number is required'));
        return false;
      }
      if (!formData.department) {
        setFormError(t('Department is required'));
        return false;
      }
      if (!formData.requestedBy.trim()) {
        setFormError(t('Requested by is required'));
        return false;
      }
      if (formData.quantity > 100) {
        setFormError(t('Issued quantity cannot exceed 100'));
        return false;
      }
    }
    if (selectedAction === "receive" && !formData.supplier.trim()) {
      setFormError(t('Supplier is required for receiving stock'));
      return false;
    }
    setFormError(null);
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      if (selectedAction === "receive") {
        await dispatch(receiveStock({
          name: formData.productName,
          quantity: formData.quantity,
          supplierId: formData.supplier,
          batch_number: formData.batch,
          notes: formData.notes
        }));
      } else if (selectedAction === "issue") {
        await dispatch(issueStock({
          name: formData.productName,
          quantity: formData.quantity,
          requestor: formData.requestedBy,
          remark: formData.requestRemarks
        }));
      } else if (selectedAction === "adjust") {
        await dispatch(adjustStock({
          name: formData.productName,
          quantity: formData.quantity,
          notes: formData.notes
        }));
      } else if (selectedAction === "count") {
        await dispatch(recordStockCount({
          name: formData.productName,
          quantity: formData.quantity,
          notes: formData.notes
        }));
      }
      dispatch(fetchDashboardStats());
      handleCloseModal();
    } catch (err) {
      setFormError(t('Failed to submit action'));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "quantity" ? parseInt(value) || 0 : value,
    }));
  };

  if (loading && !totalProducts) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--primary)]"></div>
      </div>
    );
  }

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
              <SidebarNavItem href="/stock_manager/home" icon={LayoutDashboard} label={t('Dashboard')} active />
              <SidebarNavItem href="/stock_manager/inventory" icon={Package} label={t('Inventory')} />
              <SidebarNavItem href="/stock_manager/reports" icon={FileText} label={t('Reports')} />
              
            </ul>
          </nav>
        </div>
        <div className="px-4 pb-6 space-y-3">
          <Link href="/stock_manager/settings" className="flex items-center space-x-3 hover:bg-[var(--input-field)] rounded-lg px-3 py-2 cursor-pointer">
            <Settings size={20} />
            <span>{t('Settings')}</span>
          </Link>
          <Link href="/stock_manager/support" className="flex items-center space-x-3 hover:bg-[var(--input-field)] rounded-lg px-3 py-2 cursor-pointer">
            <Headphones size={20} />
            <span>{t('Support')}</span>
          </Link>
          <Link href="/stock_manager/logout" className="flex items-center space-x-3 hover:bg-red-100 text-red-600 rounded-lg px-3 py-2 cursor-pointer">
            <LogOut size={20} />
            <span>{t('Logout')}</span>
          </Link>
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
              placeholder={t('Search')}
              className="pl-10 pr-4 py-2 w-full rounded-lg bg-[var(--input-field)] outline-none focus:ring-2 focus:ring-[var(--primary)]"
              aria-label="Search dashboard"
            />
          </div>
          <div className="flex items-center space-x-4">
            <Bell size={22} className="cursor-pointer" aria-label="Notifications" />
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
                <p className="text-xs text-gray-500">{t('Pharmacist')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* body */}
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">{t('Dashboard')}</h1>
              <p className="text-gray-500">{t('Inventory Management Overview')}</p>
            </div>
            <Link
              href="/admin/reports"
              className="px-5 py-2 bg-[var(--primary)] text-white rounded-lg shadow hover:opacity-90"
            >
              {t('Generate Report')}
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="bg-white rounded-2xl shadow p-6 flex items-center justify-between">
              <div>
                <h2 className="text-gray-500 font-medium">{t('Total Products')}</h2>
                <p className="text-3xl font-bold text-gray-800">{loading ? '...' : totalProducts}</p>
                <p className="text-gray-400 text-sm">{t('Active Stock Items')}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Package className="h-6 w-6 text-blue-600" />
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow p-6 flex items-center justify-between">
              <div>
                <h2 className="text-gray-500 font-medium">{t('Low Stock Items')}</h2>
                <p className="text-3xl font-bold text-red-600">{loading ? '...' : lowStockItems}</p>
                <p className="text-gray-400 text-sm">{t('Below Reorder Point')}</p>
              </div>
              <div className="p-3 bg-red-100 rounded-full">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow p-6 flex items-center justify-between">
              <div>
                <h2 className="text-gray-500 font-medium">{t('Expiring Soon')}</h2>
                <p className="text-3xl font-bold text-orange-600">{loading ? '...' : expiringSoon}</p>
                <p className="text-gray-400 text-sm">{t('Within 60 Days')}</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-full">
                <Clock className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 mt-6">
            <div className="bg-white shadow rounded-lg p-5 border">
              <h2 className="font-semibold text-lg mb-4">{t('Urgent Actions Required')}</h2>
              <ul className="space-y-4">
                {loading ? (
                  <li className="flex justify-center items-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[var(--primary)]"></div>
                  </li>
                ) : lowStockItems === 0 && expiringSoon === 0 ? (
                  <li className="text-center py-8 text-gray-500">{t('No Urgent Actions Required')}</li>
                ) : (
                  <>
                    {lowStockItems > 0 && (
                      <li className="flex items-center justify-between bg-green-50 rounded-lg p-3">
                        <div className="flex items-center space-x-3">
                          <span className="bg-green-100 text-green-600 p-2 rounded-full">
                            <AlertTriangle size={20} />
                          </span>
                          <div>
                            <p className="font-semibold">{t('Low Stock Items')}</p>
                            <p className="text-sm text-gray-500">{t(`${lowStockItems} items need reordering`)}</p>
                          </div>
                        </div>
                        <Link href="/stock_manager/inventory" className="px-3 py-1 bg-[var(--primary)] text-white rounded-lg text-sm">
                          {t('View')}
                        </Link>
                      </li>
                    )}
                    {expiringSoon > 0 && (
                      <li className="flex items-center justify-between bg-orange-50 rounded-lg p-3">
                        <div className="flex items-center space-x-3">
                          <span className="bg-orange-100 text-orange-600 p-2 rounded-full">
                            <Clock size={20} />
                          </span>
                          <div>
                            <p className="font-semibold">{t('Expiring Items')}</p>
                            <p className="text-sm text-gray-500">{t(`${expiringSoon} items expiring soon`)}</p>
                          </div>
                        </div>
                        <Link href="/admin/inventory" className="px-3 py-1 bg-[var(--primary)] text-white rounded-lg text-sm">
                          {t('View')}
                        </Link>
                      </li>
                    )}
                  </>
                )}
              </ul>
            </div>

            <div className="bg-white shadow rounded-lg p-5 border">
              <h2 className="font-semibold text-lg mb-4">{t('Quick Actions')}</h2>
              <div className="space-y-4">
                <button
                  onClick={() => handleQuickAction("receive")}
                  className="w-full flex items-center justify-start px-3 py-2 gap-5 bg-[var(--primary)] text-white rounded-lg text-sm"
                >
                  <Plus size={16} /> {t('Receive Stock')}
                </button>
                <button
                  onClick={() => handleQuickAction("issue")}
                  className="w-full flex items-center justify-start px-3 py-2 gap-5 bg-white text-[var(--primary)] border border-[var(--primary)] rounded-lg text-sm"
                >
                  <Minus size={16} /> {t('Issue Stock')}
                </button>
                <button
                  onClick={() => handleQuickAction("adjust")}
                  className="w-full flex items-center justify-start px-3 py-2 gap-5 bg-white text-[var(--primary)] border border-[var(--primary)] rounded-lg text-sm"
                >
                  <PlusCircle size={16} /> {t('Stock Adjustment')}
                </button>
                <button
                  onClick={() => handleQuickAction("count")}
                  className="w-full flex items-center justify-start px-3 py-2 gap-5 bg-white text-[var(--primary)] border border-[var(--primary)] rounded-lg text-sm"
                >
                  <Package size={16} /> {t('Stock Count')}
                </button>
              </div>
            </div>
          </div>
        </main>

        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[40rem]">
              <div className="flex justify-between items-center mb-4 border-b pb-2">
                <h2 className="text-lg font-bold">
                  {selectedAction === "receive" ? t('Receive Stock') :
                   selectedAction === "issue" ? t('Issue Stock') :
                   selectedAction === "adjust" ? t('Stock Adjustment') :
                   t('Stock Count')}
                </h2>
                <button onClick={handleCloseModal} className="text-gray-500 hover:text-gray-700" aria-label="Close modal">
                  &times;
                </button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">{t('Product Name')}</label>
                  <input
                    type="text"
                    name="productName"
                    value={formData.productName}
                    onChange={handleChange}
                    placeholder={t('Select or enter product name')}
                    className="mt-1 p-2 w-full border rounded-lg bg-gray-100"
                    required
                  />
                </div>
                {selectedAction === "issue" && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">{t('Request Number')}</label>
                      <input
                        type="text"
                        name="requestNumber"
                        value={formData.requestNumber}
                        onChange={handleChange}
                        className="mt-1 p-2 w-full border rounded-lg bg-gray-100"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">{t('Department')}</label>
                        <select
                          name="department"
                          value={formData.department}
                          onChange={handleChange}
                          className="mt-1 p-2 w-full border rounded-lg bg-gray-100"
                          required
                        >
                          <option value="">{t('Select department')}</option>
                          {departments.map((dept) => (
                            <option key={dept} value={dept}>
                              {t(dept)}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">{t('Issue Date')}</label>
                        <input
                          type="date"
                          name="issueDate"
                          value={formData.issueDate}
                          onChange={handleChange}
                          className="mt-1 p-2 w-full border rounded-lg bg-gray-100"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">{t('Requested By')}</label>
                      <input
                        type="text"
                        name="requestedBy"
                        value={formData.requestedBy}
                        onChange={handleChange}
                        className="mt-1 p-2 w-full border rounded-lg bg-gray-100"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">{t('Request Remarks')}</label>
                      <textarea
                        name="requestRemarks"
                        value={formData.requestRemarks}
                        onChange={handleChange}
                        className="mt-1 p-2 w-full border rounded-lg bg-gray-100"
                        rows={3}
                      ></textarea>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">{t('Issued Quantity')}</label>
                      <input
                        type="number"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        min={1}
                        max={100}
                        className="mt-1 p-2 w-full border rounded-lg bg-gray-100"
                        required
                      />
                    </div>
                  </>
                )}
                {selectedAction === "receive" && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">{t('Received Quantity')}</label>
                      <input
                        type="number"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        min={1}
                        className="mt-1 p-2 w-full border rounded-lg bg-gray-100"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">{t('Supplier')}</label>
                      <select
                        name="supplier"
                        value={formData.supplier}
                        onChange={handleChange}
                        className="mt-1 p-2 w-full border rounded-lg bg-gray-100"
                        required
                      >
                        <option value="">{t('Select supplier')}</option>
                        {suppliers.map((supplier) => (
                          <option key={supplier._id} value={supplier._id}>
                            {supplier.company_name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">{t('Batch Number')}</label>
                      <input
                        type="text"
                        name="batch"
                        value={formData.batch}
                        onChange={handleChange}
                        placeholder={t('Enter batch number')}
                        className="mt-1 p-2 w-full border rounded-lg bg-gray-100"
                      />
                    </div>
                  </>
                )}
                {selectedAction === "adjust" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">{t('Adjusted Quantity')}</label>
                    <input
                      type="number"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleChange}
                      min={-100}
                      max={100}
                      className="mt-1 p-2 w-full border rounded-lg bg-gray-100"
                      required
                    />
                  </div>
                )}
                {selectedAction === "count" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">{t('Counted Quantity')}</label>
                    <input
                      type="number"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleChange}
                      min={0}
                      className="mt-1 p-2 w-full border rounded-lg bg-gray-100"
                      required
                    />
                  </div>
                )}
                {(selectedAction === "receive" || selectedAction === "adjust" || selectedAction === "count") && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">{t('Additional Notes')}</label>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      placeholder={t('Enter additional notes')}
                      className="mt-1 p-2 w-full border rounded-lg bg-gray-100"
                      rows={3}
                    ></textarea>
                  </div>
                )}
                {formError && <p className="text-red-500 text-sm">{formError}</p>}
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="px-4 py-2 border rounded-lg"
                  >
                    {t('Cancel')}
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[var(--primary)] text-white rounded-lg"
                  >
                    {selectedAction === "receive" ? t('Receive Stock') :
                     selectedAction === "issue" ? t('Issue Stock') :
                     selectedAction === "adjust" ? t('Stock Adjustment') :
                     t('Save Count')}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}