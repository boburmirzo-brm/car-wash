import { EndpointBuilder } from "@reduxjs/toolkit/query/react";
import { mainApi } from ".";

export interface User {
  _id: string;
  adminId?: string;
  f_name: string;
  l_name: string;
  tel_primary: string;
  tel_secondary?: string;
  address: string;
  username: string;
  role: string;
  budget: number;
  hashed_password: string;
  hashed_refreshtoken?: string;
  is_active: boolean;
  salary: string[]; // Mongoose ObjectId bo‘lishi mumkin
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserDto {
  adminId?: string;
  f_name: string;
  l_name: string;
  tel_primary: string;
  tel_secondary?: string;
  address: string;
  username: string;
  password: string;
  role: string;
  budget?: number;
  salary?: string[]; // Mongoose ObjectId lar
  is_active?: boolean;
}

export interface UpdateUserDto {
  f_name?: string;
  l_name?: string;
  tel_primary?: string;
  tel_secondary?: string;
  address?: string;
  username?: string;
  password?: string;
  role?: string;
  budget?: number;
  salary?: string[]; // ObjectId lar
  is_active?: boolean;
}

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
      invalidatesTags: ["USER"],
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
