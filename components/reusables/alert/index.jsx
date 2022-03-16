import React from "react";

/**
 *
 * @param props.style - (string) success, danger, and info.
 */
const Alert = (props) => {
  const getAlertStyle = (styleProps) => {
    let styleValue = "";
    switch (styleProps) {
      case "success":
        styleValue = "text-green-700";
        break;
      case "danger":
        styleValue = "text-red-700";
        break;
      case "info":
        styleValue = "text-blue-700";
        break;
      default:
        styleValue = "";
        break;
    }
    return styleValue;
  };

  return (
    <p className="mt-4 text-center">
      <span className={getAlertStyle(props.style)}>{props.text}</span>
    </p>
  );
};

export default Alert;
