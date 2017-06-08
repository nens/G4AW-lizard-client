import { storiesOf } from "@kadira/storybook";
import { i18nDecorator } from "./helpers.jsx";
import React from "react";

import CollapsibleBar from "../src/components/CollapsibleBar";

export default function runCollapsibleBar() {
  storiesOf("CollapsibleBar", module)
    .addDecorator(i18nDecorator)
    .add("rice growth closed", () => (
      <CollapsibleBar title="Rice Growth" subTitle="Stage 4" isOpen={false} />
    ))
    .add("rice growth open", () => (
      <CollapsibleBar title="Rice Growth" subTitle="Stage 4" isOpen={true} />
    ))
    .add("rice growth open, colored", () => (
      <CollapsibleBar title="Rice Growth" colorCode="#FFBF1D" isOpen={true} />
    ));
}
