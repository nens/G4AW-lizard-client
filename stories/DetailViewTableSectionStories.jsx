import React from "react";
import { storiesOf } from "@kadira/storybook";
import { i18nDecorator, DEFAULT_TABLE_DATA } from "./helpers";

import DetailViewTableSection from "../src/components/DetailViewTableSection";

export default function runDetailViewTableSection() {
  storiesOf("DetailViewTableSection", module)
    .addDecorator(i18nDecorator)
    .add("sample data", () => (
      <DetailViewTableSection isOpen={true} data={DEFAULT_TABLE_DATA} />
    ));
}
