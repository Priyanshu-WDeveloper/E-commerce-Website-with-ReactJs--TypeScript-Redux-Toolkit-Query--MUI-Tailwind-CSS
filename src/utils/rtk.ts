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
import { API_URL } from "../constants/url";

type RefreshResponse = {
  data: {
    data: {
      accessToken: string;
    };
  };
};

const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState;
    const token = state?.auth?.token;
    // console.log("Token from state:", token);

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
    const refreshResult = (await baseQuery(
      "/refresh",
      api,
      extraOptions
    )) as RefreshResponse;

    // console.log("refreshResultt==========", refreshResult);
    if (refreshResult?.data && typeof refreshResult.data === "object") {
      // data or token
      // if (refreshResult?.data) {
      const state = api.getState() as RootState;
      const user = state?.auth?.user;
      // console.log("state", state);
      // console.log("user", user);
      const rememberMe = localStorage.getItem("rememberMe") === "true";
      // console.log(rememberMe);
      const newToken = refreshResult?.data?.data?.accessToken;

      api.dispatch(
        setCreditionals({
          // ...refreshResult.data,
          accessToken: newToken,
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
