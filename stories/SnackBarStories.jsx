import { storiesOf, action } from "@kadira/storybook";
import { i18nDecorator } from "./helpers";
import React from "react";

import SnackBar from "../src/components/SnackBar";

export default function runSnackBar() {
  storiesOf("SnackBar", module)
    .add("default", () => (
      <SnackBar
        isOpen
        message={"This is a test"}
        actionText={"OK"}
        onActionTap={action("clicked")}
      />
    ))
    .add("long string", () => (
      <SnackBar
        isOpen={true}
        message={
          "This is a very, very, very, very, very, very, very, very, very, very, very, very, very, very, very, very, very, very, very, very, very, verrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrry long string that could break the ui"
        }
        actionText={"OK"}
        onActionTap={action("clicked")}
      />
    ))
    .add("long action string", () => (
      <SnackBar
        isOpen={true}
        message={"This is a test"}
        actionText={"Now click this button"}
        onActionTap={action("clicked")}
      />
    ))
    .add("in vietnamese", () => (
      <SnackBar
        isOpen={true}
        message={"Đây là tiếng Việt"}
        actionText={"được"}
        onActionTap={action("clicked")}
      />
    ))
    .add("with submessage", () => (
      <SnackBar
        isOpen={true}
        message={"This is a SnackBar"}
        subMessage={"with a sub message"}
        actionText={"OK"}
        onActionTap={action("clicked")}
      />
    ));
}
