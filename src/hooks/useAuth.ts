import { useMemo } from "react";
import { selectCurrentUser } from "../reducers/authSlice";
import { useAppSelector } from "./store";
import { User } from "../types/User";

function useAuth() {
  const user = useAppSelector(selectCurrentUser) as User;

  return useMemo(() => user, [user]);
}
export default useAuth;
