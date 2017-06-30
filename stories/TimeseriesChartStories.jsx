import { storiesOf } from "@kadira/storybook";
import { i18nDecorator } from "./helpers.jsx";
import React from "react";

import TimeseriesChart from "../src/components/TimeseriesChart";

export default function runTimeseriesChart() {
  storiesOf("TimeseriesChart", module)
    .addDecorator(i18nDecorator)
    .add("static example", () => <TimeseriesChart />);
}
