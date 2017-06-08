import { storiesOf, action } from "@kadira/storybook";
import { i18nDecorator } from "./helpers.jsx";
import React from "react";

import ViewSwitchButton from "../src/components/ViewSwitchButton";

export default function runLoginLogoutButton() {
  storiesOf("ViewSwitchButton", module)
    .addDecorator(i18nDecorator)
    .add("switch to map-view", () => (
      <ViewSwitchButton
        handleOnClick={action("Clicked (switch to map-view")}
        viewIsMap={false}
      />
    ))
    .add("switch to list-view", () => (
      <ViewSwitchButton
        handleOnClick={action("Clicked (switch to list-view)")}
        viewIsMap={true}
      />
    ));
}
