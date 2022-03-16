import { useState, useEffect, useContext } from "react";
import * as OTPAuth from "otpauth";
import { KeyContext } from "../../context/KeyProviderHandler";

const KeyHandler = (props) => {
  const periodToken = 30;
  const [timer, setTimer] = useState(periodToken);
  const [expired, setExpired] = useState(true);
  const [token, setToken] = useState("");
  const [percentage, setPercentage] = useState(100);
  const { removeKey } = useContext(KeyContext);

  const copyClipboardHandler = () => {
    navigator.clipboard.writeText(token);
  };
  const deleteHandler = () => {
    removeKey(props.index);
  };

  useEffect(() => {
    if (expired) {
      const newToken = new OTPAuth.TOTP({
        issuer: props.issuer,
        label: props.label,
        algorithm: "SHA1",
        digits: 6,
        period: periodToken,
        secret: props.secret,
      });
      setToken(newToken.generate());
      setExpired(false);
    }
  }, [expired, props.issuer, props.label, props.secret]);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimer((e) => e - 1);
      setPercentage((e) => e - 100 / periodToken);
      if (timer <= 1 && percentage <= 1) {
        setExpired(true);
        setTimer(periodToken);
        setPercentage(100);
      }
    }, 1000);
    return () => clearInterval(timerInterval);
  }, [timer, percentage]);

  return {
    token,
    timer,
    percentage,
    copyClipboardHandler,
    deleteHandler,
  };
};

export default KeyHandler;
