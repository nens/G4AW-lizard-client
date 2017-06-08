import { storiesOf, action } from "@kadira/storybook";
import { i18nDecorator, LOREM } from "./helpers";
import React from "react";

import DetailViewHeader from "../src/components/DetailViewHeader";

const vnTitle = "Hàng Tiệc Cưới Hàng Tiệc Cưới";
const vnSubTitle = "Đây là tiếng Việt";

function getComponent(kvargs = {}) {
  const DEFAULTS = {
    headerImage: undefined,
    halfMode: false,
    latlonzoom: { lat: 10.7880, lon: 106.7050, zoom: 17 },
    title: "LocTroi Farm ID",
    subTitle: "Field address goes here",
    handleBackButtonClick: action("back-button clicked")
  };
  const getVal = key => kvargs[key] || DEFAULTS[key];
  return (
    <DetailViewHeader
      headerImage={getVal("headerImage")}
      halfMode={getVal("halfMode")}
      latlonzoom={getVal("latlonzoom")}
      title={getVal("title")}
      subTitle={getVal("subTitle")}
      handleBackButtonClick={getVal("handleBackButtonClick")}
    />
  );
}

export default function runDetailViewHeader() {
  storiesOf("DetailViewHeader", module)
    .addDecorator(i18nDecorator)
    .add("example", () => getComponent())
    .add("half mode", () => getComponent({ halfMode: true }))
    .add("very long title", () => getComponent({ title: LOREM }))
    .add("very long subtitle", () => getComponent({ subTitle: LOREM }))
    .add("vietnamese", () =>
      getComponent({
        subTitle: vnSubTitle,
        title: vnTitle
      })
    )
    .add("header image instead of map background", () =>
      getComponent({
        headerImage: "http://i.imgur.com/vUWMZth.jpg"
      })
    );
}
