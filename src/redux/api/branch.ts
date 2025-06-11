import { EndpointBuilder } from "@reduxjs/toolkit/query";
import { mainApi } from ".";

const extendedApi = mainApi.injectEndpoints({
  endpoints: (build: EndpointBuilder<any, any, any>) => ({
    // 🔄 GET one branch by phone
    getBranchByPhone: build.query<any, string>({
      query: (tel_primary) => ({
        url: `/branches/by-phone`,
        method: "GET",
        params: { tel_primary },
      }),
      providesTags: ["BRANCH"],
    }),
    createSubscription: build.mutation<any, any>({
      query: (body) => ({
        url: `/subscriptions`,
        method: "POST",
        body,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useGetBranchByPhoneQuery, useCreateSubscriptionMutation } = extendedApi;
