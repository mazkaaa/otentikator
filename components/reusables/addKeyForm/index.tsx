import React, { useState } from "react";
import { toast } from "react-toastify";
import * as OTPAuth from "otpauth";
import { useKey } from "../../context/keyProvider";
import QrScanner from "../qrScanner";
import AddKeyFormHandler from "./index.handler";
import H1 from "../typography/h1";
import Input from "../layouts/input";

const AddKeyForm = () => {
  const [loadScan, setLoadScan] = useState(false);

  const { addKey, isHaveKey } = useKey();
  const handler = AddKeyFormHandler();

  return (
    <>
      {!loadScan ? (
        <div>
          <H1 className="flex justify-center text-center mb-4">
            2FA Input Form
          </H1>
          <form
            className="form-control"
            onSubmit={handler.handleSubmit}
            name="addkeyform"
          >
            <div className="my-2">
              <Input
                type="text"
                placeholder="Label"
                required
                value={handler.label}
                onChange={(e) => handler.setLabel(e.target.value)}
                alt="label"
              />
            </div>
            <div className="my-2">
              <Input
                type="text"
                placeholder="Issuer"
                value={handler.issuer}
                onChange={(e) => handler.setIssuer(e.target.value)}
                alt="issuer"
              />
            </div>
            <div className="my-2">
              <Input
                type="text"
                placeholder="Secret"
                required
                value={handler.secret}
                onChange={(e) => handler.setSecret(e.target.value)}
                alt="secret"
              />
            </div>
            <div className="flex flex-row mt-1 justify-center">
              <button className="btn mx-1" type="submit">
                Add Key
              </button>
              <button
                className="btn mx-1"
                type="button"
                onClick={() => setLoadScan(true)}
              >
                Scan QR code
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="flex flex-col">
          <H1 className="flex justify-center text-center mb-4">2FA Scanner</H1>
          <div className="flex justify-center">
            <QrScanner
              onResult={(result) => {
                const parsedUrl = OTPAuth.URI.parse(result.getText());
                if (isHaveKey(parsedUrl.secret.base32)) {
                  toast("You already have this key!", { type: "error" });
                } else {
                  addKey(
                    parsedUrl.secret.base32,
                    parsedUrl.label,
                    parsedUrl.issuer,
                    new Date().toISOString()
                  );
                }
                setLoadScan(false);
              }}
              constraints={{
                video: {
                  facingMode: "environment",
                },
                audio: false,
              }}
              onError={(error) => null}
              className="pb-6"
            />
          </div>
          <button
            className="btn items-center self-center"
            onClick={() => setLoadScan(false)}
            type="button"
          >
            Close Scanner
          </button>
        </div>
      )}
    </>
  );
};

export default AddKeyForm;
