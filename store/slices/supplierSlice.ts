import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "../../lib/api";

export interface Supplier {
  _id: string;
  company_name: string;
  company_email: string;
  contact_person: string;
  company_phone: string;
  address?: string;
  tax_id?: string;
  payment_terms?: number;
  isVerified?: boolean;
  orders?: number;
  totalValue?: string;
}

interface SupplierState {
  suppliers: Supplier[];
  loading: boolean;
  error: string | null;
}

const initialState: SupplierState = {
  suppliers: [],
  loading: false,
  error: null,
};

export const fetchSuppliers = createAsyncThunk(
  "suppliers/fetchSuppliers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/suppliers");
      return response.data.suppliers;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch suppliers");
    }
  }
);

export const addSupplier = createAsyncThunk(
  "suppliers/addSupplier",
  async (supplierData: {
    company_name: string;
    company_email: string;
    contact_person: string;
    company_phone: string;
    address: string;
    tax_id?: string;
    payment_terms?: string;
  }, { rejectWithValue }) => {
    try {
      const response = await api.post("/suppliers", supplierData);
      return response.data.supplier;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to add supplier");
    }
  }
);

export const updateSupplier = createAsyncThunk(
  "suppliers/updateSupplier",
  async ({ id, ...supplierData }: {
    id: string;
    company_name?: string;
    company_email?: string;
    contact_person?: string;
    company_phone?: string;
    address?: string;
    tax_id?: string;
    payment_terms?: string;
  }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/suppliers/${id}`, supplierData);
      return response.data.supplier;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to update supplier");
    }
  }
);

export const deleteSupplier = createAsyncThunk(
  "suppliers/deleteSupplier",
  async (id: string, { rejectWithValue }) => {
    try {
      await api.delete(`/suppliers/${id}`);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to delete supplier");
    }
  }
);

const supplierSlice = createSlice({
  name: "suppliers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSuppliers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSuppliers.fulfilled, (state, action: PayloadAction<Supplier[]>) => {
        state.loading = false;
        state.suppliers = action.payload || [];
      })
      .addCase(fetchSuppliers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addSupplier.fulfilled, (state, action: PayloadAction<Supplier>) => {
        state.suppliers.push(action.payload);
      })
      .addCase(updateSupplier.fulfilled, (state, action: PayloadAction<Supplier>) => {
        const index = state.suppliers.findIndex(s => s._id === action.payload._id);
        if (index !== -1) {
          state.suppliers[index] = action.payload;
        }
      })
      .addCase(deleteSupplier.fulfilled, (state, action: PayloadAction<string>) => {
        state.suppliers = state.suppliers.filter(s => s._id !== action.payload);
      });
  },
});

export default supplierSlice.reducer;
