import { EndpointBuilder } from "@reduxjs/toolkit/query";
import { mainApi } from ".";

const invalidateTag = async (
  queryFulfilled: Promise<any>,
  dispatch: any
) => {
  try {
    await queryFulfilled;
    dispatch(extendedApi.util.invalidateTags(["SALARY", "USER", "AUTH"]));
  } catch (error) {
    console.error("Error:", error);
  }
};

const extendedApi = mainApi.injectEndpoints({
  endpoints: (build: EndpointBuilder<any, any, any>) => ({
    getSalaryById: build.query<any, any>({
      query: (id) => ({
        url: `/salary/${id}`,
        method: "GET",
      }),
      providesTags: ["SALARY"]
    }),
    createSalary: build.mutation<any, any>({
      query: (body) => ({
        url: `/salary`,
        method: "POST",
        body,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await invalidateTag(queryFulfilled, dispatch);
      },
    }),
    updateSalary: build.mutation<any, { id: string; data: any }>({
      query: ({ id, data }) => ({
        url: `/salary/${id}`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await invalidateTag(queryFulfilled, dispatch);
      },
    }),
  }),
  overrideExisting: false,
});

export const { useGetSalaryByIdQuery, useCreateSalaryMutation, useUpdateSalaryMutation } = extendedApi;

export default extendedApi;
