"use client";
import { IKeyCard } from "@/types/key-card";
import { createContext, useCallback, useContext, useState } from "react";

interface IContext {
  isSelecting: boolean;
  toggleSelecting: (value: boolean) => void;
  selectedKeys: IKeyCard[];
  selectKey: (key: IKeyCard) => void;
  unselectKey: (key: IKeyCard) => void;
}

const context = createContext<IContext>({
  isSelecting: false,
  toggleSelecting: () => {},
  selectedKeys: [],
  selectKey: () => {},
  unselectKey: () => {},
} as IContext);

export const SettingProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState<IKeyCard[]>([]);

  const toggleSelecting = useCallback((value: boolean) => {
    setIsSelecting(value);
    if (!value) {
      setSelectedKeys([]);
    }
  }, []);

  const selectKey = useCallback((key: IKeyCard) => {
    setSelectedKeys((prev) => [...prev, key]);
  }, []);

  const unselectKey = useCallback((key: IKeyCard) => {
    setSelectedKeys((prev) => prev.filter((item) => item.id !== key.id));
  }, []);

  return (
    <context.Provider
      value={{
        isSelecting,
        toggleSelecting,
        selectedKeys,
        selectKey,
        unselectKey,
      }}
    >
      {children}
    </context.Provider>
  );
};

export const useSettings = () => useContext(context);
