import React from "react";
import { TypographyInterface } from "../index.interface";

const H5 = (props: TypographyInterface) => {
  const fontIsBold = props.fontBold ? "font-bold" : "font-extralight";

  return (
    <h5 className={`text-lg ${fontIsBold} ${props.className}`}>
      {props.children}
    </h5>
  );
};

export default H5;
