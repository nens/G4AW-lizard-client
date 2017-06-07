// HeaderBar.react-test.js
import React from "react";
import HeaderBar from "../src/components/HeaderBar";
import renderer from "react-test-renderer";

test("Component shows word Test as the title", () => {
  const component = renderer.create(<HeaderBar title="Test" />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
