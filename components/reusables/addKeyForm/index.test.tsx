import { render, screen, fireEvent, renderHook } from "@testing-library/react"
import AddKeyForm from "."
import * as otpauth from "otpauth"
import { useKey } from "@/components/context/keyProvider";

describe("Add Key Form Component", () => {
  const url =
    "otpauth://totp/Example:alice@google.com?secret=JBSWY3DPEHPK3PXP&issuer=Example";
  const parsedUrl = otpauth.URI.parse(url)

  it("Adding a key using manual form", async () => {
    const element = render(<AddKeyForm />)

    const issuerForm = element.getByAltText("issuer")
    const labelForm = element.getByAltText("label");
    const secretForm = element.getByAltText("secret");
    const submitButton = element.getByRole("button", {
      name: "Add Key"
    })

    fireEvent.change(issuerForm, {
      target: {
        value: parsedUrl.issuer
      }
    })
    fireEvent.change(labelForm, {
      target: {
        value: parsedUrl.label,
      },
    });
    fireEvent.change(secretForm, {
      target: {
        value: parsedUrl.secret.base32,
      },
    });

    fireEvent.click(submitButton)

    const arraytemp: [] = JSON.parse(localStorage.getItem("key")!)
  })
})