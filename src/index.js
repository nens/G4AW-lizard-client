import { AppContainer } from "react-hot-loader";
import { BrowserRouter as Router } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import { Provider } from "react-redux";
import { Route } from "react-router";
import { theStore } from "./store/Store";

import App from "./components/App";
import i18n from "./i18n"; // initialized i18next instance
import React from "react";
import ReactDOM from "react-dom";
import valuesES2017 from "object.values";

// Make the classic Object.values() work on Chrome (needed for some
// NPM dependencies). If we omit this, our G4AW app will not work on Chrome.
if (typeof Object.values !== "function") {
  Object.values = valuesES2017;
}

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <I18nextProvider i18n={i18n}>
        <Provider store={theStore}>
          <Router>
            <Route path="/" component={Component} />
          </Router>
        </Provider>
      </I18nextProvider>
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
