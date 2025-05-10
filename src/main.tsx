import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import store from "./app/store";
// import MainContent from "./MainContent.js";
import { StyledEngineProvider } from "@mui/material";
// import { Toaster } from "sonner";
import { ToastProvider } from "./helpers/toast";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <StyledEngineProvider injectFirst>
        {/* <Toaster position="top-right" duration={4000} theme="light" /> */}
        <ToastProvider>
          <App />
        </ToastProvider>
        {/* <MainContent /> */}
      </StyledEngineProvider>
    </Provider>
  </StrictMode>
);
