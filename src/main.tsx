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
import { SnackbarProvider } from "notistack";
// import { Toaster } from "sonner";
import App from "./App";
import theme from "./Theme";
import * as Sentry from "@sentry/react";
import SomethingWentWrong from "./components/404";

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
    <Sentry.ErrorBoundary fallback={<SomethingWentWrong />}>
      <Provider store={store}>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            <CssBaseline /> {/* Resets and normalizes styling */}
            <SnackbarProvider
              maxSnack={3}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              autoHideDuration={1000}
            >
              <App />
            </SnackbarProvider>
            {/* <MainContent /> */}
          </ThemeProvider>
        </StyledEngineProvider>
      </Provider>
    </Sentry.ErrorBoundary>
  </StrictMode>
);
