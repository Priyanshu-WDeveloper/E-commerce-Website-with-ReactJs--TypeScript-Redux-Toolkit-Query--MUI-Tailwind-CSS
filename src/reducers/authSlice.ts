import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
const rememberMe = localStorage.getItem("rememberMe") === "true";
const storage = rememberMe ? localStorage : sessionStorage;
const token = storage.getItem("token"); // localstorage X storage _/
const user = storage.getItem("user");

// console.log("rememberMe", rememberMe);
// console.log("storage", storage);

const authSlice = createSlice({
  name: "auth",
  initialState: { user: user ? JSON.parse(user) : null, token: token || null },
  reducers: {
    setCreditionals: (state, action) => {
      const { user, accessToken, rememberMe } = action.payload;

      state.token = accessToken;
      state.user = user;
      // localStorage.setItem("token", token);
      // localStorage.setItem("user", JSON.stringify(user));
      // console.log(rememBerMe);
      // console.log(rememberMe);

      const storage = rememberMe ? localStorage : sessionStorage;

      storage.setItem("token", accessToken);
      storage.setItem("user", JSON.stringify(user));
      localStorage.setItem("rememberMe", rememberMe.toString());
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("rememberMe");

      // sessionStorage.removeItem("token");
      // sessionStorage.removeItem("user");
      sessionStorage.clear();
    },
  },
});

export const { setCreditionals, logOut } = authSlice.actions;

export const selectCurrentUser = (state: RootState) => state.auth?.user;
export const selectCurrentToken = (state: RootState) => state.auth?.token;
// export const selectCurrentToken = (state: RootState) => state.auth?.token;

export default authSlice.reducer;
