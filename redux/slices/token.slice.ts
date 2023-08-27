import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { loginAsycThunk } from "../thunks/token.thunk";

export interface tokenState {
  token: string;
  isLoading: boolean;
}

const initialState: tokenState = {
  token: "",
  isLoading: false,
};

const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    setTokenValue: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsycThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginAsycThunk.fulfilled, (state, action) => {
        state.token = action.payload;
      });
  },
});
export const { setTokenValue } = tokenSlice.actions;
export default tokenSlice.reducer;
