import { QrReader } from "react-qr-reader";
import { useKey } from "../components/context/keyProvider";
import { useEffect } from "react";
import KeyCard from "../components/reusables/keyCard";

export default function Home() {
  const { addKey, data } = useKey()
  
  return (
    <div className="w-full">
      {data.map((item, index) => (
        <KeyCard
          issuer={item.issuer}
          label={item.label}
          created_at={item.created_at}
          secret={item.secret}
          key={item.created_at}
        />
      ))}
    </div>
  );
}
