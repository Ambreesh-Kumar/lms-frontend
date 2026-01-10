import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// import App from "./App.jsx";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { store } from "./app/store"; // <- Redux store
import router from "./router/router";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);




