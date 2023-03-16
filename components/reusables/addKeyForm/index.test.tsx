import { useKey } from "@/components/context/keyProvider";
import { render, screen, fireEvent, renderHook } from "@testing-library/react";
import * as otpauth from "otpauth";
import AddKeyForm from ".";

describe("Add Key Form Component", () => {
  const url =
    "otpauth://totp/Example:alice@google.com?secret=JBSWY3DPEHPK3PXP&issuer=Example";
  const parsedUrl = otpauth.URI.parse(url);

  it("on initial render, it should show the manual input form first", async () => {
    render(<AddKeyForm />);
    expect(screen.getByRole("heading")).toHaveTextContent("2FA Input Form");
  });

  it("form should show up on AddKeyForm component screen", () => {
    render(<AddKeyForm />);
    const form = screen.getByTestId("keyform");
    const labelInput = screen.getByTestId("labelInput");
    const issuerInput = screen.getByTestId("issuerInput");
    const secretInput = screen.getByTestId("secretInput");

    expect(form).toBeInTheDocument();
    expect(labelInput).toBeInTheDocument();
    expect(issuerInput).toBeInTheDocument();
    expect(secretInput).toBeInTheDocument();
  });

  it("adding a key using manual form input field", async () => {
    const mockSubmit = jest.fn();
    render(<AddKeyForm onSubmit={mockSubmit} />);

    const form = screen.getByTestId("keyform");
    const labelInput = screen.getByTestId("labelInput");
    const issuerInput = screen.getByTestId("issuerInput");
    const secretInput = screen.getByTestId("secretInput");

    fireEvent.change(labelInput, {
      target: {
        value: parsedUrl.label,
      },
    });
    fireEvent.change(issuerInput, {
      target: {
        value: parsedUrl.issuer,
      },
    });
    fireEvent.change(secretInput, {
      target: {
        value: parsedUrl.secret.base32,
      },
    });
    expect(form).toHaveFormValues({
      label: parsedUrl.label,
      issuer: parsedUrl.issuer,
      secret: parsedUrl.secret.base32,
    });

    fireEvent.submit(form);
    expect(mockSubmit).toBeCalled();
  });
});
