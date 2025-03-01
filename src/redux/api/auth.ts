import { EndpointBuilder } from "@reduxjs/toolkit/query";
import { mainApi } from "./index";

const extendedApi = mainApi.injectEndpoints({
  endpoints: (build: EndpointBuilder<any, any, any>) => ({
    signInUser: build.mutation<any, any>({
      query: (body) => ({
        url: "auth/signin",
        method: "POST",
        body,
      }),
    }),
    checkToken: build.query<any, void>({
      query: () => ({
        url: "auth/profile",
        method: "GET",
      }),
      providesTags: ["AUTH"],
    }),
  }),
  overrideExisting: false,
});

export const { useSignInUserMutation, useCheckTokenQuery } = extendedApi;
