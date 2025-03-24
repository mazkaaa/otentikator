"use client";
import { IOTPFormat } from "@/types";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import * as OTPAuth from "otpauth";
import { Check, Copy } from "lucide-react";
import { Progress } from "../ui";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface PROPS {
  data: IOTPFormat;
  className?: string;
}
export const KeyCard = (props: PROPS) => {
  const { data, className } = props;
  const [percentage, setPercentage] = useState(100);
  const [successCopy, setSuccessCopy] = useState(false);

  const getToken = useMemo(() => {
    const token = new OTPAuth.TOTP({
      algorithm: data.algorithm,
      digits: data.digits,
      issuer: data.issuer,
      label: data.label,
      secret: data.secret,
      period: data.period,
    });
    return token;
  }, [
    data.algorithm,
    data.digits,
    data.issuer,
    data.label,
    data.period,
    data.secret,
  ]);

  const handleCopyToClickboard = useCallback(() => {
    navigator.clipboard.writeText(getToken.generate());
    toast.success("Copied to clipboard");
    setSuccessCopy(true);
    setTimeout(() => {
      setSuccessCopy(false);
    }, 1500);
  }, [getToken]);

  const defineStatusIcon = useMemo(() => {
    if (successCopy) {
      return <Check className="w-4" />;
    }
    return <Copy className="w-4" />;
  }, [successCopy]);

  useEffect(() => {
    const interval = setInterval(() => {
      const nowInSecond = Math.floor(new Date().getTime() / 1000);
      const newToken = 30 - (nowInSecond % 30) - 1;

      setPercentage((newToken * 100) / 30);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      onClick={handleCopyToClickboard}
      className={cn(
        "border w-full flex flex-col rounded-md transition-all relative cursor-pointer",
        {
          "border-foreground": percentage >= 20,
          "border-destructive-foreground": percentage <= 20,
        },
        className,
      )}
    >
      <section className="flex flex-row justify-between items-center py-4 px-6">
        <aside className="flex flex-col">
          <span className="font-semibold text-xl leading-tight">
            {data.issuer}
          </span>
          <span className="leading-tight">{data.label}</span>
        </aside>
        <aside>
          <div className="flex items-center space-x-2 transition-all">
            <span className="text-4xl font-bold text-zinc-800 tabular-nums">
              {getToken.generate()}
            </span>
            {defineStatusIcon}
          </div>
        </aside>
      </section>
      <div
        className={cn(
          "h-full bg-muted-foreground absolute opacity-10 transition-all duration-300",
        )}
        style={{
          width: `${percentage}%`,
        }}
      ></div>
    </div>
  );
};
