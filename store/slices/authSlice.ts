import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type AccountType = "ADMIN" | "STOCK_MANAGER" | "NULL"; 

interface AuthState {
  email: string;
  accountType: AccountType;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  email: "",
  accountType: "NULL",
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signIn: (
      state,
      action: PayloadAction<{ email: string; accountType: AccountType; }>
    ) => {
      state.email = action.payload.email;
      state.accountType = action.payload.accountType;
      state.isAuthenticated = true;
    },
    signOut: (state) => {
      state.email = "";
      state.accountType = "NULL";
      state.isAuthenticated = false;
    },
  },
});

export const { signIn, signOut } = authSlice.actions;
export default authSlice.reducer;
