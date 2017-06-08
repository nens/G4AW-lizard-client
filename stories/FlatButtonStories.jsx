import { storiesOf, action } from "@kadira/storybook";
import { i18nDecorator } from "./helpers.jsx";
import React from "react";

import FlatButton from "../src/components/FlatButton";

export default function runFlatButton() {
  storiesOf("FlatButton", module)
    .addDecorator(i18nDecorator)
    .add("flat button example", () => (
      <FlatButton buttonText="I am Flat" handleOnClick={action("clicked")} />
    ));
}
