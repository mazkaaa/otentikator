import { useContext, useState, useEffect } from "react";
import { KeyContext } from "../../components/context/KeyProviderHandler";

export default function AddkeyHandler() {
  const [labelState, setLabelState] = useState("");
  const [issuerState, setIssuerState] = useState("");
  const [secretState, setSecretState] = useState("");
  const { addKey } = useContext(KeyContext);

  const [showSuccess, setShowSuccess] = useState(false);
  const [showFail, setShowFail] = useState(false);

  const delay = 3;

  const resetForm = () => {
    setLabelState("");
    setIssuerState("");
    setSecretState("");
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

  return [
    handleSubmit,
    setLabelState,
    setIssuerState,
    setSecretState,
    showSuccess,
    labelState,
    issuerState,
    secretState,
    showFail,
  ];
}
