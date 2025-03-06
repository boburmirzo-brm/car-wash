import { EndpointBuilder } from "@reduxjs/toolkit/query";
import { mainApi } from ".";
import { ICustomer, ICustomerDetail, ICustomerUpdate, IDetailPayload, IPayload } from "@/types";

const customerApi = mainApi.injectEndpoints({
  endpoints: (build: EndpointBuilder<any, any, any>) => ({
    getCustomers: build.query<IPayload<ICustomer>, { filter?: string }>({
      query: ({ filter }) => ({
        url: "/customer",
        method: "GET",
        params: filter ? { filter } : {},
      }),
      providesTags: ["CUSTOMER"],
    }),
    getCustomerById: build.query<IDetailPayload<ICustomerDetail>, string>({
      query: (id) => `/customer/${id}`,
      providesTags: ["CUSTOMER"],
    }),
    createCustomer: build.mutation<any, any>({
      query: (body) => ({
        url: "/customer",
        method: "POST",
        body,
      }),
      invalidatesTags: ["CUSTOMER"],
    }),
    updateCustomer: build.mutation<any, { id: string; data: ICustomerUpdate }>({
      query: ({ id, data }) => ({
        url: `/customer/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["CUSTOMER"],
    }),
    deleteCustomer: build.mutation<any, string>({
      query: (id) => ({
        url: `/customer/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["CUSTOMER"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetCustomersQuery,
  useGetCustomerByIdQuery,
  useCreateCustomerMutation,
  useUpdateCustomerMutation,
  useDeleteCustomerMutation,
} = customerApi;

export default customerApi;
