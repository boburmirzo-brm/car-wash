import { EndpointBuilder } from "@reduxjs/toolkit/query";
import { mainApi } from ".";

const invalidateCustomerTag = async (
  queryFulfilled: Promise<any>,
  dispatch: any
) => {
  try {
    await queryFulfilled;
    dispatch(extendedApi.util.invalidateTags(["PAYMENT", "CUSTOMER"]));
  } catch (error) {
    console.error("Error:", error);
  }
};

const extendedApi = mainApi.injectEndpoints({
  endpoints: (build: EndpointBuilder<any, any, any>) => ({
    getPaymentByCustomerId: build.query<any, any>({
      query: (params) => ({
        url: `/payments`,
        method: "GET",
        params
      }),
    }),
    createPayment: build.mutation<any, any>({
      query: (body) => ({
        url: `/payments`,
        method: "POST",
        body,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await invalidateCustomerTag(queryFulfilled, dispatch);
      },
    }),
  }),
  overrideExisting: false,
});

export const { useCreatePaymentMutation, useGetPaymentByCustomerIdQuery } = extendedApi;

export default extendedApi;
