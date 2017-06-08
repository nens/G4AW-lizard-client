import { storiesOf } from "@kadira/storybook";
import { i18nDecorator } from "./helpers.jsx";
import React from "react";

import SearchBar from "../src/components/SearchBar";

export default function runSearchBar() {
  storiesOf("SearchBar", module)
    .addDecorator(i18nDecorator)
    .add("empty bar", () => <SearchBar />);
}
