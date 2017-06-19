import { storiesOf } from "@kadira/storybook";
import { i18nDecorator, LOREM } from "./helpers.jsx";
import React from "react";

import DetailView from "../src/components/views/DetailView";

export default function runDetailView() {
  storiesOf("DetailView", module)
    .addDecorator(i18nDecorator)
    .add("default", () => {
      return <DetailView />;
    });
}
