import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ReportMenuState {
  openReportId: string | null;
}

const initialState: ReportMenuState = {
  openReportId: null,
};

const reportMenuSlice = createSlice({
  name: "reportMenu",
  initialState,
  reducers: {
    toggleMenu: (state, action: PayloadAction<string>) => {
      state.openReportId =
        state.openReportId === action.payload ? null : action.payload;
    },
    closeMenu: (state) => {
      state.openReportId = null;
    },
  },
});

export const { toggleMenu, closeMenu } = reportMenuSlice.actions;
export default reportMenuSlice.reducer;
