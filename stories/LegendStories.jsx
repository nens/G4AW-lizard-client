import { storiesOf, action } from "@kadira/storybook";
import { i18nDecorator } from "./helpers.jsx";
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
        data={[
          {
            title: "Rice growth",
            attribution: "",
            url: "",
            mapThumb: "",
            opacity: 1,
            layerType: "tms",
            layerOptions: {},
            active: true,
            legend: [
              {
                label: "Harvest",
                color: "#E84506"
              },
              {
                label: "Ripening",
                color: "#FF7813"
              },
              {
                label: "Milking",
                color: "#FFC306"
              },
              {
                label: "Tillering",
                color: "yellow"
              }
            ]
          },
          {
            title: "Pest risk",
            attribution: "",
            url: "",
            mapThumb: "",
            opacity: 1,
            layerType: "tms",
            layerOptions: {},
            active: false,
            legend: []
          },
          {
            title: "Flood risk",
            attribution: "",
            url: "",
            mapThumb: "",
            opacity: 1,
            layerType: "tms",
            layerOptions: {},
            active: false,
            legend: [
              {
                label: "Low risk",
                color: "#fff"
              },
              {
                label: "Medium risk",
                color: "#CCE1F1"
              },
              {
                label: "High risk",
                color: "#005292"
              },
              {
                label: "Extreme risk",
                color: "#00385F"
              }
            ]
          }
        ]}
        isOpen={true}
      />
    ))
    .add("legend open, showing flood risk", () => (
      <Legend
        handleToggleLegend={action("open/close legend")}
        handlePreviousLayer={action("to previous layer")}
        handleNextLayer={action("to next layer")}
        activeLegendIdx={2}
        data={[
          {
            title: "Rice growth",
            attribution: "",
            url: "",
            mapThumb: "",
            opacity: 1,
            layerType: "tms",
            layerOptions: {},
            active: true,
            legend: [
              {
                label: "Harvest",
                color: "#E84506"
              },
              {
                label: "Ripening",
                color: "#FF7813"
              },
              {
                label: "Milking",
                color: "#FFC306"
              },
              {
                label: "Tillering",
                color: "yellow"
              }
            ]
          },
          {
            title: "Pest risk",
            attribution: "",
            url: "",
            mapThumb: "",
            opacity: 1,
            layerType: "tms",
            layerOptions: {},
            active: false,
            legend: []
          },
          {
            title: "Flood risk",
            attribution: "",
            url: "",
            mapThumb: "",
            opacity: 1,
            layerType: "tms",
            layerOptions: {},
            active: false,
            legend: [
              {
                label: "Low risk",
                color: "#fff"
              },
              {
                label: "Medium risk",
                color: "#CCE1F1"
              },
              {
                label: "High risk",
                color: "#005292"
              },
              {
                label: "Extreme risk",
                color: "#00385F"
              }
            ]
          }
        ]}
        isOpen={true}
      />
    ))
    .add("legend closed", () => (
      <Legend
        handleToggleLegend={action("open/close legend")}
        handlePreviousLayer={action("to previous layer")}
        handleNextLayer={action("to next layer")}
        data={{}}
        isOpen={false}
      />
    ));
}
