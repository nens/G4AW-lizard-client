import { storiesOf, action } from "@kadira/storybook";
import { i18nDecorator, LEGEND_DATA } from "./helpers";
import React from "react";

import Legend from "../src/components/Legend";

export default function runLegend() {
  storiesOf("Legend", module)
    .addDecorator(i18nDecorator)
    .add("legend open, showing rice growth", () => (
      <Legend
        activeLegendIdx={0}
        handleToggleLegend={action("open/close legend")}
        handlePreviousLayer={action("to previous layer")}
        handleNextLayer={action("to next layer")}
        data={LEGEND_DATA}
        isOpen={true}
      />
    ))
    .add("legend open, showing flood risk", () => (
      <Legend
        handleToggleLegend={action("open/close legend")}
        handlePreviousLayer={action("to previous layer")}
        handleNextLayer={action("to next layer")}
        activeLegendIdx={2}
        data={LEGEND_DATA}
        isOpen={true}
      />
    ))
    .add("legend closed", () => (
      <Legend
        handleToggleLegend={action("open/close legend")}
        handlePreviousLayer={action("to previous layer")}
        handleNextLayer={action("to next layer")}
        activeLegendIdx={2}
        data={LEGEND_DATA}
        isOpen={false}
      />
    ));
}
