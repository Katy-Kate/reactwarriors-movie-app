import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import "bootstrap/dist/css/bootstrap.min.css";
import "./stylesheets/index.css";
import * as serviceWorker from "./serviceWorker";
import { formStore } from "./stores/formStore";
import { userStore } from "./stores/userStore";
import { moviesStore } from "./stores/moviesStore";
import { Provider } from "mobx-react";

ReactDOM.render(
  <Provider
    formStore={formStore}
    userStore={userStore}
    moviesStore={moviesStore}
  >
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
