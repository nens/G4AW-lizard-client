import { storiesOf, action } from "@kadira/storybook";
import { i18nDecorator } from "./helpers.jsx";
import React from "react";

import LayerSelection from "../src/components/LayerSelection";

export default function runLayerSelection() {
  storiesOf("LayerSelection", module)
    .addDecorator(i18nDecorator)
    .add("topo selected of 7 layers total", () => (
      <LayerSelection
        handleLayerSelect={action("handleLayerSelect()")}
        layers={[
          {
            title: "Satellite",
            attribution: "",
            url: "https://{s}.tiles.mapbox.com/v3/nelenschuurmans.iaa79205/{z}/{x}/{y}.png",
            mapThumb: "https://a.tiles.mapbox.com/v3/nelenschuurmans.iaa79205/11/1632/963.png",
            opacity: 1,
            layerType: "tms",
            layerOptions: {},
            active: false
          },
          {
            title: "Topo",
            attribution: "",
            url: "https://{s}.tiles.mapbox.com/v3/nelenschuurmans.iaa98k8k/{z}/{x}/{y}.png",
            mapThumb: "https://a.tiles.mapbox.com/v3/nelenschuurmans.iaa98k8k/11/1632/963.png",
            opacity: 1,
            layerType: "tms",
            layerOptions: {},
            active: true
          },
          {
            title: "Aerial",
            attribution: "",
            url: "",
            opacity: 1,
            layerType: "wms",
            layerOptions: {},
            active: false
          },
          {
            title: "LIDAR",
            attribution: "",
            url: "",
            opacity: 1,
            layerType: "wms",
            layerOptions: {},
            active: false
          },
          {
            title: "NDVI",
            attribution: "",
            url: "",
            opacity: 1,
            layerType: "wms",
            layerOptions: {},
            active: false
          },
          {
            title: "Landsat",
            attribution: "",
            url: "",
            opacity: 1,
            layerType: "wms",
            layerOptions: {},
            active: false
          },
          {
            title: "Sentinel 2A",
            attribution: "",
            url: "",
            opacity: 1,
            layerType: "wms",
            layerOptions: {},
            active: false
          }
        ]}
      />
    ));
}
