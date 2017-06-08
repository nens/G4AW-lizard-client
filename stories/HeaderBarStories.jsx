import { storiesOf, action } from "@kadira/storybook";
import { i18nDecorator, LOREM } from "./helpers.jsx";
import React from "react";

import HeaderBar from "../src/components/HeaderBar";

export default function runHeaderBar() {
  storiesOf("HeaderBar", module)
    .addDecorator(i18nDecorator)
    .add("example search results", () => <HeaderBar title="Some HeaderBar" />)
    .add("with icon", () => (
      <HeaderBar
        title="A HeaderBar with icon"
        icon="filter_list"
        handleClick={action("Clicked 'HeaderBar' icon")}
      />
    ));
}
