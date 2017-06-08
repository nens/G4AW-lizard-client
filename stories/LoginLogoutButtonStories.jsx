import { storiesOf, action } from "@kadira/storybook";
import { i18nDecorator } from "./helpers.jsx";
import React from "react";

import LoginLogoutButton from "../src/components/LoginLogoutButton";

export default function runLoginLogoutButton() {
  storiesOf("LoginLogoutButton", module)
    .addDecorator(i18nDecorator)
    .add("login button", () => (
      <LoginLogoutButton
        handleClick={action("clicked 'Login' button")}
        text="Login"
      />
    ))
    .add("logout button", () => (
      <LoginLogoutButton
        handleClick={action("clicked 'Logout' button")}
        text="Logout"
      />
    ));
}
