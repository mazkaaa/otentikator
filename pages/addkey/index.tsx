import React, { useState } from 'react'
import { QrReader } from 'react-qr-reader';
import * as OTPAuth from "otpauth";
import { useKey } from '../../components/context/keyProvider';

const AddKey = () => {
  const [loadScan, setLoadScan] = useState(false)
  const {addKey} = useKey()
  return (
    <div className="w-full">
      {!loadScan ? (
        <form className="form-control">
          <div className="my-2">
            <input
              type="text"
              placeholder="Label"
              className="input input-bordered w-full"
              required
            />
          </div>
          <div className="my-2">
            <input
              type="text"
              placeholder="Issuer"
              className="input input-bordered w-full"
            />
          </div>
          <div className="my-2">
            <input
              type="text"
              placeholder="Secret"
              className="input input-bordered w-full"
              required
            />
          </div>
          <div className="flex flex-row mt-1 justify-center">
            <button className="btn mx-1">Add Key</button>
            <button className="btn mx-1" type='button' onClick={() => setLoadScan(true)}>Scan QR code</button>
          </div>
        </form>
      ) : (
        <div className='flex flex-col'>
          <QrReader
            onResult={(result, error) => {
              if (result) {
                const parsedUrl = OTPAuth.URI.parse(result?.getText());
                addKey(
                  parsedUrl.secret.base32,
                  parsedUrl.label,
                  parsedUrl.issuer,
                  Date.now().toString()
                );
                setLoadScan(false)
              }
            }}
            className="w-full"
            constraints={{
              facingMode: "environment",
            }}
          />
          <button
            className="btn items-center self-center"
            onClick={() => setLoadScan(false)}
            type="button"
          >
            Close Scanner
          </button>
        </div>
      )}
    </div>
  );
}

export default AddKey