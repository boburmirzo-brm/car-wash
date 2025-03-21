import { EndpointBuilder } from "@reduxjs/toolkit/query";
import { mainApi } from "./index";

const extendedApi = mainApi.injectEndpoints({
  endpoints: (build: EndpointBuilder<any, any, any>) => ({
    stats: build.query<any, any>({
      query: (params) => ({
        url: "stats",
        method: "GET",
        params
      }),
      providesTags: ["STATS"],
    }),
  }),
  overrideExisting: false,
});

export const { useStatsQuery } = extendedApi;
