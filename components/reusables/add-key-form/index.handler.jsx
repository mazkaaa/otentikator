import { useContext, useState, useEffect } from "react";
import * as OTPAuth from "otpauth";
import { KeyContext } from "../../context/KeyProviderHandler";

const AddKeyFormHandler = () => {
  const [labelState, setLabelState] = useState("");
  const [issuerState, setIssuerState] = useState("");
  const [secretState, setSecretState] = useState("");
  const { addKey } = useContext(KeyContext);

  const [showSuccess, setShowSuccess] = useState(false);
  const [showFail, setShowFail] = useState(false);

  const [loadReader, setLoadReader] = useState(false);

  const delay = 3;

  const resetForm = () => {
    setLabelState("");
    setIssuerState("");
    setSecretState("");
  };
  const handleReader = (result, error) => {
    // Dimensions could be not found.
    if (result) {
      const parsedUrl = OTPAuth.URI.parse(result.text);
      const newKey = {
        label: parsedUrl.label,
        issuer: parsedUrl.issuer,
        secret: parsedUrl.secret.base32,
        created: new Date().toISOString(),
      };
      addKey(newKey);
      setLoadReader(false);
      setShowSuccess(true);
      setShowFail(false);
    }
    if (error) {
      if (!error === "Dimensions could be not found.") {
        setLoadReader(false);
        setShowFail(true);
        setShowSuccess(false);
      }
    }
  };

  const handleSubmit = () => {
    const newKey = {
      label: labelState,
      issuer: issuerState,
      secret: secretState,
      created: new Date().toISOString(),
    };
    if (newKey.issuer && newKey.secret) {
      addKey(newKey);
      setShowSuccess(true);
      setShowFail(false);
    } else if (!newKey.issuer || !newKey.secret) {
      setShowFail(true);
      setShowSuccess(false);
    }
  };

  useEffect(() => {
    resetForm();
    setTimeout(() => {
      setShowSuccess(false);
    }, delay * 1000);
  }, [showSuccess]);

  useEffect(() => {
    if (!showFail) {
      setTimeout(() => {
        setShowFail(false);
      }, delay * 1000);
    }
  }, [showFail]);

  return {
    handleSubmit,
    handleReader,
    setLabelState,
    setIssuerState,
    setSecretState,
    showSuccess,
    labelState,
    issuerState,
    secretState,
    showFail,
    loadReader,
    setLoadReader,
  };
};

export default AddKeyFormHandler;
