import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type AccountType = "admin" | "stockManager";

interface AuthState {
  email: string;
  accountType: AccountType;
  isAuthenticated: boolean;
  token?: string; 
}

const initialState: AuthState = {
  email: "",
  accountType: "stockManager",
  isAuthenticated: false,
  token: undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signIn: (
      state,
      action: PayloadAction<{ email: string; accountType: AccountType; token?: string }>
    ) => {
      state.email = action.payload.email;
      state.accountType = action.payload.accountType;
      state.isAuthenticated = true;
      state.token = action.payload.token; 
    },
    signOut: (state) => {
      state.email = "";
      state.accountType = "stockManager";
      state.isAuthenticated = false;
      state.token = undefined;
    },
  },
});

export const { signIn, signOut } = authSlice.actions;
export default authSlice.reducer;
