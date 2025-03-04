import { EndpointBuilder } from "@reduxjs/toolkit/query";
import { mainApi } from ".";

const carApi = mainApi.injectEndpoints({
  endpoints: (build: EndpointBuilder<any, any, any>) => ({
    getCars: build.query<any, { filter?: string } | void>({
      query: (params) => ({
        url: "/cars",
        method: "GET",
        params,
      }),
      providesTags: ["CAR"],
    }),
    getCarById: build.query<any, string>({
      query: (id) => `/car/${id}`,
      providesTags: ["CAR"],
    }),
    createCar: build.mutation<any, any>({
      query: (body) => ({
        url: "/cars",
        method: "POST",
        body,
      }),
      invalidatesTags: ["CAR"],
    }),
    updateCar: build.mutation<any, { id: string; data: any }>({
      query: ({ id, data }) => ({
        url: `/cars/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["CAR"],
    }),
    deleteCar: build.mutation<any, string>({
      query: (id) => ({
        url: `/cars/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["CAR"],
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
} = carApi;

export default carApi;
