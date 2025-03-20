import { EndpointBuilder } from "@reduxjs/toolkit/query/react";
import { mainApi } from ".";

const invalidateCustomerTag = async (
  queryFulfilled: Promise<any>,
  dispatch: any
) => {
  try {
    await queryFulfilled;
    dispatch(extendedApi.util.invalidateTags(["USER", "AUTH"]));
  } catch (error) {
    console.error("Error:", error);
  }
};

const extendedApi = mainApi.injectEndpoints({
  endpoints: (build: EndpointBuilder<any, any, any>) => ({
    getUsers: build.query<any, void>({
      query: () => "/user",
      providesTags: ["USER"],
    }),
    getAdmins: build.query<any, void>({
      query: () => "/user/admins",
      providesTags: ["USER"],
    }),
    getEmployees: build.query<any, any>({
      query: (params) => ({
        url: "/user/employees",
        method: "GET",
        params,
      }),
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
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await invalidateCustomerTag(queryFulfilled, dispatch);
      },
    }),
    createEmployer: build.mutation<any, any>({
      query: (body) => ({
        url: "/user/create-employer",
        method: "POST",
        body,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await invalidateCustomerTag(queryFulfilled, dispatch);
      },
    }),
    updateUser: build.mutation<any, { id: string; data: any }>({
      query: ({ id, data }) => ({
        url: `/user/${id}`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await invalidateCustomerTag(queryFulfilled, dispatch);
      },
    }),
    deleteUser: build.mutation<any, string>({
      query: (id) => ({
        url: `/user/${id}`,
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
  useGetUsersQuery,
  useGetUserByIdQuery,
  useCreateAdminMutation,
  useCreateEmployerMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useGetAdminsQuery,
  useGetEmployeesQuery
} = extendedApi;

export default extendedApi;
