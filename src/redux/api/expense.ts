import { EndpointBuilder } from "@reduxjs/toolkit/query";
import { mainApi } from ".";

const invalidateCustomerTag = async (
  queryFulfilled: Promise<any>,
  dispatch: any
) => {
  try {
    await queryFulfilled;
    dispatch(extendedApi.util.invalidateTags(["EXPENSE", "CUSTOMER", "USER"]));
  } catch (error) {
    console.error("Error:", error);
  }
};

const extendedApi = mainApi.injectEndpoints({
  endpoints: (build: EndpointBuilder<any, any, any>) => ({
    getAllExpense: build.query<any, any>({
      query: (params) => ({
        url: `/expense`,
        method: "GET",
        params,
      }),
      providesTags: ["EXPENSE"],
    }),

    getUserExpense: build.query<any, any>({
      query: ({ userId, fromDate, toDate, page, limit }) => ({
        url: `/expense/user/${userId}`,
        method: "GET",
        params: { fromDate, toDate, page, limit }, // To‘g‘ri format
      }),
      providesTags: ["EXPENSE"],
    }),

    createExpense: build.mutation<any, any>({
      query: (body) => ({
        url: `/expense`,
        method: "POST",
        body,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await invalidateCustomerTag(queryFulfilled, dispatch);
      },
    }),
    updateExpense: build.mutation<any, { id: string; data: any }>({
      query: ({ id, data }) => {
        return {
          url: `/expense/${id}`,
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

export const {
  useGetAllExpenseQuery,
  useCreateExpenseMutation,
  useUpdateExpenseMutation,
  useGetUserExpenseQuery
} = extendedApi;

export default extendedApi;
