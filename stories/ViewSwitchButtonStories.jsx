import { storiesOf, action } from "@kadira/storybook";
import { i18nDecorator } from "./helpers.jsx";
import React from "react";

import ViewSwitchButton from "../src/components/ViewSwitchButton";

export default function runLoginLogoutButton() {
  storiesOf("ViewSwitchButton", module)
    .addDecorator(i18nDecorator)
    .add("switch to map", () => (
      <ViewSwitchButton handleOnClick={action("Clicked (switch to map")} />
    ))
    .add("switch to omnibox", () => (
      <ViewSwitchButton handleOnClick={action("Clicked (switch to omnibox)")} />
    ));
}
