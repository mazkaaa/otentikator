import React from "react";

import { useMediaDevices } from "react-media-devices";
import { Result, useZxing } from "react-zxing";

interface QrScannerInterface {
  onResult: (result: Result) => void;
  onError: (error: Error) => void;
  className?: string;
  deviceId?: string;
  constraints?: MediaStreamConstraints | undefined;
  hints?: any;
  paused?: boolean;
  timeBetweenDecodingAttempts?: any;
}

const QrScanner = (props: QrScannerInterface) => {
  const { devices } = useMediaDevices({
    constraints: {
      video: true,
      audio: false,
    },
  });
  const { ref } = useZxing({
    onResult: (result) => {
      props.onResult(result);
    },
    onError: (error) => {
      props.onError(error);
    },
    deviceId: props.deviceId,
    constraints: props.constraints,
    hints: props.hints,
    paused: props.paused,
    timeBetweenDecodingAttempts: props.timeBetweenDecodingAttempts,
  });

  return <video ref={ref} className={props.className} />;
};

export default QrScanner;
