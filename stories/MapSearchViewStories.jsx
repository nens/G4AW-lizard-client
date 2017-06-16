import { storiesOf } from "@kadira/storybook";
import { i18nDecorator } from "./helpers";
import React from "react";

import MapSearchView from "../src/components/views/MapSearchView";

export default function runMapSearchView() {
  storiesOf("MapSearchView", module)
    .addDecorator(i18nDecorator)
    .add("initial view", () => <MapSearchView />);
}
