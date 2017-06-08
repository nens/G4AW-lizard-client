import { storiesOf } from "@kadira/storybook";
import { i18nDecorator, PHOTO_LIST } from "./helpers.jsx";
import React from "react";

import PhotoView from "../src/components/PhotoView";

function getPhotoView(idx) {
  return <PhotoView currentPhotoIdx={idx} images={PHOTO_LIST} />;
}

export default function runPhotoView() {
  storiesOf("PhotoView", module)
    .addDecorator(i18nDecorator)
    .add("open at index 0", () => getPhotoView(0))
    .add("open at index 1", () => getPhotoView(1))
    .add("open at index 2", () => getPhotoView(2));
}
