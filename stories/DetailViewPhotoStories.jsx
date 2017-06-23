import { storiesOf, action } from "@kadira/storybook";
import { i18nDecorator, PHOTO_LIST } from "./helpers.jsx";
import React from "react";

import DetailViewPhoto from "../src/components/DetailViewPhoto";

export default function runDetailViewPhoto() {
  storiesOf("DetailViewphoto", module)
    .addDecorator(i18nDecorator)
    .add("default", () => (
      <DetailViewPhoto
        photo={PHOTO_LIST[0]}
        onClick={action("Clicked on photo")}
      />
    ));
}
