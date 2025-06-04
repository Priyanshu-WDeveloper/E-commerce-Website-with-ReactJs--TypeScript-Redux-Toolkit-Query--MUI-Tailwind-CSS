import { ReactNode } from "react";
import {
  SnackbarKey,
  SnackbarProvider,
  useSnackbar,
  VariantType,
} from "notistack";
import { ToastContext } from "./toasts/useToast";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

// Types for the Toast context
interface LayoutProps {
  children: ReactNode;
}
// Custom provider that wraps notistack's SnackbarProvider and exposes helper functions
export const ToastProvider = ({ children }: LayoutProps) => {
  return (
    <SnackbarProvider
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      style={{ position: "relative", top: "50px" }}
      autoHideDuration={4000}
      maxSnack={3}
      variant="default"
    >
      <ToastContextBridge>{children}</ToastContextBridge>
    </SnackbarProvider>
  );
};

// Bridge component to expose notistack's hooks via context
// const ToastContextBridge: React.FC<{ children: ReactNode }> = ({
//   children,
// }) => {
const ToastContextBridge = ({ children }: LayoutProps) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const action = (key: SnackbarKey) => (
    <IconButton
      aria-label="close"
      color="inherit"
      onClick={() => closeSnackbar(key)}
      size="small"
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  );

  // Unified API
  const showToast = (message: string, variant: VariantType = "success") =>
    enqueueSnackbar(message, {
      variant,
      action,
    });

  const showError = (message: string) => showToast(message, "error");

  return (
    <ToastContext.Provider value={{ showToast, showError, closeSnackbar }}>
      {children}
    </ToastContext.Provider>
  );
};

// Consumer Hooks

/**
 * USAGE:
 *
 * 1. At the root of your app (main.tsx):
 *
 *    import { ToastProvider } from "src/helpers/toast";
 *    ...
 *    <ToastProvider>
 *      <App />
 *    </ToastProvider>
 *
 * 2. In any component:
 *    import { useToast, useErrorToast } from "src/helpers/toast";
 *
 *    const showToast = useToast();
 *    const showError = useErrorToast();
 *    showToast("Hello!", "info");
 *    showError("This is an error!");
 */
