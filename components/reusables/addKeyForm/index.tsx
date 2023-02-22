import React, { useState } from 'react'
import { useKey } from '../../context/keyProvider';
import QrScanner from '../qrScanner';
import * as OTPAuth from "otpauth"
import { toast } from 'react-toastify';
import AddKeyFormHandler from './index.handler';

const AddKeyForm = () => {
  const [loadScan, setLoadScan] = useState(false)

  const { addKey, isHaveKey } = useKey()
  const handler = AddKeyFormHandler()

  return (
    <>
      {!loadScan ? (
        <form className="form-control" onSubmit={handler.handleSubmit} name="addkeyform">
          <div className="my-2">
            <input
              type="text"
              placeholder="Label"
              className="input input-bordered w-full"
              required
              value={handler.label}
              onChange={(e) => handler.setLabel(e.target.value)}
              alt="label"
            />
          </div>
          <div className="my-2">
            <input
              type="text"
              placeholder="Issuer"
              className="input input-bordered w-full"
              value={handler.issuer}
              onChange={(e) => handler.setIssuer(e.target.value)}
              alt="issuer"
            />
          </div>
          <div className="my-2">
            <input
              type="text"
              placeholder="Secret"
              className="input input-bordered w-full"
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
      ) : (
        <div className="flex flex-col">
          <div className='flex justify-center'>
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
}

export default AddKeyForm