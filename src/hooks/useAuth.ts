import { useMemo } from "react";
import { selectCurrentUser } from "../reducers/authSlice";
import { useAppSelector } from "./store";
import { User } from "../types/User";

function useAuth() {
  const user = useAppSelector(selectCurrentUser) as User;
  // const token = useAppSelector(selectCurrentToken);
  // console.log("User in useAuth", user);
  // console.log("Token in useAuth", token);

  return useMemo(() => user, [user]);
}
export default useAuth;
