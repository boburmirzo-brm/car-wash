import { EndpointBuilder } from "@reduxjs/toolkit/query";
import { mainApi } from ".";

const paymentApi = mainApi.injectEndpoints({
  endpoints: (build: EndpointBuilder<any, any, any>) => ({
    createPayment: build.mutation<any, any>({
      query: (body) => ({
        url: `/payments`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["PAYMENT", "CUSTOMER"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreatePaymentMutation,
} = paymentApi;

export default paymentApi;
