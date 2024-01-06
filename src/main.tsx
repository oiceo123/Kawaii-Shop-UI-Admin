import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { store } from "./redux";
import { Provider } from "react-redux";
import LoadingComponent from "./components/Loading";

ReactDOM.render(
  <React.StrictMode>
    <React.Suspense fallback={<LoadingComponent />}>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </React.Suspense>
  </React.StrictMode>,
  document.getElementById("root")
);
