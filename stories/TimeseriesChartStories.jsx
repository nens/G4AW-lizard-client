import { storiesOf } from "@kadira/storybook";
import { i18nDecorator } from "./helpers.jsx";
import React from "react";

import TimeseriesGraph from "../src/components/TimeseriesGraph";

export default function runTimeseriesChart() {
  storiesOf("TimeseriesGraph", module)
    .addDecorator(i18nDecorator)
    .add("static example", () => <TimeseriesGraph />);
}
