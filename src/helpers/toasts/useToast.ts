import { SnackbarKey, VariantType } from "notistack";
import { createContext, useContext } from "react";

type ToastContextType = {
  showToast: (message: string, variant?: VariantType) => SnackbarKey;
  showError: (message: string) => SnackbarKey;
  closeSnackbar: (key: SnackbarKey) => void;
};
export const ToastContext = createContext<ToastContextType | undefined>(
  undefined
);
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used inside ToastProvider");
  }
  return context.showToast;
};

export const useErrorToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useErrorToast must be used inside ToastProvider");
  }
  return context.showError;
};
