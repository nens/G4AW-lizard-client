import { storiesOf } from "@kadira/storybook";
import { i18nDecorator } from "./helpers";
import React from "react";

import ListSearchView from "../src/components/ListSearchView";

export default function runListSearchView() {
  storiesOf("ListSearchView", module)
    .addDecorator(i18nDecorator)
    .add("initial view", () => <ListSearchView />);
}
