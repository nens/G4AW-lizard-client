import { storiesOf } from "@kadira/storybook";
import { i18nDecorator } from "./helpers";
import React from "react";

import MainScreen from "../src/components/views/MainView";

export default function runMainScreen() {
  storiesOf("[V] MainView", module)
    .addDecorator(i18nDecorator)
    .add("main view", () => <MainScreen />);
}
