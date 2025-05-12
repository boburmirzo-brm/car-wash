import { EndpointBuilder } from "@reduxjs/toolkit/query";
import { mainApi } from ".";
import {
  ICustomer,
  ICustomerDetail,
  ICustomerUpdate,
  IDetailPayload,
  IPayload,
} from "@/types";

const invalidateCustomerTag = async (
  queryFulfilled: Promise<any>,
  dispatch: any
) => {
  try {
    await queryFulfilled;
    dispatch(extendedApi.util.invalidateTags(["CUSTOMER", "CAR_WASHING"]));
  } catch (error) {
    console.error("Error:", error);
  }
};

export const extendedApi = mainApi.injectEndpoints({
  endpoints: (build: EndpointBuilder<any, any, any>) => ({
    getCustomers: build.query<IPayload<ICustomer>,Partial<Record<string, any>>>({
      query: (filters) => ({
        url: "/customer",
        method: "GET",
        params: filters,
      }),
      providesTags: ["CUSTOMER"],
    }),

    getCustomerById: build.query<IDetailPayload<ICustomerDetail>, string>({
      query: (id) => `/customer/${id}`,
      providesTags: ["CUSTOMER","INVITATION"],
    }),
    createCustomer: build.mutation<any, any>({
      query: (body) => ({
        url: "/customer",
        method: "POST",
        body,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await invalidateCustomerTag(queryFulfilled, dispatch);
      },
    }),
    updateCustomer: build.mutation<any, { id: string; data: ICustomerUpdate }>({
      query: ({ id, data }) => ({
        url: `/customer/${id}`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await invalidateCustomerTag(queryFulfilled, dispatch);
      },
    }),
    deleteCustomer: build.mutation<any, string>({
      query: (id) => ({
        url: `/customer/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await invalidateCustomerTag(queryFulfilled, dispatch);
      },
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
} = extendedApi;

export default extendedApi;
