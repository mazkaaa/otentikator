import React from "react";
import { TypographyInterface } from "../index.interface";

const H2 = (props: TypographyInterface) => {
  const fontIsBold = props.fontBold ? "font-bold" : "font-extralight";
  return (
    <h2 className={`text-lg ${fontIsBold} ${props.className}`}>
      {props.children}
    </h2>
  );
};

export default H2;
