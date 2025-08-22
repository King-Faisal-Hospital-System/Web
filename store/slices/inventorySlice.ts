
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
}

interface InventoryState {
  medicines: Medicine[];
}

const initialState: InventoryState = {
  medicines: [
    {
      id: 1,
      name: "Paracetamol 500mg",
      batch: "PAR001",
      received: 10000,
      issued: 250,
      balance: 250,
      expiry: "2025-08-15",
      unitCost: 0.25,
      status: "GOOD",
    },
    {
      id: 2,
      name: "Paracetamol 500mg",
      batch: "PAR001",
      received: 1000,
      issued: 950,
      balance: 50,
      expiry: "2025-08-15",
      unitCost: 0.25,
      status: "LOW",
    },
    {
      id: 3,
      name: "Paracetamol 500mg",
      batch: "PAR001",
      received: 1000,
      issued: 250,
      balance: 850,
      expiry: "2025-08-15",
      unitCost: 0.25,
      status: "GOOD",
    },
  ],
};

const inventorySlice = createSlice({
  name: "inventory",
  initialState,
  reducers: {
    addMedicine: (state, action: PayloadAction<Medicine>) => {
      state.medicines.push(action.payload);
    },
    issueStock: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) => {
      const med = state.medicines.find((m) => m.id === action.payload.id);
      if (med) {
        med.issued += action.payload.quantity;
        med.balance = med.received - med.issued;
        med.status = med.balance <= 100 ? "LOW" : "GOOD";
      }
    },
    recordReceipt: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) => {
      const med = state.medicines.find((m) => m.id === action.payload.id);
      if (med) {
        med.received += action.payload.quantity;
        med.balance = med.received - med.issued;
        med.status = med.balance <= 100 ? "LOW" : "GOOD";
      }
    },
  },
});

export const { addMedicine, issueStock, recordReceipt } =
  inventorySlice.actions;
export default inventorySlice.reducer;
