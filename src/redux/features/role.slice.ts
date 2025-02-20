import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IRole {
  value: string;
}
const initialState: IRole = {
    value: "employer",
};

const slice = createSlice({
  name: "role",
  initialState,
  reducers: {
    setRole: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { setRole } = slice.actions;
export default slice.reducer;
