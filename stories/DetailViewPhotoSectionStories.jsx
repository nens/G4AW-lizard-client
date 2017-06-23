import { storiesOf, action } from "@kadira/storybook";
import { i18nDecorator, PHOTO_LIST } from "./helpers.jsx";
import React from "react";

import DetailViewPhotoSection from "../src/components/DetailViewPhotoSection";

export default function runDetailViewPhotoSection() {
  storiesOf("DetailViewPhotoSection", module)
    .addDecorator(i18nDecorator)
    .add("photo section (open)", () => (
      <DetailViewPhotoSection
        isOpen
        photo={PHOTO_LIST[0]}
        onClick={action("Clicked on photo")}
      />
    ))
    .add("photo section (closed)", () => (
      <DetailViewPhotoSection
        isOpen={false}
        photo={PHOTO_LIST[0]}
        onClick={action("Clicked on photo")}
      />
    ));
}
