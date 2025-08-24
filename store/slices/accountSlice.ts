import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AccountState {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone: string;
  password: string;         
  confirmPassword?: string;  
}

const initialState: AccountState = {
  firstName: "",
  lastName: "",
  username: "",
  email: "",
  phone: "",
  password: "",            
  confirmPassword: "",      
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setAccountField: (
      state,
      action: PayloadAction<{ field: keyof AccountState; value: string }>
    ) => {
      state[action.payload.field] = action.payload.value;
    },
    resetAccount: () => initialState,
  },
});

export const { setAccountField, resetAccount } = accountSlice.actions;
export default accountSlice.reducer;
