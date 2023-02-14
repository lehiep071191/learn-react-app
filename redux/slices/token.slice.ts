import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface tokenState {
  token: string;
}

const initialState: tokenState = {
  token: "",
};

const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    setTokenValue: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
  },
});
export const { setTokenValue } = tokenSlice.actions;
export default tokenSlice.reducer;
