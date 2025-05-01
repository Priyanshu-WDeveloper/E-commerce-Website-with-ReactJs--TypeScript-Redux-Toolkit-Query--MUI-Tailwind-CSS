import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.js";
import { Provider } from "react-redux";
import store from "./app/store.js";
// import MainContent from "./MainContent.js";
import { StyledEngineProvider } from "@mui/material";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <StyledEngineProvider injectFirst>
        <App />
        {/* <MainContent /> */}
      </StyledEngineProvider>
    </Provider>
  </StrictMode>
);
