import { EndpointBuilder } from "@reduxjs/toolkit/query";
import { mainApi } from ".";

const invalidateCustomerTag = async (
  queryFulfilled: Promise<any>,
  dispatch: any
) => {
  try {
    await queryFulfilled;
    dispatch(extendedApi.util.invalidateTags(["INVITATION", "CUSTOMER"]));
  } catch (error) {
    console.error("Error:", error);
  }
};

const extendedApi = mainApi.injectEndpoints({
  endpoints: (build: EndpointBuilder<any, any, any>) => ({
    getAllInvitation: build.query<any, any>({
      query: (params) => ({
        url: `/invitations`,
        method: "GET",
        params,
      }),
      providesTags: ["INVITATION"],
    }),

    createInvitation: build.mutation<any, any>({
      query: (body) => ({
        url: `/invitations`,
        method: "POST",
        body,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await invalidateCustomerTag(queryFulfilled, dispatch);
      },
    }),

    getCustomerInvitations: build.query<any, string>({
      query: (id) => `/invitations/customer/${id}`,
      providesTags: ["INVITATION"],
    }),
    updateInvitation: build.mutation<any, { id: string; data: any }>({
      query: ({ id, data }) => {
        console.log("invitations", id);
        return {
          url: `/invitation/${id}`,
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
  useGetCustomerInvitationsQuery,
  useCreateInvitationMutation,
  useUpdateInvitationMutation,
  useGetAllInvitationQuery,
} = extendedApi;

export default extendedApi;
