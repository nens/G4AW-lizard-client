import { storiesOf, action } from "@kadira/storybook";
import { i18nDecorator, DEMO_LAYERS } from "./helpers";
import React from "react";

import LayerSelection from "../src/components/LayerSelection";

export default function runLayerSelection() {
  storiesOf("LayerSelection", module)
    .addDecorator(i18nDecorator)
    .add("topo selected of 7 layers total", () => (
      <LayerSelection
        handleLayerSelect={action("handleLayerSelect()")}
        layers={DEMO_LAYERS}
      />
    ));
}
