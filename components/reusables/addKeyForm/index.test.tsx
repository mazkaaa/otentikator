import { render, screen, fireEvent, renderHook } from "@testing-library/react"
import AddKeyForm from "."
import * as otpauth from "otpauth"
import { useKey } from "@/components/context/keyProvider";

const mockGetUserMedia = jest.fn(async () => {
  return new Promise<void>((resolve) => {
    resolve();
  });
});

Object.defineProperty(global.navigator, "mediaDevices", {
  value: {
    getUserMedia: mockGetUserMedia,
  },
});

describe("Add Key Form Component", () => {
  const url =
    "otpauth://totp/Example:alice@google.com?secret=JBSWY3DPEHPK3PXP&issuer=Example";
  const parsedUrl = otpauth.URI.parse(url)

  it("on initial render, it should show the manual input form first", async () => {
    render(<AddKeyForm />)
    expect(screen.getByRole("heading")).toHaveTextContent("2FA Input Form")
  })
  it("switching to scanner page", () => {
    render(<AddKeyForm />);
    fireEvent.click(
      screen.getByRole("button", {
        name: "Scan QR code",
      })
    );
  })
})