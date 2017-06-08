import { storiesOf, action } from "@kadira/storybook";
import { i18nDecorator } from "./helpers.jsx";
import React from "react";

import RaisedButton from "../src/components/RaisedButton";

export default function runRaisedButton() {
  storiesOf("RaisedButton", module)
    .addDecorator(i18nDecorator)
    .add("icon example", () => (
      <RaisedButton
        iconClass="lock"
        buttonText="With icon"
        handleOnClick={action("clicked")}
      />
    ))
    .add("iconless example", () => (
      <RaisedButton buttonText="No icon" handleOnClick={action("clicked")} />
    ))
    .add("disabled", () => (
      <RaisedButton iconClass="block" disabled={true} buttonText="Disabled" />
    ));
}
