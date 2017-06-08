import { storiesOf, action } from "@kadira/storybook";
import { i18nDecorator } from "./helpers.jsx";
import React from "react";

import FlatButton from "../src/components/FlatButton";
import LoginModal from "../src/components/LoginModal";

export default function runModal() {
  storiesOf("Modal", module)
    .addDecorator(i18nDecorator)
    .add("modal open", () => {
      const handleCancel = action("clicked 'Cancel' btn");
      const handleLogin = action("clicked 'Log in' btn");
      return (
        <LoginModal
          isOpen={true}
          handleCancel={handleCancel}
          handleLogin={handleLogin}
        />
      );
    })
    .add("modal closed", () => <LoginModal open={false} />);
}
