import React from "react";
import { storiesOf } from "@kadira/storybook";
import { i18nDecorator, DEFAULT_TABLE_DATA } from "./helpers";

import DetailViewTable from "../src/components/DetailViewTable";

export default function runDetailViewTable() {
  storiesOf("DetailViewTable", module)
    .addDecorator(i18nDecorator)
    .add("sample data", () => <DetailViewTable data={DEFAULT_TABLE_DATA} />)
    .add("no data", () => <DetailViewTable data={[]} />);
}
