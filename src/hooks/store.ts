import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";

// Autocomplete and safer thunk dispatching
export const useAppDispatch = () => useDispatch<AppDispatch>();
// No more manually typing RootState
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
