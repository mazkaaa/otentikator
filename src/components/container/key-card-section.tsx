import { IOTPFormat } from "@/types";
import React, { useCallback, useMemo } from "react";
import { KeyCard } from "../reusables";
import { useSettings } from "../context";
import { cn } from "@/lib/utils";
import { Checkbox } from "../ui/checkbox";
import { IKeyCard } from "@/types/key-card";
import { CheckedState } from "@radix-ui/react-checkbox";

interface PROPS {
  data: IKeyCard[];
}
export const KeyCardSection = (props: PROPS) => {
  const { data } = props;
  const { isSelecting, selectedKeys, selectKey, unselectKey } = useSettings();

  const handleCheck = useCallback(
    (checked: CheckedState, otp: IKeyCard) => {
      if (checked) {
        selectKey(otp);
      } else {
        unselectKey(otp);
      }
    },
    [selectKey, unselectKey],
  );

  const defineGridContent = useMemo(() => {
    return (
      <>
        {data.map((otp, index) => (
          <div
            key={index}
            className="flex flex-row items-center w-full space-x-6"
          >
            <KeyCard data={otp} />
            {isSelecting && (
              <Checkbox
                checked={selectedKeys.some((item) => item.id === otp.id)}
                onCheckedChange={(checked) => {
                  handleCheck(checked, otp);
                }}
                size="extraLarge"
              />
            )}
          </div>
        ))}
      </>
    );
  }, [data, handleCheck, isSelecting, selectedKeys]);

  return (
    <section className="space-y-4 transition-all">{defineGridContent}</section>
  );
};
