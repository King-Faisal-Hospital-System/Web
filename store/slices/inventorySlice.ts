import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "../../lib/api";

export type MedicineStatus = "GOOD" | "LOW";

export interface Medicine {
  id: string;
  name: string;
  batch?: string;
  batch_number?: string;
  received?: number;
  issued?: number;
  balance?: number;
  expiry?: string;
  unitCost?: number;
  unit_price?: number;
  status: MedicineStatus;
  category?: string;
  product_description?: string;
  notes?: string;
  supplierId?: string;
  unit?: string;
  minStock?: number;
  form?: string;
  quantity?: number;
}

interface InventoryState {
  medicines: Medicine[];
  loading: boolean;
  error: string | null;
}

const initialState: InventoryState = {
  medicines: [],
  loading: false,
  error: null,
};

// Helper to default undefined numbers to 0
const safeNumber = (value?: number) => value ?? 0;

export const fetchMedicines = createAsyncThunk(
  "inventory/fetchMedicines",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/stocks");
      return response.data.stocks;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch medicines");
    }
  }
);

export const addMedicine = createAsyncThunk(
  "inventory/addMedicine",
  async (stockDetails: {
    name: string;
    product_description: string;
    quantity: number;
    category: string;
    supplier: string;
    batch_number: string;
    expiry_date: string;
    unit_price: number;
    form: string;
    notes?: string;
    total_value?: number;
  }, { rejectWithValue }) => {
    try {
      const response = await api.post("/stocks", {
        name: stockDetails.name,
        product_name: stockDetails.name,
        product_description: stockDetails.product_description,
        quantity: stockDetails.quantity,
        category: stockDetails.category,
        form: stockDetails.form,
        supplier: stockDetails.supplier,
        batch_number: stockDetails.batch_number,
        expiry_date: stockDetails.expiry_date,
        notes: stockDetails.notes,
        unit_price: stockDetails.unit_price,
        total_value: stockDetails.total_value,
      });
      return response.data.stock;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to add medicine");
    }
  }
);

export const updateMedicine = createAsyncThunk(
  "inventory/updateMedicine",
  async ({ id, ...stockDetails }: {
    id: string;
    name?: string;
    product_description?: string;
    quantity?: number;
    category?: string;
    supplier?: string;
    batch_number?: string;
    expiry_date?: string;
    unit_price?: number;
    form?: string;
    notes?: string;
  }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/stocks/${id}`, {
        name: stockDetails.name,
        product_name: stockDetails.name,
        product_description: stockDetails.product_description,
        quantity: stockDetails.quantity,
        category: stockDetails.category,
        form: stockDetails.form,
        supplier: stockDetails.supplier,
        batch_number: stockDetails.batch_number,
        expiry_date: stockDetails.expiry_date,
        notes: stockDetails.notes,
        unit_price: stockDetails.unit_price,
      });
      return response.data.stock;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to update medicine");
    }
  }
);

export const issueStock = createAsyncThunk(
  "inventory/issueStock",
  async ({ id, quantity, requestor, remark }: { id: string; quantity: number; requestor: string; remark: string }, { rejectWithValue }) => {
    try {
      const response = await api.post(`/stocks/${id}/issue`, { quantity, requestor, remark });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to issue stock");
    }
  }
);

export const recordReceipt = createAsyncThunk(
  "inventory/recordReceipt",
  async ({ id, quantity, batch_number, notes }: { id: string; quantity: number; batch_number: string; notes: string }, { rejectWithValue }) => {
    try {
      const response = await api.post(`/stocks/${id}/receive`, {
        orderId: "someOrderId",
        batch_number,
        quantity_received: quantity,
        notes,
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to record receipt");
    }
  }
);

const inventorySlice = createSlice({
  name: "inventory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMedicines.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMedicines.fulfilled, (state, action: PayloadAction<any[]>) => {
    state.loading = false;
    state.medicines = (action.payload || []).map((stock) => {
        const received = safeNumber(stock.quantity);
        const issued = safeNumber(stock.issued);
        const balance = received - issued;
        const unitCost = safeNumber(stock.unit_price);

        return {
            id: stock._id,
            name: stock.name || stock.product_name,
            batch: stock.batch_number ?? "-",
            batch_number: stock.batch_number,
            received,
            issued,
            balance,
            expiry: stock.expiry_date,
            unitCost,
            unit_price: stock.unit_price,
            status: balance < safeNumber(stock.minStock) ? "LOW" : "GOOD",
            category: stock.category,
            product_description: stock.product_description,
            notes: stock.notes,
            supplierId: stock.supplier?._id || "",
            unit: stock.form || "",
            minStock: safeNumber(stock.minStock),
            form: stock.form || "",
            quantity: stock.quantity,
        };
    });
})
      .addCase(fetchMedicines.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addMedicine.fulfilled, (state, action: PayloadAction<Medicine>) => {
        state.medicines.push(action.payload);
      })
      .addCase(updateMedicine.fulfilled, (state, action: PayloadAction<any>) => {
        const index = state.medicines.findIndex(m => m.id === action.payload._id);
        if (index !== -1) {
          const updated = action.payload;
          const received = safeNumber(updated.quantity);
          const issued = safeNumber(updated.issued);
          const balance = received - issued;
          const unitCost = safeNumber(updated.unit_price);

          state.medicines[index] = {
            id: updated._id,
            name: updated.name || updated.product_name,
            batch: updated.batch_number ?? "-",
            batch_number: updated.batch_number,
            received,
            issued,
            balance,
            expiry: updated.expiry_date,
            unitCost,
            unit_price: updated.unit_price,
            status: balance < safeNumber(updated.minStock) ? "LOW" : "GOOD",
            category: updated.category,
            product_description: updated.product_description,
            notes: updated.notes,
            supplierId: updated.supplier?._id || "",
            unit: updated.form || "",
            minStock: safeNumber(updated.minStock),
            form: updated.form || "",
            quantity: updated.quantity,
          };
        }
      })
      .addCase(issueStock.fulfilled, (state, action) => {
        const med = state.medicines.find((m) => m.id === action.meta.arg.id);
        if (med) {
          med.issued = safeNumber(med.issued) + action.meta.arg.quantity;
          med.balance = safeNumber(med.received) - safeNumber(med.issued);
          med.status = med.balance < safeNumber(med.minStock) ? "LOW" : "GOOD";
        }
      })
      .addCase(recordReceipt.fulfilled, (state, action) => {
        const med = state.medicines.find((m) => m.id === action.meta.arg.id);
        if (med) {
          med.received = safeNumber(med.received) + action.meta.arg.quantity;
          med.balance = safeNumber(med.received) - safeNumber(med.issued);
          med.status = med.balance < safeNumber(med.minStock) ? "LOW" : "GOOD";
        }
      });
  },
});

export default inventorySlice.reducer;
