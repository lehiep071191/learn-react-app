import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { backEndUrl } from "../../commons/url.constant";
import { httpPostRequest } from "../../https/api";
import Cookies from "universal-cookie";

export type LoginParams = {
  email: String;
  password: String;
};

export const loginAsycThunk = createAsyncThunk(
  "user/login",
  async (params: LoginParams, thunkApi) => {
    const url = backEndUrl.loginUrl;
    const date = new Date();
    const expiresAt = date.getTime() + 60 * 1000 * 60 * 24 * 30;
    try {
      const res = await httpPostRequest(url, params);
      const cookies = new Cookies();
      if (res) {
        cookies.set("refresh", res?.data?.refreshToken, {
          expires: new Date(expiresAt),
        });
        return res?.data?.access_token;
      }

      return null;
    } catch (e) {}
  }
);
