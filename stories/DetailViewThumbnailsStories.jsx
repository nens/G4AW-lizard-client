import { storiesOf } from "@kadira/storybook";
import { i18nDecorator, THUMBNAIL_LIST } from "./helpers.jsx";
import React from "react";

import DetailViewThumbnails from "../src/components/DetailViewThumbnails";

export default function runDetailViewThumbnails() {
  storiesOf("DetailViewThumbnails", module)
    .addDecorator(i18nDecorator)
    .add("thumbnail series", () => (
      <DetailViewThumbnails images={THUMBNAIL_LIST} />
    ));
}
