import React from "react";
import { Provider } from "react-redux";
import { I18nextProvider } from "react-i18next";
import i18n from "../src/i18n"; // initialized i18next instance
import SearchBar from "../src/components/SearchBar.jsx";
import ViewSwitchButton from "../src/components/ViewSwitchButton.jsx";
import RaisedButton from "../src/components/RaisedButton.jsx";
import LoginLogoutButton from "../src/components/LoginLogoutButton.jsx";
import SnackBar from "../src/components/SnackBar.jsx";
import { theStore } from "../src/store/Store";
import { storiesOf, action } from "@kadira/storybook";

storiesOf("RaisedButton", module)
  .addDecorator(getStory => (
    <I18nextProvider i18n={i18n}>
      {getStory()}
    </I18nextProvider>
  ))
  .add("timeline example", () => (
    <RaisedButton
      iconClass="timeline"
      buttonText="Timeline"
      handleOnClick={action("clicked")}
    />
  ))
  .add("iconless example", () => (
    <RaisedButton buttonText="No icon" handleOnClick={action("clicked")} />
  ))
  .add("disabled", () => (
    <RaisedButton iconClass="block" disabled={true} buttonText="Disabled" />
  ));

storiesOf("LoginLogoutButton", module)
  .addDecorator(getStory => (
    <I18nextProvider i18n={i18n}>
      {getStory()}
    </I18nextProvider>
  ))
  .add("login button", () => (
    <LoginLogoutButton handleOnClick={action("clicked")} />
  ))
  .add("logout button", () => (
    <LoginLogoutButton handleOnClick={action("clicked")} />
  ));

storiesOf("ViewSwitchButton", module)
  .addDecorator(getStory => (
    <I18nextProvider i18n={i18n}>
      {getStory()}
    </I18nextProvider>
  ))
  .add("switch to map", () => (
    <ViewSwitchButton handleOnClick={action("clicked")} />
  ))
  .add("switch to omnibox", () => (
    <ViewSwitchButton handleOnClick={action("clicked")} />
  ));

storiesOf("SearchBar", module)
  .addDecorator(getStory => (
    <Provider store={theStore}>
      {getStory()}
    </Provider>
  ))
  .add("empty bar", () => <SearchBar />);

storiesOf("SnackBar", module).add("default", () => (
  <SnackBar
    open={true}
    message={"This is a test"}
    action={"OK"}
    onActionTap={action("clicked")}
  />
));

storiesOf("SnackBar", module).add("timeout", () => (
  <SnackBar
    autoHideDuration={5000}
    open={true}
    message={"This closes after 5 seconds"}
    action={"Fine"}
    onActionTap={action("clicked")}
  />
));

storiesOf("SnackBar", module).add("long string", () => (
  <SnackBar
    open={true}
    message={"This is a very long string that could break the ui"}
    action={"OK"}
    onActionTap={action("clicked")}
  />
));

storiesOf("SnackBar", module).add("long action string", () => (
  <SnackBar
    open={true}
    message={"This is a test"}
    action={"Now click this button"}
    onActionTap={action("clicked")}
  />
));

storiesOf("SnackBar", module).add("in vietnamese", () => (
  <SnackBar
    open={true}
    message={"Đây là tiếng Việt"}
    action={"được"}
    onActionTap={action("clicked")}
  />
));
