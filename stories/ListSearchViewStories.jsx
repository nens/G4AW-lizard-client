import { storiesOf } from "@kadira/storybook";
import { i18nDecorator } from "./helpers";
import React from "react";

import ListSearchView from "../src/components/views/ListSearchView";

export default function runListSearchView() {
  storiesOf("[V] ListSearchView", module)
    .addDecorator(i18nDecorator)
    .add("initial view", () => <ListSearchView />);
}
