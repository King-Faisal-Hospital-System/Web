
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type AccountType = "admin" | "stockManager";

interface AuthState {
  email: string;
  accountType: AccountType;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  email: "",
  accountType: "stockManager",
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signIn: (
      state,
      action: PayloadAction<{ email: string; accountType: AccountType }>
    ) => {
      state.email = action.payload.email;
      state.accountType = action.payload.accountType;
      state.isAuthenticated = true;
    },
    signOut: (state) => {
      state.email = "";
      state.accountType = "stockManager";
      state.isAuthenticated = false;
    },
  },
});

export const { signIn, signOut } = authSlice.actions;
export default authSlice.reducer;
