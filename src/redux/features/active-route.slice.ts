import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ActiveRouteState {
  activePath: string;
}

const initialState: ActiveRouteState = {
  activePath: sessionStorage.getItem("active-path") || "/",
};

const activeRouteSlice = createSlice({
  name: "activeRoute",
  initialState,
  reducers: {
    setActiveRoute: (state, action: PayloadAction<string>) => {
      state.activePath = action.payload;
      sessionStorage.setItem("active-path", action.payload);
    },
  },
});

export const { setActiveRoute } = activeRouteSlice.actions;
export default activeRouteSlice.reducer;
