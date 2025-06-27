import { VariantType, enqueueSnackbar } from "notistack";

/**
 * Fires a toast notification anywhere in the app.
 * @param message - The message to display
 * @param variant - "success" | "error" | "info" | "warning" | "default"
 */
export const toast = (
  message: string,
  variant: VariantType = "default"
): void => {
  enqueueSnackbar(message, { variant });
};

// Convenience aliases (optional but handy)
export const errToast = (message: string) => toast(message, "error");
export const showToast = (message: string) => toast(message, "success");
export const showInfo = (message: string) => toast(message, "info");

// Keep the old API for backward compatibility
let toastFn: (msg: string, variant?: VariantType) => void = toast;

export const setToastFn = (
  fn: (msg: string, variant?: VariantType) => void
) => {
  toastFn = fn;
};
