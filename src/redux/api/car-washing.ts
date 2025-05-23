import { EndpointBuilder } from "@reduxjs/toolkit/query/react";
import { mainApi } from ".";

const invalidateCustomerTag = async (
  queryFulfilled: Promise<any>,
  dispatch: any
) => {
  try {
    await queryFulfilled;
    dispatch(
      extendedApi.util.invalidateTags([
        "CAR_WASHING",
        "AUTH",
        "CAR",
        "CUSTOMER",
        "INVITATION"
      ])
    );
  } catch (error) {
    console.error("Error:", error);
  }
};

const extendedApi = mainApi.injectEndpoints({
  endpoints: (build: EndpointBuilder<any, any, any>) => ({
    getCarWashings: build.query<any, any>({
      query: (params) => ({
        url: "car-washing",
        method: "GET",
        params,
      }),
      providesTags: ["CAR_WASHING"],
    }),
    getMyWashings: build.query<any, any>({
      query: (params) => ({
        url: "car-washing/my",
        method: "GET",
        params,
      }),
      providesTags: ["CAR_WASHING"],
    }),

    getByEmployeeId: build.query<any, any>({
      query: ({ id, params }) => ({
        url: `car-washing/employee/${id}`,
        method: "GET",
        params,
      }),
      providesTags: ["CAR_WASHING"],
    }),

    getByCarId: build.query<any, any>({
      query: ({ id, params }) => ({
        url: `car-washing/car/${id}`,
        method: "GET",
        params: params
      }),
      providesTags: ["CAR_WASHING"],
    }),

    getCarWashingById: build.query<any, string>({
      query: (id) => ({
        url: `car-washing/${id}`,
        method: "GET",
      }),
      providesTags: (id) => [{ type: "CAR_WASHING", id }],
    }),
    createCarWashing: build.mutation<any, any>({
      query: (body) => ({
        url: "car-washing",
        method: "POST",
        body,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await invalidateCustomerTag(queryFulfilled, dispatch);
      },
    }),
    updateCarWashing: build.mutation<any, { id: string; data: any }>({
      query: ({ id, data }) => ({
        url: `car-washing/${id}`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await invalidateCustomerTag(queryFulfilled, dispatch);
      },
    }),
    updateCarWashingChange: build.mutation<any, { id: string; data: any }>({
      query: ({ id, data }) => ({
        url: `car-washing/change-washAmount/${id}`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await invalidateCustomerTag(queryFulfilled, dispatch);
      },
    }),
    updateWashAmountCarWashing: build.mutation<any, { id: string; data: any }>({
      query: ({ id, data }) => ({
        url: `car-washing/change-washAmount/${id}`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await invalidateCustomerTag(queryFulfilled, dispatch);
      },
    }),
    deleteCarWashing: build.mutation<any, string>({
      query: (id) => ({
        url: `car-washing/${id}`,
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
  useGetCarWashingsQuery,
  useGetCarWashingByIdQuery,
  useCreateCarWashingMutation,
  useUpdateCarWashingMutation,
  useUpdateWashAmountCarWashingMutation,
  useDeleteCarWashingMutation,
  useGetMyWashingsQuery,
  useUpdateCarWashingChangeMutation,
  useGetByEmployeeIdQuery,
  useGetByCarIdQuery
} = extendedApi;

export default extendedApi;
