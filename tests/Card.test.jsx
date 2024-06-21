import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { cleanup } from "@testing-library/react";

import Card from "../components/Card";

afterEach(cleanup);

describe("Card Component Tests", () => {
  // Test 1: Renders without crashing
  test("renders without crashing", () => {
    render(<Card heading="Test Heading" value="Test Value" />);
    expect(screen.getByText("Test Heading")).toBeInTheDocument();
  });

  // Test 2: Displays the passed heading
  test("displays the passed heading", () => {
    render(<Card heading="Sample Heading" value="Sample Value" />);
    expect(screen.getByText("Sample Heading")).toBeInTheDocument();
  });

  // Test 3: Displays the passed value
  test("displays the passed value", () => {
    render(<Card heading="Sample Heading" value="Sample Value" />);
    expect(screen.getByText("Sample Value")).toBeInTheDocument();
  });

  // Test 4: Has correct styling for the Box
  test("has correct styling for the box", () => {
    const { container } = render(
      <Card heading="Test Heading" value="Test Value" />
    );
    const box = container.firstChild;
    expect(box).toHaveStyle("border: 1px solid");
    expect(box).toHaveStyle("borderColor: primary.main");
  });

  // Test 5: Heading typography margin is correctly applied
  test("heading typography margin is correctly applied", () => {
    render(<Card heading="Test Heading" value="Test Value" />);
    const heading = screen.getByText("Test Heading");
    const style = window.getComputedStyle(heading);
    // Assuming the theme spacing value for '3' translates to '24px' margin as an example
    expect(style.marginTop).toBe("24px"); // or whatever the actual expected value is
  });

  // Test 6: Value typography has correct font size
  test("value typography has correct font size", () => {
    render(<Card heading="Test Heading" value="Test Value" />);
    const value = screen.getByText("Test Value");
    expect(value).toHaveStyle("fontSize: 30px");
  });

  // Test 7: Checks overflowX style for value Typography
  test("checks overflowX style for value Typography", () => {
    render(<Card heading="Test Heading" value="Test Value" />);
    const value = screen.getByText("Test Value");
    expect(value).toHaveStyle("overflowX: auto");
  });

  // Test 8: Renders correctly with empty props
  test("renders correctly with empty props", () => {
    const { container } = render(<Card heading="" value="" />);
    const box = container.firstChild;
    expect(box).toBeInTheDocument();
    // Optionally, check if the Typography components are present without text
    const typographyElements = container.querySelectorAll("p");
    // Assuming there are exactly two Typography elements in the component
    expect(typographyElements.length).toBe(2);
    // Optionally, check if these elements are indeed empty
    typographyElements.forEach((element) => {
      expect(element).toBeEmptyDOMElement();
    });
  });

  // Test 9: Verifies border radius of the Box
  test("verifies border radius of the box", () => {
    const { container } = render(
      <Card heading="Test Heading" value="Test Value" />
    );
    const box = container.firstChild;
    expect(box).toHaveStyle("borderRadius: 10px");
  });
});
