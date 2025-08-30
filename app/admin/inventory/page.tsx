
"use client";

import {
  LayoutDashboard,
  Package,
  MoreHorizontal,
  Eye,
  Pencil,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Plus,
  Download,
  FileText,
  Truck,
  DollarSign,
  CreditCard,
  Users,
  Settings,
  Headphones,
  LogOut,
  Search,
  Bell
} from "lucide-react";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import {
  fetchMedicines,
  addMedicine,
  updateMedicine,
  issueStock,
  recordReceipt,
} from "@/store/slices/inventorySlice";
import { fetchSuppliers } from "@/store/slices/supplierSlice";
import { useLanguageContext } from "../../../components/LanguageProvider";
import { Sidebar } from "../../../components/Sidebar";
import Header from "@/components/Header";

export type MedicineStatus = "GOOD" | "LOW";

interface Medicine {
  id: string;
  name: string;
  batch_number?: string;
  received?: number;
  issued?: number;
  balance?: number;
  expiry?: string;
  unit_price?: number;
  status: MedicineStatus;
  category?: string;
  product_description?: string;
  notes?: string;
  supplierId?: string;
  form?: string;
  minStock?: number;
  quantity?: number;
}

interface FormData {
  name: string;
  category: string;
  form: string;
  product_description: string;
  supplierId: string | "";
  batch: string;
  received: number;
  expiry: string;
  unitCost: number;
  notes: string;
  requestNumber: string;
  department: string;
  issueDate: string;
  requestedBy: string;
  requestRemarks: string;
}

export default function InventoryPage() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const menuRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMedicine, setSelectedMedicine] = useState<Medicine | null>(null);
  const [actionType, setActionType] = useState<"add" | "receipt" | "issue" | "edit">("add");
  const [formData, setFormData] = useState<FormData>({
    name: "",
    category: "",
    form: "",
    product_description: "",
    supplierId: "",
    batch: "",
    received: 0,
    expiry: "",
    unitCost: 0,
    notes: "",
    requestNumber: "",
    department: "",
    issueDate: "",
    requestedBy: "",
    requestRemarks: "",
  });
  const [viewDetails, setViewDetails] = useState<Medicine | null>(null);

  const { medicines, loading, error } = useSelector((state: RootState) => state.inventory);
  const { suppliers } = useSelector((state: RootState) => state.suppliers);
  const { currentLanguage } = useSelector((state: RootState) => state.language);
  const { t } = useLanguageContext();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchMedicines());
    dispatch(fetchSuppliers());
  }, [dispatch]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (openMenu) {
        const isClickInsideAnyMenu = Object.values(menuRefs.current).some(
          (ref) => ref && ref.contains(e.target as Node)
        );
        if (!isClickInsideAnyMenu) {
          setOpenMenu(null);
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openMenu]);

  const categories = ["TABLETS", "CAPSULE", "SYRUP", "INJECTION", "CREAM", "DROPS"];
  const units = ["PIECES", "BOXES", "BOTTLES", "PACKS", "KILOGRAMS", "LITERS"];
  const departments = ["Pharmacy", "Emergency", "Surgery", "Outpatient"];

  const handleAddProduct = () => {
    setSelectedMedicine(null);
    setActionType("add");
    setFormData({
      name: "",
      category: "",
      form: "",
      product_description: "",
      supplierId: "",
      batch: "",
      received: 0,
      expiry: "",
      unitCost: 0,
      notes: "",
      requestNumber: "",
      department: "",
      issueDate: "",
      requestedBy: "",
      requestRemarks: "",
    });
    setIsModalOpen(true);
    setOpenMenu(null);
  };

  const handleEditProduct = (medicine: Medicine) => {
    setSelectedMedicine(medicine);
    setActionType("edit");
    setFormData({
      name: medicine.name,
      category: medicine.category || "",
      form: medicine.form || "",
      product_description: medicine.product_description || "",
      supplierId: medicine.supplierId || "",
      batch: medicine.batch_number || "",
      received: medicine.quantity || 0,
      expiry: medicine.expiry || "",
      unitCost: medicine.unit_price || 0,
      notes: medicine.notes || "",
      requestNumber: "",
      department: "",
      issueDate: "",
      requestedBy: "",
      requestRemarks: "",
    });
    setIsModalOpen(true);
    setOpenMenu(null);
  };

  const handleViewDetails = (medicine: Medicine) => {
    setViewDetails(medicine);
    setIsModalOpen(true);
    setOpenMenu(null);
  };

  const handleRecordReceipt = (medicine: Medicine) => {
    setSelectedMedicine(medicine);
    setActionType("receipt");
    setFormData({
      ...formData,
      name: medicine.name,
      category: medicine.category || "",
      form: medicine.form || "",
      product_description: medicine.product_description || "",
      supplierId: medicine.supplierId || "",
      batch: medicine.batch_number || "",
      received: 0,
      expiry: medicine.expiry || "",
      unitCost: medicine.unit_price || 0,
      notes: medicine.notes || "",
    });
    setIsModalOpen(true);
    setOpenMenu(null);
  };

  const handleIssueStock = (medicine: Medicine) => {
    setSelectedMedicine(medicine);
    setActionType("issue");
    setFormData({
      ...formData,
      name: medicine.name,
      category: medicine.category || "",
      form: medicine.form || "",
      product_description: medicine.product_description || "",
      supplierId: medicine.supplierId || "",
      batch: medicine.batch_number || "",
      received: 0,
      expiry: medicine.expiry || "",
      unitCost: medicine.unit_price || 0,
      notes: medicine.notes || "",
      requestNumber: `REQ-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
      issueDate: new Date().toISOString().split("T")[0],
      requestedBy: "",
      requestRemarks: "",
      department: "",
    });
    setIsModalOpen(true);
    setOpenMenu(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMedicine(null);
    setActionType("add");
    setViewDetails(null);
    setFormData({
      name: "",
      category: "",
      form: "",
      product_description: "",
      supplierId: "",
      batch: "",
      received: 0,
      expiry: "",
      unitCost: 0,
      notes: "",
      requestNumber: "",
      department: "",
      issueDate: "",
      requestedBy: "",
      requestRemarks: "",
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (actionType === "add") {
      if (!formData.name || !formData.category || !formData.form || !formData.supplierId || formData.received <= 0) {
        alert(t("Please fill in all required fields: Product Name, Category, Unit, Supplier, and valid Quantity."));
        return;
      }
      dispatch(
        addMedicine({
          name: formData.name,
          product_description: formData.product_description,
          category: formData.category,
          form: formData.form,
          supplier: formData.supplierId,
          batch_number: formData.batch,
          expiry_date: formData.expiry,
          unit_price: formData.unitCost,
          notes: formData.notes,
          quantity: formData.received,
          total_value: formData.received * formData.unitCost,
        })
      ).then(() => dispatch(fetchMedicines()));
    } else if (actionType === "edit" && selectedMedicine) {
      if (!formData.name || !formData.category || !formData.form || !formData.supplierId || formData.received < 0) {
        alert(t("Please fill in all required fields: Product Name, Category, Unit, Supplier, and valid Quantity."));
        return;
      }
      dispatch(
        updateMedicine({
          id: selectedMedicine.id,
          name: formData.name,
          product_description: formData.product_description,
          category: formData.category,
          form: formData.form,
          supplier: formData.supplierId,
          batch_number: formData.batch,
          expiry_date: formData.expiry,
          unit_price: formData.unitCost,
          notes: formData.notes,
          quantity: formData.received,
        })
      ).then(() => dispatch(fetchMedicines()));
    } else if (actionType === "receipt" && selectedMedicine) {
      if (formData.received <= 0) {
        alert(t("Please enter a valid quantity."));
        return;
      }
      dispatch(
        recordReceipt({
          id: selectedMedicine.id,
          quantity: formData.received,
          batch_number: formData.batch,
          notes: formData.notes,
        })
      ).then(() => dispatch(fetchMedicines()));
    } else if (actionType === "issue" && selectedMedicine) {
      if (!formData.requestNumber || !formData.department || !formData.requestedBy || formData.received <= 0 || formData.received > (selectedMedicine.balance || 0)) {
        alert(t("Please fill in all required fields and ensure the quantity is valid and does not exceed available balance."));
        return;
      }
      dispatch(
        issueStock({
          id: selectedMedicine.id,
          quantity: formData.received,
          requestor: formData.requestedBy,
          remark: formData.requestRemarks,
        })
      ).then(() => dispatch(fetchMedicines()));
    }

    handleCloseModal();
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "received" && { received: parseInt(value) || 0 }),
      ...(name === "unitCost" && { unitCost: parseFloat(value) || 0 }),
    }));
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
        status: (balance < 10 ? "LOW" : "GOOD") as MedicineStatus,
        totalValue: received * unitCost,
        formattedExpiry: med.expiry ? new Date(med.expiry).toLocaleDateString() : "-",
        displayBatch: med.batch_number ?? "-",
      };
    });

  const totalMedicines = medicines.length;
  const lowStock = medicinesWithStatus.filter((m) => m.status === "LOW").length;
  const totalValue = medicinesWithStatus.reduce((sum, m) => sum + m.totalValue, 0);

  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex flex-col flex-1">
        {/* Header */}
        <Header />

        {/* Body */}
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">{t("Inventory Management")}</h1>
            <button
              onClick={handleAddProduct}
              className="flex items-center space-x-2 px-5 py-2 bg-[var(--primary)] text-white rounded-lg shadow hover:opacity-90"
              aria-label={t("Add new product")}
            >
              <Plus size={18} /> <span>{t("Add Product")}</span>
            </button>
          </div>

          <div className="space-y-4">
            {loading && (
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[var(--primary)]"></div>
              </div>
            )}
            {error && <p className="text-red-500">{t("Error")}: {error}</p>}
            {medicinesWithStatus.map((med) => (
              <div
                key={med.id}
                className="p-4 border rounded-xl relative bg-white shadow-sm"
              >
                <div
                  className="absolute top-3 right-3"
                  ref={(el) => {
                    menuRefs.current[med.id] = el; // Assign without returning
                  }}
                >
                  <button
                    onClick={() => setOpenMenu(openMenu === med.id ? null : med.id)}
                    className="p-1 rounded-full hover:bg-gray-100"
                    aria-label={t("More options")}
                  >
                    <MoreHorizontal size={20} />
                  </button>
                  {openMenu === med.id && (
                    <div className="absolute right-0 mt-2 w-40 bg-white border shadow-lg rounded-lg z-10">
                      <button
                        onClick={() => handleViewDetails(med)}
                        className="flex items-center w-full px-4 py-2 text-sm hover:bg-gray-50"
                      >
                        <Eye size={16} className="mr-2" /> {t("View Details")}
                      </button>
                      <button
                        onClick={() => handleEditProduct(med)}
                        className="flex items-center w-full px-4 py-2 text-sm hover:bg-gray-50"
                      >
                        <Pencil size={16} className="mr-2" /> {t("Edit Product")}
                      </button>
                      <button
                        onClick={() => handleRecordReceipt(med)}
                        className="flex items-center w-full px-4 py-2 text-sm hover:bg-gray-50"
                      >
                        <TrendingUp size={16} className="mr-2" /> {t("Record Receipt")}
                      </button>
                      <button
                        onClick={() => handleIssueStock(med)}
                        className="flex items-center w-full px-4 py-2 text-sm hover:bg-gray-50"
                      >
                        <TrendingDown size={16} className="mr-2" /> {t("Issue Stock")}
                      </button>
                    </div>
                  )}
                </div>

                <div className="flex items-center space-x-3">
                  {med.status === "GOOD" ? (
                    <div className="w-6 h-6 flex items-center justify-center rounded-full bg-green-100">
                      <Package size={16} className="text-green-600" />
                    </div>
                  ) : (
                    <div className="w-6 h-6 flex items-center justify-center rounded-full bg-orange-100">
                      <AlertTriangle size={16} className="mr-2" />
                    </div>
                  )}
                  <h3 className="font-semibold text-lg">{med.name}</h3>
                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-md ${
                      med.status === "GOOD" ? "text-green-700 bg-green-100" : "text-orange-700 bg-orange-100"
                    }`}
                  >
                    {med.status}
                  </span>
                </div>

                <div className="grid grid-cols-6 gap-6 text-sm mt-3 text-gray-700">
                  <p>
                    {t("Batch")}: <span className="font-medium">{med.displayBatch}</span>
                  </p>
                  <p>
                    {t("Received")}: <span className="font-medium">{med.received}</span>
                  </p>
                  <p>
                    {t("Issued")}: <span className="font-medium">{med.issued}</span>
                  </p>
                  <p>
                    {t("Balance")}: <span className="font-medium">{med.balance}</span>
                  </p>
                  <p>
                    {t("Expiry")}: <span className="font-medium text-red-500">{med.formattedExpiry}</span>
                  </p>
                  <p>
                    {t("Unit Cost")}: <span className="font-medium">{med.unitCost.toLocaleString()} Rwf</span>
                  </p>
                </div>
                <p className="text-gray-800 mt-2 font-semibold">
                  {t("Total Value")}: {med.totalValue.toLocaleString()} Rwf
                </p>

                {med.status === "LOW" && (
                  <div className="mt-3 bg-orange-50 border border-orange-200 text-orange-700 p-3 text-sm rounded-lg">
                    {t("Low stock level")} – {t("Only")} {med.balance} {t("units remaining (Reorder needed)")}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center mt-6 text-sm text-gray-600">
            <p>
              {t("Total")}: <span className="font-semibold">{totalMedicines}</span> {t("medicines")} • {t("Low")}:{" "}
              <span className="font-semibold">{lowStock}</span> • {t("Value")}:{" "}
              <span className="font-semibold">{totalValue.toLocaleString()}</span> Rwf
            </p>
            <button className="flex items-center space-x-2 px-4 py-2 border rounded-lg shadow-sm hover:bg-gray-50">
              <Download size={16} />
              <span>{t("Export List")}</span>
            </button>
          </div>

          {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-[40rem]">
                <div className="flex justify-between items-center mb-4 border-b pb-2">
                  <h2 className="text-lg font-bold">
                    {actionType === "add"
                      ? t("Add Product")
                      : actionType === "edit"
                      ? t("Edit Product")
                      : actionType === "receipt"
                      ? t("Receive Stock")
                      : actionType === "issue"
                      ? t("Issue Stock")
                      : t("View Details")}
                  </h2>
                  <button onClick={handleCloseModal} className="text-gray-500 hover:text-gray-700" aria-label={t("Close modal")}>
                    &times;
                  </button>
                </div>
                {viewDetails ? (
                  <div className="space-y-4 text-sm text-gray-700">
                    <p><strong>{t("Name")}:</strong> {viewDetails.name}</p>
                    <p><strong>{t("Batch")}:</strong> {viewDetails.batch_number || "-"}</p>
                    <p><strong>{t("Category")}:</strong> {viewDetails.category || "-"}</p>
                    <p><strong>{t("Form")}:</strong> {viewDetails.form || "-"}</p>
                    <p><strong>{t("Received")}:</strong> {viewDetails.received || 0}</p>
                    <p><strong>{t("Issued")}:</strong> {viewDetails.issued || 0}</p>
                    <p><strong>{t("Balance")}:</strong> {viewDetails.balance || 0}</p>
                    <p><strong>{t("Expiry")}:</strong> {viewDetails.expiry ? new Date(viewDetails.expiry).toLocaleDateString() : "-"}</p>
                    <p><strong>{t("Unit Cost")}:</strong> {(viewDetails.unit_price || 0).toLocaleString()} Rwf</p>
                    <p><strong>{t("Total Value")}:</strong> {((viewDetails.received || 0) * (viewDetails.unit_price || 0)).toLocaleString()} Rwf</p>
                    <p><strong>{t("Supplier")}:</strong> {viewDetails.supplierId || "-"}</p>
                    <p><strong>{t("Description")}:</strong> {viewDetails.product_description || "-"}</p>
                    <p><strong>{t("Notes")}:</strong> {viewDetails.notes || "-"}</p>
                    <div className="flex justify-end mt-4">
                      <button
                        onClick={handleCloseModal}
                        className="px-4 py-2 border rounded-lg"
                      >
                        {t("Close")}
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {actionType === "issue" && (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">{t("Request Number")}</label>
                          <input
                            type="text"
                            name="requestNumber"
                            value={formData.requestNumber}
                            onChange={handleInputChange}
                            className="mt-1 p-2 w-full border rounded-lg bg-gray-100"
                            required
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700">{t("Department")}</label>
                            <select
                              name="department"
                              value={formData.department}
                              onChange={handleInputChange}
                              className="mt-1 p-2 w-full border rounded-lg bg-gray-100"
                              required
                            >
                              <option value="">{t("Select department")}</option>
                              {departments.map((dept) => (
                                <option key={dept} value={dept}>
                                  {t(dept)}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">{t("Issue Date")}</label>
                            <input
                              type="date"
                              name="issueDate"
                              value={formData.issueDate}
                              onChange={handleInputChange}
                              className="mt-1 p-2 w-full border rounded-lg bg-gray-100"
                              required
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">{t("Requested By")}</label>
                          <input
                            type="text"
                            name="requestedBy"
                            value={formData.requestedBy}
                            onChange={handleInputChange}
                            className="mt-1 p-2 w-full border rounded-lg bg-gray-100"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">{t("Request Remark")}</label>
                          <textarea
                            name="requestRemarks"
                            value={formData.requestRemarks}
                            onChange={handleInputChange}
                            className="mt-1 p-2 w-full border rounded-lg bg-gray-100"
                            rows={3}
                          ></textarea>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700">{t("Medicine")}</label>
                            <input
                              type="text"
                              value={selectedMedicine?.name || ""}
                              className="mt-1 p-2 w-full border rounded-lg bg-gray-100"
                              disabled
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">{t("Quantity")}</label>
                            <input
                              type="number"
                              name="received"
                              value={formData.received}
                              onChange={handleInputChange}
                              className="mt-1 p-2 w-full border rounded-lg bg-gray-100"
                              min="1"
                              max={selectedMedicine?.balance}
                              required
                            />
                          </div>
                        </div>
                      </>
                    )}
                    {(actionType === "add" || actionType === "edit" || actionType === "receipt") && (
                      <>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700">{t("Product Name")}</label>
                            <input
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleInputChange}
                              className="mt-1 p-2 w-full border rounded-lg bg-gray-100"
                              required={actionType !== "receipt"}
                              disabled={actionType === "receipt"}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">{t("Category")}</label>
                            <select
                              name="category"
                              value={formData.category}
                              onChange={handleInputChange}
                              className="mt-1 p-2 w-full border rounded-lg bg-gray-100"
                              required={actionType !== "receipt"}
                              disabled={actionType === "receipt"}
                            >
                              <option value="">{t("Select category")}</option>
                              {categories.map((cat) => (
                                <option key={cat} value={cat}>
                                  {t(cat)}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">{t("Description")}</label>
                          <textarea
                            name="product_description"
                            value={formData.product_description}
                            onChange={handleInputChange}
                            className="mt-1 p-2 w-full border rounded-lg bg-gray-100"
                            rows={3}
                          ></textarea>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700">{t("Supplier")}</label>
                            <select
                              name="supplierId"
                              value={formData.supplierId}
                              onChange={handleInputChange}
                              className="mt-1 p-2 w-full border rounded-lg bg-gray-100"
                              disabled={actionType === "receipt"}
                            >
                              <option value="">{t("Select supplier")}</option>
                              {suppliers.map((supplier) => (
                                <option key={supplier._id} value={supplier._id}>
                                  {supplier.company_name}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">{t("Batch Number")}</label>
                            <input
                              type="text"
                              name="batch"
                              value={formData.batch}
                              onChange={handleInputChange}
                              className="mt-1 p-2 w-full border rounded-lg bg-gray-100"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700">
                              {actionType === "receipt" ? t("Quantity Received") : t("Initial Quantity")}
                            </label>
                            <input
                              type="number"
                              name="received"
                              value={formData.received}
                              onChange={handleInputChange}
                              className="mt-1 p-2 w-full border rounded-lg bg-gray-100"
                              min="0"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">{t("Unit")}</label>
                            <select
                              name="form"
                              value={formData.form}
                              onChange={handleInputChange}
                              className="mt-1 p-2 w-full border rounded-lg bg-gray-100"
                              required={actionType !== "receipt"}
                              disabled={actionType === "receipt"}
                            >
                              <option value="">{t("Select unit")}</option>
                              {units.map((unit) => (
                                <option key={unit} value={unit}>
                                  {t(unit)}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700">{t("Expiry Date")}</label>
                            <input
                              type="date"
                              name="expiry"
                              value={formData.expiry}
                              onChange={handleInputChange}
                              className="mt-1 p-2 w-full border rounded-lg bg-gray-100"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">{t("Unit Cost (RWF)")}</label>
                            <input
                              type="number"
                              name="unitCost"
                              value={formData.unitCost}
                              onChange={handleInputChange}
                              className="mt-1 p-2 w-full border rounded-lg bg-gray-100"
                              step="0.01"
                              min="0"
                              required={actionType !== "receipt"}
                              disabled={actionType === "receipt"}
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">{t("Additional Notes")}</label>
                          <textarea
                            name="notes"
                            value={formData.notes}
                            onChange={handleInputChange}
                            className="mt-1 p-2 w-full border rounded-lg bg-gray-100"
                            rows={2}
                          ></textarea>
                        </div>
                      </>
                    )}
                    <div className="flex justify-end space-x-4 mt-4">
                      <button
                        type="button"
                        onClick={handleCloseModal}
                        className="px-4 py-2 border rounded-lg"
                      >
                        {t("Cancel")}
                      </button>
                      {(actionType === "add" || actionType === "edit" || actionType === "receipt" || actionType === "issue") && (
                        <button
                          type="submit"
                          className="px-4 py-2 bg-[var(--primary)] text-white rounded-lg"
                        >
                          {actionType === "add"
                            ? t("Add Product")
                            : actionType === "edit"
                            ? t("Update Product")
                            : actionType === "receipt"
                            ? t("Receive Stock")
                            : t("Issue Stock")}
                        </button>
                      )}
                    </div>
                  </form>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}