import { EndpointBuilder } from "@reduxjs/toolkit/query/react";
import { mainApi } from ".";

const carWashingApi = mainApi.injectEndpoints({
  endpoints: (build: EndpointBuilder<any, any, any>) => ({
    getCarWashings: build.query<any, void>({
      query: () => ({
        url: "car-washing",
        method: "GET",
      }),
      providesTags: ["CAR_WASHING"],
    }),
    getCarWashingById: build.query<any, string>({
      query: (id) => ({
        url: `car-washings/${id}`,
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
      invalidatesTags: ["CAR_WASHING"],
    }),
    updateCarWashing: build.mutation<any, { id: string; data: any }>({
      query: ({ id, data }) => ({
        url: `car-washing/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ({ id }) => [{ type: "CAR_WASHING", id }],
    }),
    deleteCarWashing: build.mutation<any, string>({
      query: (id) => ({
        url: `car-washing/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (id) => [{ type: "CAR_WASHING", id }],
    }),
    getMyWashings: build.query<any, void>({
      query: () => ({
        url: "car-washing/my",
        method: "GET",
      }),
      providesTags: ["CAR_WASHING"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetCarWashingsQuery,
  useGetCarWashingByIdQuery,
  useCreateCarWashingMutation,
  useUpdateCarWashingMutation,
  useDeleteCarWashingMutation,
  useGetMyWashingsQuery,
} = carWashingApi;

export default carWashingApi;
