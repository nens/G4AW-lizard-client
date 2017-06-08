import { storiesOf } from "@kadira/storybook";
import { i18nDecorator, LOREM } from "./helpers.jsx";
import React from "react";

import DetailViewSection from "../src/components/DetailViewSection";
import DetailViewTable from "../src/components/DetailViewTable";

export default function runDetailViewSection() {
  storiesOf("DetailViewSection", module)
    .addDecorator(i18nDecorator)
    .add("rice growth open", () => (
      <DetailViewSection
        title="Rice Growth"
        colorCode="#FFBF1D"
        subTitle="Stage 4"
        isOpen={true}
      >
        <div>{LOREM}</div>
      </DetailViewSection>
    ))
    .add("rice growth closed", () => (
      <DetailViewSection
        title="Rice Growth"
        colorCode="#FFBF1D"
        subtitle="Stage 4"
        isOpen={false}
      >
        <div>{LOREM}</div>
      </DetailViewSection>
    ));
}
