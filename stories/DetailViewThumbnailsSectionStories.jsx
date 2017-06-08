import { storiesOf } from "@kadira/storybook";
import { i18nDecorator, THUMBNAIL_LIST } from "./helpers.jsx";
import React from "react";

import DetailViewThumbnailsSection
  from "../src/components/DetailViewThumbnailsSection";

export default function runDetailViewThumbnailsSection() {
  storiesOf("DetailViewThumbnailsSection", module)
    .addDecorator(i18nDecorator)
    .add("photo gallery", () => (
      <DetailViewThumbnailsSection isOpen={true} thumbnails={THUMBNAIL_LIST} />
    ));
}
