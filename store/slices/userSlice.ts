import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getCurrentUser } from "@/services/user.services";

export type AccountType = "ADMIN" | "STOCK_MANAGER" | "NULL";

interface User {
    fullname: string,
    email: string,
    role: AccountType
}

interface UserState {
    user: User,
    loading: boolean,
    error: string | null
}

const initialState: UserState = {
    user : {
        fullname : "",
        email : "",
        role : "NULL"
    },
    loading: false,
    error: null
};

const getLoggedInUser = createAsyncThunk(
    'users/current',
    async (_, { rejectWithValue }) => {
        try {
            const { user } = await getCurrentUser();
            return user
        } catch (error: any) {
            rejectWithValue(error?.message || "Failed getting current user")
        }
    }
)
const userSlice = createSlice({
    name: "user/me",
    initialState,
    reducers: {},
    extraReducers : (builder) => {
        builder
          .addCase(getLoggedInUser.pending, (state) => {
            state.loading = true,
            state.error = null
          })
          .addCase(getLoggedInUser.fulfilled, (state, action : PayloadAction<any>) => {
            state.user.fullname = action.payload.fullname,
            state.user.fullname = action.payload.user.email,
            state.user.role = action.payload.user.role,
            state.loading = false,
            state.error = null
          })
          .addCase(getLoggedInUser.rejected, (state, action) => {
            state.error = action.payload as string,
            state.loading = false
          })
    }
});
export default userSlice.reducer
