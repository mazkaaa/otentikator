import React from "react";
import { Result } from "react-zxing";
import QrScanner from "../qrScanner";
import H1 from "../typography/h1";
import Input from "../layouts/input";

interface AddKeyFormInterface {
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  label: string;
  issuer: string;
  secret: string;
  loadScan: boolean;
  setLoadScan: React.Dispatch<React.SetStateAction<boolean>>;
  onScanResult: (result: Result) => void;
  onScanError: (error: Error) => void;
}

const AddKeyForm = ({
  issuer,
  label,
  onChange,
  onSubmit,
  secret,
  loadScan,
  setLoadScan,
  onScanResult,
  onScanError,
}: AddKeyFormInterface) => {
  return (
    <>
      {!loadScan ? (
        <div>
          <H1 className="flex justify-center text-center mb-4">
            2FA Input Form
          </H1>
          <form
            className="form-control"
            onSubmit={onSubmit}
            data-testid="keyform"
          >
            <div className="my-2">
              <Input
                type="text"
                placeholder="Label"
                required
                value={label}
                onChange={onChange}
                alt="label"
                dataTestid="labelInput"
                name="label"
              />
            </div>
            <div className="my-2">
              <Input
                type="text"
                placeholder="Issuer"
                value={issuer}
                onChange={onChange}
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
                value={secret}
                onChange={onChange}
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
                onScanResult(result);
                setLoadScan(false);
              }}
              constraints={{
                video: {
                  facingMode: "environment",
                },
                audio: false,
              }}
              onError={(error) => onScanError(error)}
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
