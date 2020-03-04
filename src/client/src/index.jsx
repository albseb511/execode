import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import posthog from "posthog-js";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import store from "./redux/store";

console.log(process.env.REACT_APP_POSTHOG_TOKEN);
posthog.init(process.env.REACT_APP_POSTHOG_TOKEN, {
  api_host: "https://t.posthog.com"
});

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
