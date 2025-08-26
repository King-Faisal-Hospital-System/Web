
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "../../lib/api";

interface Activity {
  id: string;
  title: string;
  description: string;
  code: string;
  time: string;
  type: "in" | "out" | "low";
}

interface TopProduct {
  name: string;
  quantity: number;
  issued: number;
  balance: number;
  value: number;
  unit_price: number;
}

interface DashboardState {
  totalProducts: number;
  lowStockItems: number;
  expiringSoon: number;
  activities: Activity[];
  topProducts: TopProduct[];
  loading: boolean;
  error: string | null;
}

const initialState: DashboardState = {
  totalProducts: 0,
  lowStockItems: 0,
  expiringSoon: 0,
  activities: [],
  topProducts: [],
  loading: false,
  error: null,
};

// Async thunk to fetch dashboard stats
export const fetchDashboardStats = createAsyncThunk(
  "dashboard/fetchStats",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/dashboard/stats");
      return response.data.dashboard;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch dashboard stats");
    }
  }
);

// Async thunk to receive stock
export const receiveStock = createAsyncThunk(
  "dashboard/receiveStock",
  async (
    payload: { name: string; quantity: number; supplierId: string; batch_number: string; notes: string },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const response = await api.post("/inventory/receive", {
        name: payload.name,
        quantity: payload.quantity,
        supplier_id: payload.supplierId,
        batch_number: payload.batch_number,
        notes: payload.notes,
      });
      await dispatch(fetchDashboardStats());
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to receive stock");
    }
  }
);

// Async thunk to issue stock
export const issueStock = createAsyncThunk(
  "dashboard/issueStock",
  async (
    payload: { name: string; quantity: number; requestor: string; remark: string },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const response = await api.post("/inventory/issue", {
        name: payload.name,
        quantity: payload.quantity,
        requestor: payload.requestor,
        remark: payload.remark,
      });
      await dispatch(fetchDashboardStats());
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to issue stock");
    }
  }
);

// Async thunk to adjust stock
export const adjustStock = createAsyncThunk(
  "dashboard/adjustStock",
  async (
    payload: { name: string; quantity: number; notes: string },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const response = await api.post("/inventory/adjust", {
        name: payload.name,
        quantity: payload.quantity,
        notes: payload.notes,
      });
      await dispatch(fetchDashboardStats());
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to adjust stock");
    }
  }
);

// Async thunk to record stock count
export const recordStockCount = createAsyncThunk(
  "dashboard/recordStockCount",
  async (
    payload: { name: string; quantity: number; notes: string },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const response = await api.post("/inventory/count", {
        name: payload.name,
        quantity: payload.quantity,
        notes: payload.notes,
      });
      await dispatch(fetchDashboardStats());
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to record stock count");
    }
  }
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setField: (
      state,
      action: PayloadAction<{ field: keyof DashboardState; value: any }>
    ) => {
      (state[action.payload.field] as any) = action.payload.value;
    },
    addActivity: (state, action: PayloadAction<Activity>) => {
      state.activities.unshift(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardStats.fulfilled, (state, action) => {
        state.loading = false;
        state.totalProducts = action.payload.totalProducts;
        state.lowStockItems = action.payload.lowStockItems;
        state.expiringSoon = action.payload.expiringSoon;
        state.activities = action.payload.activities;
        state.topProducts = action.payload.topProducts;
        state.error = null;
      })
      .addCase(fetchDashboardStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(receiveStock.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(receiveStock.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(receiveStock.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(issueStock.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(issueStock.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(issueStock.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(adjustStock.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(adjustStock.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(adjustStock.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(recordStockCount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(recordStockCount.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(recordStockCount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setField, addActivity } = dashboardSlice.actions;
export default dashboardSlice.reducer;
