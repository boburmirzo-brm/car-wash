import { EndpointBuilder } from "@reduxjs/toolkit/query/react";
import { mainApi } from ".";

const userApi = mainApi.injectEndpoints({
  endpoints: (build: EndpointBuilder<any, any, any>) => ({
    getUsers: build.query<any, void>({
      query: () => "/user",
      providesTags: ["USER"],
    }),
    getUserById: build.query<any, string>({
      query: (id) => `/user/${id}`,
      providesTags: ["USER"],
    }),
    createAdmin: build.mutation<any, any>({
      query: (body) => ({
        url: "/user/create-admin",
        method: "POST",
        body,
      }),
      invalidatesTags: ["USER"],
    }),
    createEmployer: build.mutation<any, any>({
      query: (body) => ({
        url: "/user/create-employer",
        method: "POST",
        body,
      }),
      invalidatesTags: ["USER"],
    }),
    updateUser: build.mutation<any, { id: string; data: any }>({
      query: ({ id, data }) => ({
        url: `/user/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["USER", "AUTH"],
    }),
    deleteUser: build.mutation<any, string>({
      query: (id) => ({
        url: `/user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["USER"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useCreateAdminMutation,
  useCreateEmployerMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApi;

export default userApi;
