import React, { useState } from "react";
import * as OTPAuth from "otpauth";
import { QrReader } from "react-qr-reader";
import { useKey } from "../../components/context/keyProvider";
import { useRouter } from "next/router";

const Scan = () => {
  const [done, setDone] = useState(false)
  const { addKey } = useKey()

  return (
    <div>
      {done ? (
        <div className="flex flex-col">
          <button className="btn btn-success my-1">Finish</button>
          <button className="btn btn-primary my-1">Scan again</button>
        </div>
      ) : (
        <QrReader
          onResult={(result, error) => {
            if (!error && result) {
              const parsedUrl = OTPAuth.URI.parse(result?.getText());
              addKey(
                parsedUrl.secret.base32,
                parsedUrl.label,
                parsedUrl.issuer,
                Date.now().toString()
              );
              setDone(true)
            }
          }}
          constraints={{
            facingMode: "environment",
          }}
          className="w-full"
        />
      )}
    </div>
  );
};

export default Scan;
