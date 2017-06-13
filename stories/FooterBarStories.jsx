import { storiesOf, action } from "@kadira/storybook";
import { i18nDecorator, LOREM } from "./helpers.jsx";
import React from "react";

import FooterBar from "../src/components/FooterBar";

export default function runFooterBar() {
  storiesOf("FooterBar", module)
    .addDecorator(i18nDecorator)
    .add("example", () => (
      <FooterBar>
        <div>
          <i className="material-icons">access_time</i>
        </div>
        <div>
          <i className="material-icons">list</i>
        </div>
      </FooterBar>
    ));
}
