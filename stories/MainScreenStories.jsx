import { storiesOf } from "@kadira/storybook";
import { i18nDecorator } from "./helpers";
import React from "react";

import MainScreen from "../src/components/pages/MainScreen";

export default function runMainScreen() {
  storiesOf("MainScreen", module)
    .addDecorator(i18nDecorator)
    .add("main view", () => <MainScreen />);
}
