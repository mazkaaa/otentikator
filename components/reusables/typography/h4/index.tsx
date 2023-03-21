import React from "react";
import { TypographyInterface } from "../index.interface";

const H4 = (props: TypographyInterface) => {
  const fontIsBold = props.fontBold ? "font-bold" : "font-extralight";

  return (
    <h4 className={`text-lg ${fontIsBold} ${props.className}`}>
      {props.children}
    </h4>
  );
};

export default H4;
