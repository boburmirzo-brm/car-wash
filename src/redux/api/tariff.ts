import { EndpointBuilder } from "@reduxjs/toolkit/query";
import { mainApi } from ".";

const invalidateCustomerTag = async (
  queryFulfilled: Promise<any>,
  dispatch: any
) => {
  try {
    await queryFulfilled;
    dispatch(extendedApi.util.invalidateTags(["TARIFF", "CUSTOMER"]));
  } catch (error) {
    console.error("Error:", error);
  }
};

const extendedApi = mainApi.injectEndpoints({
  endpoints: (build: EndpointBuilder<any, any, any>) => ({
    getAllTariff: build.query<any, any>({
      query: (params) => ({
        url: `/tariff`,
        method: "GET",
        params,
      }),
      providesTags: ["TARIFF"],
    }),

    createTariff: build.mutation<any, any>({
      query: (body) => ({
        url: `/tariff`,
        method: "POST",
        body,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await invalidateCustomerTag(queryFulfilled, dispatch);
      },
    }),
    updateTariff: build.mutation<any, { id: string; data: any }>({
      query: ({ id, data }) => {
        return {
          url: `/tariff/${id}`,
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
  useCreateTariffMutation,
  useUpdateTariffMutation,
  useGetAllTariffQuery,
} = extendedApi;

export default extendedApi;
