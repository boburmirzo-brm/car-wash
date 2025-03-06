import { EndpointBuilder } from "@reduxjs/toolkit/query";
import { mainApi } from ".";

const invalidateCustomerTag = async (
  queryFulfilled: Promise<any>,
  dispatch: any
) => {
  try {
    await queryFulfilled;
    dispatch(paymentApi.util.invalidateTags(["PAYMENT", "CUSTOMER"]));
  } catch (error) {
    console.error("Error:", error);
  }
};

const paymentApi = mainApi.injectEndpoints({
  endpoints: (build: EndpointBuilder<any, any, any>) => ({
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

export const { useCreatePaymentMutation } = paymentApi;

export default paymentApi;
