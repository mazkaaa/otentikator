import React from "react";
import { TypographyInterface } from "../index.interface";

const H1 = (props: TypographyInterface) => {
  const fontIsBold = props.fontBold ? "font-bold" : "font-extralight";

  return (
    <h1 className={`text-3xl ${fontIsBold} ${props.className}`}>
      {props.children}
    </h1>
  );
};

export default H1;
