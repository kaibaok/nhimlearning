import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/store";
import reportWebVitals from "./reportWebVitals";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "src/assets/css/dashlite.css";
import "src/assets/css/theme.css";
import "react-toastify/dist/ReactToastify.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
const path = window.location.pathname.split("/");
const isAdminPage = path[1] === "admin";
if (!isAdminPage) {
  import("bootstrap/dist/css/bootstrap.min.css");
  import("react-toastify/dist/ReactToastify.min.css");
  import("src/assets/scss/master.scss");
  import("font-awesome/css/font-awesome.min.css");
  // import("react-modal-video/scss/modal-video.scss");
} else {
  // <link rel="stylesheet" href="./assets/css/dashlite.css?ver=3.0.3">
  // <link id="skin-default" rel="stylesheet" href="./assets/css/theme.css?ver=3.0.3"></link>
}

root.render(
  <React.Suspense>
    <Provider store={store}>
      <App isAdminPage={isAdminPage} />
    </Provider>
  </React.Suspense>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
