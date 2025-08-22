
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Activity {
  id: string;
  title: string;
  description: string;
  code: string;
  time: string;
  type: "in" | "out" | "low";
}

interface DashboardState {
  totalProducts: number;
  lowStockItems: number;
  expiringSoon: number;
  activities: Activity[];
}

const initialState: DashboardState = {
  totalProducts: 5,
  lowStockItems: 1,
  expiringSoon: 1,
  activities: [
    {
      id: "1",
      title: "Paracetamol 500mg",
      description: "Received 500 Units from PharmaSupply Ltd",
      code: "PAR001",
      time: "2 hours ago",
      type: "in",
    },
    {
      id: "2",
      title: "Amoxicillin 250mg",
      description: "Issued 100 units to Ward A",
      code: "AMO001",
      time: "4 hours ago",
      type: "out",
    },
    {
      id: "3",
      title: "Ibuprofen 400mg",
      description: "50 units expiring on 2024-02-15",
      code: "IBU001",
      time: "6 hours ago",
      type: "low",
    },
  ],
};

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
});

export const { setField, addActivity } = dashboardSlice.actions;
export default dashboardSlice.reducer;
