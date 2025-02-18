import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { logout } from "../features/auth.slice";

const baseQuery = async (args: any, api: any, extraOptions: any) => {
  const { dispatch } = api;
  const rawBaseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("access_token") as string;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  });
  const response = await rawBaseQuery(args, api, extraOptions);
  if (response.error) {
    const { status } = response.error;
    if (status === 401 || status === 403) {
      dispatch(logout());
    }
  }
  return response;
};

export const mainApi = createApi({
  reducerPath: "api",
  baseQuery,
  tagTypes: ["EMPLOYER", "CAR", "PAYMENT", "EXPENSE", "BONUS"],
  endpoints: () => ({}),
});
