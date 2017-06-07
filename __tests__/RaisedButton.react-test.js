// RaisedButton.react-test.js
import React from "react";
import { RaisedButton } from "../src/components/RaisedButton";
import renderer from "react-test-renderer";

test("buttonText is shown as OK", () => {
  const component = renderer.create(<RaisedButton buttonText="OK" />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
