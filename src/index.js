import React from "react";
import ReactDOM from "react-dom";
import { Route } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";
import { AppContainer } from "react-hot-loader";
import { theStore } from "./store/Store";
import { Provider } from "react-redux";
import App from "./components/App";

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={theStore}>
        <Router>
          <Route path="/" component={Component} />
        </Router>
      </Provider>
    </AppContainer>,
    document.getElementById("root")
  );
};

render(App);

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept("./components/App", () => {
    render(require("./components/App").default);
  });
}
