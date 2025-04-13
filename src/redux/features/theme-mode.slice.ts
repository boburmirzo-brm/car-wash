import { createSlice } from "@reduxjs/toolkit";

export interface ITheme {
  value: string;
}
const initialState: ITheme = {
  value: localStorage.getItem("theme") || "",
};

const slice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state) => {
      const html = document.documentElement;
      if (state.value === "dark") {
        html.classList.remove("dark");
        localStorage.setItem("theme", "light");
        state.value = "light";
      } else {
        html.classList.add("dark");
        localStorage.setItem("theme", "dark");
        state.value = "dark";
      }
    },
  },
});

export const { setTheme } = slice.actions;
export default slice.reducer;
