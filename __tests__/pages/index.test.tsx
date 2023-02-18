import AddKey from "@/pages/addkey";
import { render, screen } from "@testing-library/react";
import React from "react";

describe("Add Key Form Component", () => {
  it("renders an add key form component", () => {
    render(<AddKey />);
  });
});
