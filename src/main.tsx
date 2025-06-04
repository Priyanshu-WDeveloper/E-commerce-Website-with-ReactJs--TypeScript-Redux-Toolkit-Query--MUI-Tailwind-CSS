import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import store from "./app/store";
// import MainContent from "./MainContent.js";
import {
  CssBaseline,
  StyledEngineProvider,
  ThemeProvider,
} from "@mui/material";
// import { Toaster } from "sonner";
import { ToastProvider } from "./helpers/toast";
import App from "./App";
import theme from "./Theme";
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  sendDefaultPii: true,
  integrations: [Sentry.browserTracingIntegration()],
  tracePropagationTargets: ["localhost", import.meta.env.VITE_BACK_URI],
  tracesSampleRate: 0.1, // set to 0.1 in prod for performance
  environment: import.meta.env.MODE,
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Sentry.ErrorBoundary fallback={<h1>Something went wrong</h1>}>
      <Provider store={store}>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            <CssBaseline /> {/* Resets and normalizes styling */}
            {/* <Toaster position="top-right" duration={4000} theme="light" /> */}
            <ToastProvider>
              <App />
            </ToastProvider>
            {/* <MainContent /> */}
          </ThemeProvider>
        </StyledEngineProvider>
      </Provider>
    </Sentry.ErrorBoundary>
  </StrictMode>
);
