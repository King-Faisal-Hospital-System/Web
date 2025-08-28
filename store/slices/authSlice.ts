import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getCurrentUser } from "@/services/user.services";

export type AccountType = "ADMIN" | "STOCK_MANAGER" | "NULL";

interface AuthState {
  fullname : string,
  email: string;
  accountType: AccountType;
  isAuthenticated: boolean;
  loading : boolean,
  error : string | null
}

const initialState: AuthState = {
  fullname : "",
  email: "",
  accountType: "NULL",
  isAuthenticated: false,
  loading : false,
  error : null
};

const getLoggedInUser = createAsyncThunk(
  'users/current',
  async (_, { rejectWithValue }) => {
    try {
      const user = await getCurrentUser();
      return user.user
    } catch (error : any) {
      rejectWithValue(error?.message || "Failed getting current user")
    }
  }
)
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
export default authSlice.reducer
