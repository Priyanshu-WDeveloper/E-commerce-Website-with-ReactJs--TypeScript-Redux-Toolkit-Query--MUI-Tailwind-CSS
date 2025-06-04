import { END_POINTS } from "../constants/url";
import { apiSlicess } from "../utils/rtk";
import { UsersResponse } from "../types/userTypes";

const UsersApi = apiSlicess.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<UsersResponse, { limit?: number; skip?: number }>({
      query: ({ limit, skip }: { limit?: number; skip?: number }) => ({
        url: `${END_POINTS.users}?limit=${limit}&skip=${skip}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useLazyGetUsersQuery } = UsersApi;
