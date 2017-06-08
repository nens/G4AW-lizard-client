import { storiesOf, action } from "@kadira/storybook";
import { i18nDecorator } from "./helpers.jsx";
import React from "react";

import ToggleSwitch from "../src/components/ToggleSwitch";

export default function runInputField() {
  storiesOf("ToggleSwitch", module)
    .add("example: selected", () => (
      <ToggleSwitch
        defaultSelected={true}
        labelText="Some setting"
        onChange={action("Toggled switch")}
        labelOnText="On"
        labelOffText="Off"
      />
    ))
    .add("example: not selected", () => (
      <ToggleSwitch
        defaultSelected={false}
        labelText="Some setting"
        onChange={action("Toggled switch")}
        labelOnText="On"
        labelOffText="Off"
      />
    ));
}
