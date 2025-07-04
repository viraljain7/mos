import React from "react";
import ReactDOM from "react-dom/client";
import "react-quill/dist/quill.snow.css";
import "jsvectormap/dist/css/jsvectormap.css";
import "react-toastify/dist/ReactToastify.css";
import "react-modal-video/css/modal-video.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import { store } from "./rtk/store";
import { PermissionProvider } from './context/PermissionContext';


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
  <PermissionProvider>
    <Provider store={store}>
    <ToastContainer />
      <App />
    </Provider>
  </PermissionProvider>
  </>
);

reportWebVitals();
