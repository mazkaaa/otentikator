import React, { useEffect, useState } from "react";
import * as OTPAuth from "otpauth";
import { toast } from "react-hot-toast";
import { useKey } from "../../context/keyProvider";

const KeyCardHandler = () => {
  const [percentage, setPercentage] = useState(100);
  const { deleteKey } = useKey();

  useEffect(() => {
    const interval = setInterval(() => {
      const nowInSecond = Math.floor(new Date().getTime() / 1000);
      const newToken = 30 - (nowInSecond % 30) - 1;

      setPercentage((newToken * 100) / 30);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const generateToken = (secret: string, label: string, issuer: string) => {
    const token = new OTPAuth.TOTP({
      algorithm: "SHA1",
      digits: 6,
      issuer,
      label,
      secret: OTPAuth.Secret.fromBase32(secret),
      period: 30,
    });
    return token.generate();
  };

  const handleCopyToClipboard = (secret: string) => {
    navigator.clipboard.writeText(secret);
    toast.success("Copied to clipboard!");
  };

  const handleDelete = (created_at: string) => {
    deleteKey(created_at);
    toast.success("Deleted from storage!");
  };
  return {
    generateToken,
    percentage,
    handleCopyToClipboard,
    handleDelete,
  };
};

export default KeyCardHandler;
