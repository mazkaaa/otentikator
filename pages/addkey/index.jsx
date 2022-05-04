/* eslint-disable jsx-a11y/label-has-associated-control */
import { React } from "react";
import { QrReader } from "react-qr-reader";
import Layout from "../../components/layouts/baseLayout";
import Alert from "../../components/reusables/alert";
import Container from "../../components/reusables/styles/container";
import AddKeyHandler from "./index.handler";

export default function Addkey() {
  const handler = AddKeyHandler();
  return (
    <Layout title="Add Key">
      <Container>
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
          {handler.showFail && (
            <Alert style="danger" text="Failed adding key!" />
          )}
        </div>
      </Container>
    </Layout>
  );
}
