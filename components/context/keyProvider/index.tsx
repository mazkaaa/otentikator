import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import useDeepCompareEffect from "use-deep-compare-effect";
import { KeyDataInterface } from "../../constant/interfaces";

interface KeyContextInterface {
  data: KeyDataInterface[];
  loading: boolean;
  addKey: (
    secret: string,
    label: string,
    issuer: string,
    created_at: string
  ) => void;
  deleteKey: (created_at: string) => void;
  isHaveKey: (secret: string) => boolean;
}
const KeyContext = createContext<KeyContextInterface>({
  data: {} as KeyDataInterface[],
  loading: {} as boolean,
  addKey: (secret: string, label: string, issuer: string, created_at: string) => { },
  deleteKey: (created_at: string) => { },
  isHaveKey: (secret: string) => false
})

export const KeyProvider = ({ children }: any) => {
  const [data, setData] = useState<KeyDataInterface[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (localStorage.getItem("keys") !== null) {
      setData(JSON.parse(localStorage.getItem("keys")!));
    }
  }, [])

  useDeepCompareEffect(() => {
    if (loading) {
      localStorage.setItem("keys", JSON.stringify(data))
      setLoading(false)
      console.log("usedeepcompareeffect")
    }
  }, [data])

  const addKey = (secret: string, label: string, issuer: string, created_at: string) => {
    const newKey = {
      secret,
      label,
      issuer,
      created_at,
    };
    setData((old) => [...old, newKey]);
    setLoading(true);
  }

  const deleteKey = (created_at: string) => {
    if (data.some((item) => item.created_at === created_at)) {
      setData((old) => old.filter((item) => item.created_at !== created_at))
      setLoading(true)
    }
  }

  const isHaveKey = (secret: string) => {
    return data.some((item) => item.secret === secret);
  }

  return (
    <KeyContext.Provider
      value={{
        addKey,
        data,
        deleteKey,
        loading,
        isHaveKey
      }}
    >{children}
    </KeyContext.Provider>
  )
}

export const useKey = () => useContext(KeyContext)