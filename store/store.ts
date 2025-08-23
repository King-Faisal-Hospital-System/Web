import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import accountReducer from "./slices/accountSlice";
import dashboardReducer from "./slices/dashboardSlice";
import inventoryReducer from "./slices/inventorySlice";
import reportMenuReducer from "./slices/reportMenuSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,  
    account: accountReducer,
    dashboard: dashboardReducer,
     inventory: inventoryReducer,
      reportMenu: reportMenuReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
