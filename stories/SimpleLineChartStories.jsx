import { storiesOf } from "@kadira/storybook";
import { i18nDecorator } from "./helpers.jsx";
import React from "react";

import SimpleLineChart from "../src/components/SimpleLineChart";
import { SIMPLE_LINE_CHART_DATA } from "./helpers";

export default function runSimpleLineChart() {
  storiesOf("SimpleLineChart", module)
    .addDecorator(i18nDecorator)
    .add("tiny and simple", () => (
      <SimpleLineChart
        lineColor="#8884d8"
        width={250}
        height={120}
        data={SIMPLE_LINE_CHART_DATA}
      />
    ))
    .add("larger, with grid", () => (
      <SimpleLineChart
        lineColor="#8884d8"
        showGrid={true}
        width={500}
        height={300}
        data={SIMPLE_LINE_CHART_DATA}
      />
    ));
}
