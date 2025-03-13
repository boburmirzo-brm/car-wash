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
      query: ({ customerId, filters }) => ({
        url: `/payments/customer/${customerId}?fromDate=${filters.fromDate}&toDate=${filters.toDate}&page=${filters.page}&limit=${filters.limit}`,
        method: "GET",
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
    updatePayment: build.mutation<any, { id: string; data: any }>({
      query: ({ id, data }) => {
        console.log("updatePayment queryga kelgan:", { id, data });
        return {
          url: `/payments/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await invalidateCustomerTag(queryFulfilled, dispatch);
      },
    }),
  }),
  overrideExisting: false,
});

export const { useCreatePaymentMutation, useGetPaymentByCustomerIdQuery, useUpdatePaymentMutation } = extendedApi;

export default extendedApi;
