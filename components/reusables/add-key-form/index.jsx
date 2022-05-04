import React from "react";
import { QrReader } from "react-qr-reader";
import Alert from "../alert";
import AddKeyFormHandler from "./index.handler";

const AddKeyForm = () => {
  const handler = AddKeyFormHandler();
  return (
    <div className="flex justify-center w-full items-center flex-col">
      {handler.loadReader ? (
        <>
          <QrReader
            onResult={(result, error) => {
              handler.handleReader(result, error);
            }}
            className="w-full"
            constraints={{
              facingMode: "environment",
            }}
          />
          <button
            className="bg-slate-600 hover:bg-slate-700 text-white font-bold py-4 px-4 w-1/2"
            onClick={() => handler.setLoadReader(false)}
            type="button"
          >
            Close Scanner
          </button>
        </>
      ) : (
        <form className="w-full">
          <div className="flex flex-col">
            <input
              className="border-2 border-slate-500 p-2 my-2"
              placeholder="Label"
              name="label"
              type="text"
              id="label"
              onChange={(e) => handler.setLabelState(e.target.value)}
              value={handler.labelState}
            />
            <input
              className="border-2 border-slate-500 p-2 my-2"
              placeholder="Issuer"
              name="issuer"
              type="text"
              id="issuer"
              onChange={(e) => handler.setIssuerState(e.target.value)}
              value={handler.issuerState}
            />
            <input
              className="border-2 border-slate-500 p-2 my-2"
              placeholder="Secret"
              name="secret"
              type="text"
              id="secret"
              onChange={(e) => handler.setSecretState(e.target.value)}
              value={handler.secretState}
            />
            <div className="flex flex-row">
              <button
                className="bg-slate-600 hover:bg-slate-700 text-white font-bold py-4 px-4 my-4 w-1/2 mr-3"
                onClick={() => handler.setLoadReader(true)}
                type="button"
              >
                Scan QR
              </button>
              <button
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-4 my-4 w-1/2 ml-3"
                onClick={handler.handleSubmit}
                type="button"
              >
                Add Key
              </button>
            </div>
          </div>
        </form>
      )}
      {handler.showSuccess && (
        <Alert style="success" text="Successfully adding key!" />
      )}
      {handler.showFail && <Alert style="danger" text="Failed adding key!" />}
    </div>
  );
};

export default AddKeyForm;
