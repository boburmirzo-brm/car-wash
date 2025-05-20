import { EndpointBuilder } from "@reduxjs/toolkit/query";
import { mainApi } from ".";

const invalidateCustomerTag = async (
  queryFulfilled: Promise<any>,
  dispatch: any
) => {
  try {
    await queryFulfilled;
    dispatch(extendedApi.util.invalidateTags(["BONUS", "CUSTOMER"]));
  } catch (error) {
    console.error("Error:", error);
  }
};

const extendedApi = mainApi.injectEndpoints({
  endpoints: (build: EndpointBuilder<any, any, any>) => ({
    getAllBonus: build.query<any, any>({
      query: (params) => ({
        url: `/bonus`,
        method: "GET",
        params,
      }),
      providesTags: ["BONUS"],
    }),

    createBonus: build.mutation<any, any>({
      query: (body) => ({
        url: `/bonus`,
        method: "POST",
        body,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await invalidateCustomerTag(queryFulfilled, dispatch);
      },
    }),
    updateBonus: build.mutation<any, { id: string; data: any }>({
      query: ({ id, data }) => {
        return {
          url: `/bonus/${id}`,
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
  useCreateBonusMutation,
  useUpdateBonusMutation,
  useGetAllBonusQuery,
} = extendedApi;

export default extendedApi;
