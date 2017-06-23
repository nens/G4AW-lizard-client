import { storiesOf } from "@kadira/storybook";
import { i18nDecorator, PHOTO_LIST } from "./helpers.jsx";
import React from "react";

import PhotoView from "../src/components/views/PhotoView";

export default function runPhotoView() {
  storiesOf("PhotoView", module)
    .addDecorator(i18nDecorator)
    .add("default", () => <PhotoView photo={PHOTO_LIST[0]} />);
}
