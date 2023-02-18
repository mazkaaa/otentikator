import React, { useState } from "react";
import { useKey } from "../../components/context/keyProvider";
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
