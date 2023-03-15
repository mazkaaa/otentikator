import React from "react";
import { TypographyInterface } from "../index.interface";

const H3 = (props: TypographyInterface) => {
  const fontIsBold = props.fontBold ? "font-bold" : "font-extralight";
  return (
    <h3 className={`text-lg ${fontIsBold} ${props.className}`}>
      {props.children}
    </h3>
  );
};

export default H3;
