import { configureStore } from "@reduxjs/toolkit";
import inventoryReducer from "./slices/inventorySlice";
import invoiceReducer from "./slices/invoiceSlice";
import paymentReducer from "./slices/paymentSlice";
import reportReducer from "./slices/reportSlice";
import dashboardReducer from "./slices/dashboardSlice";
import settingsReducer from "./slices/settingsSlice";
import languageReducer from "./slices/languageSlice";
import supplierReducer from "./slices/supplierSlice";
import reportMenuReducer from "./slices/reportMenuSlice";

export const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
    inventory: inventoryReducer,
    invoices: invoiceReducer,
    payments: paymentReducer,
    reports: reportReducer,
    settings: settingsReducer,
    language: languageReducer,
    suppliers: supplierReducer,
    reportMenu: reportMenuReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
