import { storiesOf, action } from "@kadira/storybook";
import { i18nDecorator } from "./helpers";
import React from "react";

import SnackBar from "../src/components/SnackBar";

export default function runSnackBar() {
  storiesOf("SnackBar", module)
    .add("default", () => (
      <SnackBar
        open={true}
        message={"This is a test"}
        actionText={"OK"}
        onActionTap={action("clicked")}
      />
    ))
    .add("timeout", () => (
      <SnackBar
        autoHideDuration={5000}
        open={true}
        message={"This closes after 5 seconds"}
        actionText={"Fine"}
        onActionTap={action("clicked")}
      />
    ))
    .add("long string", () => (
      <SnackBar
        open={true}
        message={
          "This is a very, very, very, very, very, very, very, very, very, very, very, very, very, very, very, very, very, very, very, very, very, verrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrry long string that could break the ui"
        }
        actionText={"OK"}
        onActionTap={action("clicked")}
      />
    ))
    .add("long action string", () => (
      <SnackBar
        open={true}
        message={"This is a test"}
        actionText={"Now click this button"}
        onActionTap={action("clicked")}
      />
    ))
    .add("in vietnamese", () => (
      <SnackBar
        open={true}
        message={"Đây là tiếng Việt"}
        actionText={"được"}
        onActionTap={action("clicked")}
      />
    ))
    .add("with submessage", () => (
      <SnackBar
        open={true}
        message={"This is a SnackBar"}
        subMessage={"with a sub message"}
        actionText={"OK"}
        onActionTap={action("clicked")}
      />
    ));
}
