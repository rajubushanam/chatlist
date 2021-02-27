import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { Header } from "../components/Header";

afterEach(cleanup);

describe("Sort Button and Next Button rendered", () => {
  test("should display button with text Sort by Date(asc)", () => {
    render(<Header />);
    expect(screen.getByText("Sort by Date(asc)")).toBeTruthy();
  });
});
