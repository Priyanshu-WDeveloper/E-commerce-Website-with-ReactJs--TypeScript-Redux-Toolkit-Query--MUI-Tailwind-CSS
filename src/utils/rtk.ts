import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  // baseUrl: "http://localhost:3500",
  baseUrl: import.meta.env.VITE_BACK_URI,
  credentials: "include",
  //   prepareHeaders: (headers, { getState }) => {
  //     const token = getState().auth.token;
  //     if (token) {
  //       headers.set("authorization", `Bearer ${token}`);
  //     }
  //     return headers;
  //   },
});

const baseQueryWithReAuth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  //   if (result?.error?.originalStatus === 403) {
  //     const refreshResult = await baseQuery("/refresh", api, extraOptions);
  //     console.log(refreshResult);
  //     if (refreshResult?.data) {
  //       const user = api.getState().auth?.user;
  //       console.log(user);

  //       //   api.dispatch = setCreditionals({ ...refreshResult?.data, user });

  //       result = await baseQuery(args, api, extraOptions);
  //     }
  //     // else{
  //     //     api.dispatch(logout())
  //     // }
  //   }
  return result;
};
export const apiSlicess = createApi({
  baseQuery: baseQueryWithReAuth,
  endpoints: () => ({}),
});
