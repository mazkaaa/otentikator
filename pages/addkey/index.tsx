import React, { FormEvent, useState } from "react";
import { toast } from "react-hot-toast";
import * as OTPAuth from "otpauth";
import { Result } from "react-zxing";
import { useKey } from "../../components/context/keyProvider";
import AddKeyForm from "../../components/reusables/addKeyForm";

const AddKey = () => {
  const [label, setLabel] = useState("");
  const [issuer, setIssuer] = useState("");
  const [secret, setSecret] = useState("");
  const [loadScan, setLoadScan] = useState(false);

  const { addKey, isHaveKey } = useKey();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    if (isHaveKey(secret)) {
      toast.error("You already have this key!");
    } else {
      toast.success("Successfully adding a key!");
      addKey(secret, label, issuer, new Date().toISOString());
    }
    e.preventDefault();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (e.target.name) {
      case "label":
        setLabel(e.target.value);
        break;
      case "issuer":
        setIssuer(e.target.value);
        break;
      case "secret":
        setSecret(e.target.value);
        break;
      default:
        break;
    }
  };

  const handleResultScan = (result: Result) => {
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
      toast.success("Successfully adding a key!");
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-center align-middle">
      <AddKeyForm
        onSubmit={handleSubmit}
        onChange={handleChange}
        issuer={issuer}
        label={label}
        loadScan={loadScan}
        secret={secret}
        onScanError={() => null}
        onScanResult={handleResultScan}
        setLoadScan={setLoadScan}
      />
    </div>
  );
};

export default AddKey;
