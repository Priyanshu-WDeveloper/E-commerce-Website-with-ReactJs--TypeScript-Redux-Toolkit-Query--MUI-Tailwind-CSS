import { END_POINTS } from "../constants/url";
import { apiSlicess } from "../utils/rtk";
import { CommonUserResponseType, User } from "../types/User";

const UsersApi = apiSlicess.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<
      CommonUserResponseType,
      { limit?: number; skip?: number }
    >({
      query: ({ limit, skip }: { limit?: number; skip?: number }) => ({
        url: `${END_POINTS.users}?limit=${limit}&skip=${skip}`,
        method: "GET",
      }),
    }),
    getUserById: builder.query<
      CommonUserResponseType & { data: User },
      { id: string }
    >({
      query: ({ id }) => ({
        url: `${END_POINTS.users}/${id}`,
        method: "GET",
      }),
    }),
    addUser: builder.mutation({
      query: (user: User) => ({
        url: `${END_POINTS.users}`,
        method: "POST",
        body: user,
      }),
    }),
    editUserById: builder.mutation({
      query: ({ id, body }) => ({
        url: `${END_POINTS.users}/${id}`,
        method: "PUT",
        // params: { id },
        body,
      }),
    }),
    deleteUserById: builder.mutation({
      query: ({ id }) => ({
        // url: `${END_POINTS.users}/${id}`  //by params,
        url: `${END_POINTS.users}`, //by body
        method: "DELETE",
        body: { id },
      }),
    }),
  }),
});

export const {
  useLazyGetUsersQuery,
  useLazyGetUserByIdQuery,
  useAddUserMutation,
  useEditUserByIdMutation,
  useDeleteUserByIdMutation,
} = UsersApi;
