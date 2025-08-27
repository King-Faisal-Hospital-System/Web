import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

// Payment interface
export interface Payment {
  _id: string;
  invoice: string; 
  amount: number;
  method: string;
  status: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

// Payment state interface
interface PaymentState {
  payments: Payment[];
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: PaymentState = {
  payments: [],
  loading: false,
  error: null,
};

// Async thunks

export const fetchPayments = createAsyncThunk(
  'payments/fetchPayments',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/payments`,
        {
          method: 'GET',
          credentials: 'include', 
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

     
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || 'Failed to fetch payments');
      }

      const data = await response.json();

      
      return data.data || data;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch payments');
    }
  }
);


export const createPayment = createAsyncThunk(
  'payments/createPayment',
  async (
    paymentData: {
      invoice: string;
      amount: number;
      method: string;
      notes?: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/payments`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify(paymentData),
        }
      );

     
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || 'Failed to create payment');
      }

      const data = await response.json();

      
      return data.data || data;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to create payment');
    }
  }
);
export const updatePayment = createAsyncThunk(
  'payments/updatePayment',
  async ({ id, ...updateData }: {
    id: string;
    invoice?: string;
    amount?: number;
    method?: string;
    status?: string;
    notes?: string;
  }, { rejectWithValue }) => {
    try {
      const response = await fetch( `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/payments/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });
      
      const data = await response.json();
      
      if (!data.success) {
        return rejectWithValue(data.message);
      }
      
      return data.data;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to update payment');
    }
  }
);

export const deletePayment = createAsyncThunk(
  'payments/deletePayment',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await fetch( `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/payments/${id}`, {
        method: 'DELETE',
      });
      
      const data = await response.json();
      
      if (!data.success) {
        return rejectWithValue(data.message);
      }
      
      return id;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to delete payment');
    }
  }
);

// Payment slice
const paymentSlice = createSlice({
  name: 'payments',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch payments
      .addCase(fetchPayments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPayments.fulfilled, (state, action: PayloadAction<Payment[]>) => {
        state.loading = false;
        state.payments = action.payload;
      })
      .addCase(fetchPayments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Create payment
      .addCase(createPayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPayment.fulfilled, (state, action: PayloadAction<Payment>) => {
        state.loading = false;
        state.payments.unshift(action.payload);
      })
      .addCase(createPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Update payment
      .addCase(updatePayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePayment.fulfilled, (state, action: PayloadAction<Payment>) => {
        state.loading = false;
        const index = state.payments.findIndex(payment => payment._id === action.payload._id);
        if (index !== -1) {
          state.payments[index] = action.payload;
        }
      })
      .addCase(updatePayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Delete payment
      .addCase(deletePayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePayment.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.payments = state.payments.filter(payment => payment._id !== action.payload);
      })
      .addCase(deletePayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = paymentSlice.actions;
export default paymentSlice.reducer;
