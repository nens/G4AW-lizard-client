import { storiesOf } from "@kadira/storybook";
import { i18nDecorator } from "./helpers.jsx";
import React from "react";

import InputField from "../src/components/InputField";

export default function runInputField() {
  storiesOf("InputField", module)
    .add("empty inputfield", () => <InputField />)
    .add("with hinttext", () => <InputField hintText="Username" />)
    .add("type=password", () => (
      <InputField type="password" hintText="Password" />
    ));
}
