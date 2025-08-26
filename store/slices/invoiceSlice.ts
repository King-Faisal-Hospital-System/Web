import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "../../lib/api";

export interface Invoice {
  _id: string;
  type: "PROFORMA" | "REGULAR";
  purchase_order?: string;
  total_value: number;
  notes?: string;
  status: "PENDING" | "PAID" | "DRAFT" | "SENT";
  createdAt?: string;
  updatedAt?: string;
 
  supplier?: string;
  issueDate?: string;
  dueDate?: string;
  amount?: string;
}

interface InvoiceState {
  invoices: Invoice[];
  loading: boolean;
  error: string | null;
}

const initialState: InvoiceState = {
  invoices: [],
  loading: false,
  error: null,
};

export const fetchInvoices = createAsyncThunk(
  "invoices/fetchInvoices",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/invoices");
      return response.data.invoices;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch invoices");
    }
  }
);

export const createInvoice = createAsyncThunk(
  "invoices/createInvoice",
  async (invoiceData: Partial<Invoice>, { rejectWithValue }) => {
    try {
      const response = await api.post("/invoices", invoiceData);
      return response.data.invoice;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to create invoice");
    }
  }
);

export const updateInvoice = createAsyncThunk(
  "invoices/updateInvoice",
  async ({ id, ...invoiceData }: { id: string } & Partial<Invoice>, { rejectWithValue }) => {
    try {
      const response = await api.put(`/invoices/${id}`, invoiceData);
      return response.data.invoice;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to update invoice");
    }
  }
);

export const deleteInvoice = createAsyncThunk(
  "invoices/deleteInvoice",
  async (id: string, { rejectWithValue }) => {
    try {
      await api.delete(`/invoices/${id}`);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to delete invoice");
    }
  }
);

const invoiceSlice = createSlice({
  name: "invoices",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch invoices
      .addCase(fetchInvoices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInvoices.fulfilled, (state, action: PayloadAction<Invoice[]>) => {
        state.loading = false;
        state.invoices = action.payload;
      })
      .addCase(fetchInvoices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Create invoice
      .addCase(createInvoice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createInvoice.fulfilled, (state, action: PayloadAction<Invoice>) => {
        state.loading = false;
        state.invoices.push(action.payload);
      })
      .addCase(createInvoice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update invoice
      .addCase(updateInvoice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateInvoice.fulfilled, (state, action: PayloadAction<Invoice>) => {
        state.loading = false;
        const index = state.invoices.findIndex(invoice => invoice._id === action.payload._id);
        if (index !== -1) {
          state.invoices[index] = action.payload;
        }
      })
      .addCase(updateInvoice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Delete invoice
      .addCase(deleteInvoice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteInvoice.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.invoices = state.invoices.filter(invoice => invoice._id !== action.payload);
      })
      .addCase(deleteInvoice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = invoiceSlice.actions;
export default invoiceSlice.reducer;
