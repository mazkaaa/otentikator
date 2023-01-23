import { createContext, useContext, useEffect, useState } from "react";
import useDeepCompareEffect from "use-deep-compare-effect";
import { KeyDataInterface } from "../../constant/interfaces";

const KeyContext = createContext({
  data: {} as KeyDataInterface[],
  loading: {} as boolean,
  addKey: (secret: string, label: string, issuer: string, created_at: string) => { },
  deleteKey: (created_at: string) => {}
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
    }
  }, [data])

  const addKey = (secret: string, label: string, issuer: string, created_at: string) => {
    if (!isHaveKey(secret)) {
      const newKey = {
        secret,
        label,
        issuer,
        created_at,
      };
      setData((old) => [...old, newKey]);
      setLoading(true);
    }
  }

  const deleteKey = (created_at: string) => {

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
        loading
      }}
    >{children}
    </KeyContext.Provider>
  )
}

export const useKey = () => useContext(KeyContext)