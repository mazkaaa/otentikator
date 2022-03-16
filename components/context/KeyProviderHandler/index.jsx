import { createContext, useEffect, useState } from "react";

export const KeyContext = createContext({
  keys: {},
  addKey: () => {},
  getKeys: () => {},
  debugKeys: () => {},
  removeKey: () => {},
});

export function KeyProvider({ children }) {
  const [keys, setKeys] = useState({});
  useEffect(() => {
    if (localStorage.getItem("keys")) {
      setKeys(JSON.parse(localStorage.getItem("keys")));
    }
  }, []);

  useEffect(() => {
    if (keys) {
      localStorage.setItem("keys", JSON.stringify(keys));
    }
  }, [keys]);

  const addKey = (data) => {
    let keyList = JSON.parse(localStorage.getItem("keys"));
    if (!(keyList instanceof Array)) {
      keyList = [];
    }
    keyList.push(data);
    setKeys(keyList);
  };

  const removeKey = (data) => {
    const keyList = JSON.parse(localStorage.getItem("keys"));
    for (let i = 0; i < keyList.length; i += 1) {
      if (keyList[i].created === data) {
        keyList.splice(i, 1);
        setKeys(keyList);
      }
    }
  };

  const getKeys = () => {
    const data = Array.from(keys);
    return data;
  };

  return (
    <KeyContext.Provider
      value={{
        getKeys,
        addKey,
        removeKey,
      }}
    >
      {children}
    </KeyContext.Provider>
  );
}
