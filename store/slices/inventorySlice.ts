import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "../../lib/api"; // Adjust the import path

export type MedicineStatus = "GOOD" | "LOW";

export interface Medicine {
  id: number;
  name: string;
  batch: string;
  received: number;
  issued: number;
  balance: number;
  expiry: string;
  unitCost: number;
  status: MedicineStatus;
  category?: string;
  description?: string;
  notes?: string;
  supplierId?: string;
  unit?: string;
  minStock?: number;
  form?: string; // Add form to the interface to avoid TypeScript errors
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
    received: number;
    category: string;
    description: string;
    supplierId: string;
    batch: string;
    expiry: string;
    unitCost: number;
    notes?: string;
    unit?: string;
    minStock?: number;
    form?: string; // Add form to the type
  }, { rejectWithValue }) => {
    try {
      const response = await api.post("/stocks", {
        stock_name: stockDetails.name,
        product_name: stockDetails.name,
        initial_quantity: stockDetails.received,
        category: stockDetails.category,
        form: stockDetails.form || stockDetails.category, // Use form if provided, else fallback to category
        description: stockDetails.description,
        supplierId: stockDetails.supplierId,
        batch_number: stockDetails.batch,
        expiry_date: stockDetails.expiry,
        notes: stockDetails.notes,
        unit_price: stockDetails.unitCost,
        unit: stockDetails.unit,
        min_stock_level: stockDetails.minStock,
      });
      return response.data.stock;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to add medicine");
    }
  }
);

export const issueStock = createAsyncThunk(
  "inventory/issueStock",
  async ({ id, quantity, requestor, remark }: { id: number; quantity: number; requestor: string; remark: string }, { rejectWithValue }) => {
    try {
      const response = await api.post(`/stocks/${id}/request`, {
        quantity,
        requestor,
        remark,
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to issue stock");
    }
  }
);

export const recordReceipt = createAsyncThunk(
  "inventory/recordReceipt",
  async ({ id, quantity, batch_number, notes }: { id: number; quantity: number; batch_number: string; notes: string }, { rejectWithValue }) => {
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
      .addCase(fetchMedicines.fulfilled, (state, action: PayloadAction<Medicine[]>) => {
        state.loading = false;
        state.medicines = action.payload;
      })
      .addCase(fetchMedicines.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addMedicine.fulfilled, (state, action: PayloadAction<Medicine>) => {
        state.medicines.push(action.payload);
      })
      .addCase(issueStock.fulfilled, (state, action) => {
        const med = state.medicines.find((m) => m.id === action.meta.arg.id);
        if (med) {
          med.issued += action.meta.arg.quantity;
          med.balance = med.received - med.issued;
          med.status = med.balance <= 100 ? "LOW" : "GOOD";
        }
      })
      .addCase(recordReceipt.fulfilled, (state, action) => {
        const med = state.medicines.find((m) => m.id === action.meta.arg.id);
        if (med) {
          med.received += action.meta.arg.quantity;
          med.balance = med.received - med.issued;
          med.status = med.balance <= 100 ? "LOW" : "GOOD";
        }
      });
  },
});

export default inventorySlice.reducer;