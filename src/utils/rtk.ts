import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from "@reduxjs/toolkit/query/react";
import { logOut, setCreditionals } from "../reducers/authSlice";
import { RootState } from "../app/store";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3500",
  // baseUrl: import.meta.env.VITE_BACK_URI,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState;
    const token = state?.auth?.token;
    // console.log(token);

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});
// const baseQueryWithAuth: BaseQueryFn<
//   string | FetchArgs | any,
//   unknown,
//   FetchBaseQueryError
// > = async (args, api, extraOptions) => {
const baseQueryWithReAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError,
  object,
  FetchBaseQueryMeta
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  // console.log("result", result);

  // if (result?.error?.originalStatus === 403) {  // not using this because originalStatus is not working so using status ( result?.error?.status)
  if (result?.error?.status === 403) {
    const refreshResult = await baseQuery("/refresh", api, extraOptions);
    // console.log("refreshResultt==========", refreshResult);
    if (refreshResult?.data) {
      const state = api.getState() as RootState;
      const user = state?.auth?.user;
      // console.log("state", state);
      // console.log("user", user);
      const rememberMe = localStorage.getItem("rememberMe") === "true";
      // console.log(rememberMe);

      api.dispatch(
        setCreditionals({
          ...refreshResult.data,
          user,
          rememberMe,
        })
      );

      result = await baseQuery(args, api, extraOptions);
    } else {
      console.warn("Refresh token expired or invalid. Logging out...");
      api.dispatch(logOut());
    }
  }
  return result;
};
export const apiSlicess = createApi({
  baseQuery: baseQueryWithReAuth,
  endpoints: () => ({}),
});
