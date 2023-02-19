import { render, screen } from "@testing-library/react";
import AddKeyForm from "../addKeyForm";

describe("KeyCard Component", () => {
  it("renders a KeyCard component", () => {
    render(<AddKeyForm />)
  });
});
