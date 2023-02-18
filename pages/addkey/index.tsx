import React, { useEffect, useState } from "react";
import * as OTPAuth from "otpauth";
import { useKey } from "../../components/context/keyProvider";
import { useZxing } from "react-zxing";
import QrScanner from "../../components/reusables/qrScanner";
import { toast } from "react-toastify";
import AddKeyForm from "../../components/reusables/addKeyForm";

const AddKey = () => {
  const [loadScan, setLoadScan] = useState(false);
  const { addKey, isHaveKey } = useKey();

  return (
    <div className="w-full h-full flex flex-col justify-center align-middle">
      <AddKeyForm />
    </div>
  );
};

export default AddKey;
