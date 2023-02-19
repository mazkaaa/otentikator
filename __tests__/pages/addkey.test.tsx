import AddKeyForm from "@/components/reusables/addKeyForm";
import AddKey from "@/pages/addkey";
import { render, screen } from "@testing-library/react";
import renderer from "react-test-renderer";


describe("Addkey page", () => {
  it("renders a AddKey page", () => {
    render(<AddKey />)
    expect(screen.getByRole("form")).toBeInTheDocument()
  })
})
