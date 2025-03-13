import { EndpointBuilder } from "@reduxjs/toolkit/query";
import { mainApi } from ".";
import { ICar, IDetailCar, IDetailPayload, IPayload } from "@/types";

const invalidateCustomerTag = async (
  queryFulfilled: Promise<any>,
  dispatch: any
) => {
  try {
    await queryFulfilled;
    dispatch(extendedApi.util.invalidateTags(["CAR", "CUSTOMER", "CAR_WASHING"]));
  } catch (error) {
    console.error("Error:", error);
  }
};

const extendedApi = mainApi.injectEndpoints({
  endpoints: (build: EndpointBuilder<any, any, any>) => ({
    getCars: build.query<IPayload<ICar>, { filter?: string } | void>({
      query: (params) => ({
        url: "/cars",
        method: "GET",
        params,
      }),
      providesTags: ["CAR"],
    }),
    getCarById: build.query<IDetailPayload<IDetailCar>, any>({
      query: ({id, filters}) =>
        `/cars/${id}?fromDate=${filters.fromDate}&toDate=${filters.toDate}&page=${filters.page}&limit=${filters.limit}`,
      providesTags: ["CAR"],
    }),
    createCar: build.mutation<any, any>({
      query: (body) => ({
        url: "/cars",
        method: "POST",
        body,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await invalidateCustomerTag(queryFulfilled, dispatch);
      },
    }),
    updateCar: build.mutation<any, { id: string; data: any }>({
      query: ({ id, data }) => ({
        url: `/cars/${id}`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await invalidateCustomerTag(queryFulfilled, dispatch);
      },
    }),
    deleteCar: build.mutation<any, string>({
      query: (id) => ({
        url: `/cars/${id}`,
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
  useGetCarsQuery,
  useGetCarByIdQuery,
  useCreateCarMutation,
  useUpdateCarMutation,
  useDeleteCarMutation,
} = extendedApi;

export default extendedApi;
