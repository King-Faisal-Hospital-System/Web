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
  Eye,
  Pencil,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Plus,
  Download,
  DollarSign
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import {
  fetchMedicines,
  addMedicine,
  issueStock,
  recordReceipt,
} from "@/store/slices/inventorySlice";

export default function InventoryPage() {
  const [openMenu, setOpenMenu] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMedicine, setSelectedMedicine] = useState<any>(null);
  const [actionType, setActionType] = useState<"add" | "receipt" | "issue">("add");
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    supplierId: "",
    batch: "",
    received: 0,
    unit: "",
    minStock: 0,
    expiry: "",
    unitCost: 0,
    notes: "",
    requestNumber: "",
    department: "",
    issueDate: "",
    requestedBy: "",
    requestRemarks: "",
    form:""
  });

  const { medicines, loading, error } = useSelector((state: RootState) => state.inventory);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchMedicines());
  }, [dispatch]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const totalMedicines = medicines.length;
  const lowStock = medicines.filter((m) => m.status === "LOW").length;
  const totalValue = medicines.reduce(
    (sum, m) => sum + m.received * m.unitCost,
    0
  );

const suppliers = ["PharmaSupply Ltd", "MedCore Inc", "HealthPlus Co", "Global Med Supplied"];
  const units = ["Pieces", "Boxes", "Bottles", "Packets", "Kilograms", "Liters"];
  const categories = ["TABLET", "CAPSULE", "SYRUP", "INJECTION", "CREAM", "DROPS"]; // Ensure this matches backend enum
  const departments = ["Pharmacy", "Emergency", "Surgery", "Outpatient"];

  const handleAddProduct = () => {
    setSelectedMedicine(null);
    setActionType("add");
    setFormData({
      name: "",
      category: "",
      description: "",
      supplierId: "",
      batch: "",
      received: 0,
      unit: "",
      minStock: 0,
      expiry: "",
      unitCost: 0,
      notes: "",
      requestNumber: "",
      department: "",
      issueDate: "",
      requestedBy: "",
      requestRemarks: "",
      form: formData.category,
    });
    setIsModalOpen(true);
  };

  const handleRecordReceipt = (medicine: any) => {
    setSelectedMedicine(medicine);
    setActionType("receipt");
    setFormData({
      ...formData,
      batch: medicine.batch,
      expiry: medicine.expiry,
      unitCost: medicine.unitCost,
      received: medicine.received, 
    });
    setIsModalOpen(true);
  };

  const handleIssueStock = (medicine: any) => {
    setSelectedMedicine(medicine);
    setActionType("issue");
    setFormData({
      ...formData,
      requestNumber: "REQ-2025-XXX",
      issueDate: "2025-08-25",
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMedicine(null);
    setActionType("add");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (actionType === "add") {
      dispatch(addMedicine({
        name: formData.name,
         category: formData.category,
        received: formData.received,
        description: formData.description,
        supplierId: formData.supplierId,
        batch: formData.batch,
        expiry: formData.expiry,
        unitCost: formData.unitCost,
        notes: formData.notes,
        unit: formData.unit,
        minStock: formData.minStock,
        
      }));
    } else if (actionType === "receipt" && selectedMedicine) {
      dispatch(recordReceipt({
        id: selectedMedicine.id,
        quantity: formData.received, 
        batch_number: formData.batch,
        notes: formData.notes,
      }));
    } else if (actionType === "issue" && selectedMedicine) {
      dispatch(issueStock({
        id: selectedMedicine.id,
        quantity: formData.received, 
        requestor: formData.requestedBy,
        remark: formData.requestRemarks,
      }));
    }
    setIsModalOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "received" && { received: parseInt(value) || 0 }), 
      ...(name === "unitCost" && { unitCost: parseFloat(value) || 0 }), 
      ...(name === "minStock" && { minStock: parseInt(value) || 0 }),
    }));
  };

  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-white shadow-sm flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-start h-20">
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
                  <DollarSign size={20} />
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
        <div className="flex justify-between items-center bg-white px-6 py-4 border-b h-50 border-gray-200">
          <div className="relative w-72">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search medicines..."
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
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold">Inventory Management</h1>
              <p className="text-gray-500">
                Manage your stock levels and track products
              </p>
            </div>
            <button onClick={handleAddProduct} className="flex items-center space-x-2 px-5 py-2 bg-[var(--primary)] text-white rounded-lg shadow hover:opacity-90">
              <Plus size={18} />
              <span>Add Product</span>
            </button>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-gray-800">
                Available Stock
              </h2>
              <div className="relative w-72">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Search medicines ..."
                  className="pl-9 pr-4 py-2 w-full text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--primary)] outline-none"
                />
              </div>
            </div>
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {medicines.map((med) => (
              <div
                key={med.id}
                ref={menuRef}
                className="p-4 border rounded-xl relative bg-white shadow-sm"
              >
                <div className="absolute top-3 right-3">
                  <button
                    onClick={() => setOpenMenu(openMenu === med.id ? null : med.id)}
                    className="p-1 rounded-full hover:bg-gray-100"
                  >
                    <MoreHorizontal size={20} />
                  </button>
                  {openMenu === med.id && (
                    <div className="absolute right-0 mt-2 w-40 bg-white border shadow-lg rounded-lg z-10">
                      <button className="flex items-center w-full px-4 py-2 text-sm hover:bg-gray-50">
                        <Eye size={16} className="mr-2" /> View Details
                      </button>
                      <button className="flex items-center w-full px-4 py-2 text-sm hover:bg-gray-50">
                        <Pencil size={16} className="mr-2" /> Edit Product
                      </button>
                      <button
                        onClick={() => handleRecordReceipt(med)}
                        className="flex items-center w-full px-4 py-2 text-sm hover:bg-gray-50"
                      >
                        <TrendingUp size={16} className="mr-2" /> Record Receipt
                      </button>
                      <button
                        onClick={() => handleIssueStock(med)}
                        className="flex items-center w-full px-4 py-2 text-sm hover:bg-gray-50"
                      >
                        <TrendingDown size={16} className="mr-2" /> Issue Stock
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
                      <AlertTriangle size={16} className="text-orange-600" />
                    </div>
                  )}
                  <h3 className="font-semibold text-lg">{med.name}</h3>
                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-md ${
                      med.status === "GOOD"
                        ? "text-green-700 bg-green-100"
                        : "text-orange-700 bg-orange-100"
                    }`}
                  >
                    {med.status}
                  </span>
                </div>
                <div className="grid grid-cols-6 gap-6 text-sm mt-3 text-gray-700">
                  <p>Batch: <span className="font-medium">{med.batch}</span></p>
                  <p>Received: <span className="font-medium">{med.received}</span></p>
                  <p>Issued: <span className="font-medium">{med.issued}</span></p>
                  <p>Balance: <span className="font-medium">{med.balance}</span></p>
                  <p>
                    Expiry: <span className="font-medium text-red-500">{med.expiry}</span>
                  </p>
                  <p>Unit Cost: <span className="font-medium">{med.unitCost} Rwf</span></p>
                </div>
                <p className="text-gray-800 mt-2 font-semibold">
                  Total Value: {(med.received * med.unitCost).toLocaleString()} Rwf
                </p>
                {med.status === "LOW" && (
                  <div className="mt-3 bg-orange-50 border border-orange-200 text-orange-700 p-3 text-sm rounded-lg">
                    Low stock level – Only {med.balance} units remaining (Reorder needed)
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center mt-6 text-sm text-gray-600">
            <p>
              Total: <span className="font-semibold">{totalMedicines}</span> medicines •
              Low: <span className="font-semibold">{lowStock}</span> •
              Value: <span className="font-semibold">{totalValue.toLocaleString()}</span> Rwf
            </p>
            <button className="flex items-center space-x-2 px-4 py-2 border rounded-lg shadow-sm hover:bg-gray-50">
              <Download size={16} />
              <span>Export List</span>
            </button>
          </div>
        </main>
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[40rem]">
              <div className="flex justify-between items-center mb-4 border-b pb-2">
                <h2 className="text-lg font-bold">
                  {actionType === "add" ? "Add Product" : actionType === "receipt" ? "Receive Stock" : "Issue Stock"}
                </h2>
                <button onClick={handleCloseModal} className="text-gray-500 hover:text-gray-700">
                  &times;
                </button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                {actionType === "issue" && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Request Number</label>
                      <input
                        type="text"
                        name="requestNumber"
                        value={formData.requestNumber}
                        onChange={handleInputChange}
                        className="mt-1 p-2 w-full border rounded-lg bg-gray-100"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Department</label>
                        <select
                          name="department"
                          value={formData.department}
                          onChange={handleInputChange}
                          className="mt-1 p-2 w-full border rounded-lg bg-gray-100"
                        >
                          <option value="">Select department</option>
                          {departments.map((dept) => (
                            <option key={dept} value={dept}>{dept}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Issue Date</label>
                        <input
                          type="date"
                          name="issueDate"
                          value={formData.issueDate}
                          onChange={handleInputChange}
                          className="mt-1 p-2 w-full border rounded-lg bg-gray-100"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Requested By</label>
                      <input
                        type="text"
                        name="requestedBy"
                        value={formData.requestedBy}
                        onChange={handleInputChange}
                        className="mt-1 p-2 w-full border rounded-lg bg-gray-100"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Request Remark</label>
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
                        <label className="block text-sm font-medium text-gray-700">Medicine</label>
                        <select
                          name="medicine"
                          value={selectedMedicine?.name || ""}
                          onChange={(e) => setSelectedMedicine(medicines.find(m => m.name === e.target.value) || null)}
                          className="mt-1 p-2 w-full border rounded-lg bg-gray-100"
                        >
                          <option value="">Choose medicine</option>
                          {medicines.map((med) => (
                            <option key={med.id} value={med.name}>{med.name}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Quantity</label>
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
                {(actionType === "add" || actionType === "receipt") && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Product Name</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="mt-1 p-2 w-full border rounded-lg bg-gray-100"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Category</label>
                        <select
                          name="category"
                          value={formData.category}
                          onChange={handleInputChange}
                          className="mt-1 p-2 w-full border rounded-lg bg-gray-100"
                        >
                          <option value="">Select category</option>
                          {categories.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Description</label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        className="mt-1 p-2 w-full border rounded-lg bg-gray-100"
                        rows={3}
                      ></textarea>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Supplier</label>
                        <select
                          name="supplierId"
                          value={formData.supplierId}
                          onChange={handleInputChange}
                          className="mt-1 p-2 w-full border rounded-lg bg-gray-100"
                        >
                          <option value="">Select supplier</option>
                          {suppliers.map((sup, index) => (
                            <option key={index} value={sup}>{sup}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Batch Number</label>
                        <input
                          type="text"
                          name="batch"
                          value={formData.batch}
                          onChange={handleInputChange}
                          className="mt-1 p-2 w-full border rounded-lg bg-gray-100"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Initial Quantity</label>
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
                        <label className="block text-sm font-medium text-gray-700">Unit</label>
                        <select
                          name="unit"
                          value={formData.unit}
                          onChange={handleInputChange}
                          className="mt-1 p-2 w-full border rounded-lg bg-gray-100"
                        >
                          <option value="">Select unit</option>
                          {units.map((unit) => (
                            <option key={unit} value={unit}>{unit}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Minimum Stock Level</label>
                        <input
                          type="number"
                          name="minStock"
                          value={formData.minStock}
                          onChange={handleInputChange}
                          className="mt-1 p-2 w-full border rounded-lg bg-gray-100"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
                        <input
                          type="date"
                          name="expiry"
                          value={formData.expiry}
                          onChange={handleInputChange}
                          className="mt-1 p-2 w-full border rounded-lg bg-gray-100"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Unit Cost (RWF)</label>
                        <input
                          type="number"
                          name="unitCost"
                          value={formData.unitCost}
                          onChange={handleInputChange}
                          className="mt-1 p-2 w-full border rounded-lg bg-gray-100"
                          step="0.01"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Additional Notes</label>
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
                    Cancel
                  </button>
                  <button
                type="submit"
                    className="px-4 py-2 bg-[var(--primary)] text-white rounded-lg"
                  >
                    {actionType === "add" ? "Add Product" : actionType === "receipt" ? "Receive Stock" : "Issue Stock"}
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