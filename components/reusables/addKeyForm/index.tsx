import React, { useState } from "react";
import * as OTPAuth from "otpauth";
import toast from "react-hot-toast";
import { useKey } from "../../context/keyProvider";
import QrScanner from "../qrScanner";
import H1 from "../typography/h1";
import Input from "../layouts/input";

interface AddKeyFormInterface {
  onSubmit?: React.FormEventHandler<HTMLFormElement> | undefined;
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
  label?: string | undefined;
  issuer?: string | undefined;
  secret?: string | undefined;
}

const AddKeyForm = (props: AddKeyFormInterface) => {
  const [loadScan, setLoadScan] = useState(false);

  const { addKey, isHaveKey } = useKey();

  return (
    <>
      {!loadScan ? (
        <div>
          <H1 className="flex justify-center text-center mb-4">
            2FA Input Form
          </H1>
          <form
            className="form-control"
            onSubmit={props.onSubmit}
            data-testid="keyform"
          >
            <div className="my-2">
              <Input
                type="text"
                placeholder="Label"
                required
                value={props.label}
                onChange={props.onChange}
                alt="label"
                dataTestid="labelInput"
                name="label"
              />
            </div>
            <div className="my-2">
              <Input
                type="text"
                placeholder="Issuer"
                value={props.issuer}
                onChange={props.onChange}
                alt="issuer"
                dataTestid="issuerInput"
                name="issuer"
              />
            </div>
            <div className="my-2">
              <Input
                type="text"
                placeholder="Secret"
                required
                value={props.secret}
                onChange={props.onChange}
                alt="secret"
                dataTestid="secretInput"
                name="secret"
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
                  toast.error("You already have this key!");
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
