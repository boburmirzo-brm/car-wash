import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IToken {
  access_token: string;
}
const initialState: IToken = {
  access_token: localStorage.getItem("access_token") || "",
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.access_token = action.payload;
      localStorage.setItem("access_token", action.payload);
    },
    logout: (state) => {
      state.access_token = "";
      localStorage.removeItem("access_token");
    },
  },
});

export const { login,logout } = slice.actions;
export default slice.reducer;
