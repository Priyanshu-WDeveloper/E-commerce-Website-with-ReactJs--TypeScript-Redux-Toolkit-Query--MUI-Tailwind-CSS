import { END_POINTS } from "../constants/url";
import { apiSlicess } from "../utils/rtk";

const authApi = apiSlicess.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        // url: "/login",
        // url: "/auth",
        url: END_POINTS.login,
        method: "POST",
        body: { ...credentials },
      }),
    }),
    signup: builder.mutation({
      query: (credentials) => ({
        // url: "/login",
        // url: "/auth",
        url: END_POINTS.signup,
        method: "POST",
        body: { ...credentials },
      }),
    }),
  }),
});

export const { useLoginMutation, useSignupMutation } = authApi;
export default authApi;
