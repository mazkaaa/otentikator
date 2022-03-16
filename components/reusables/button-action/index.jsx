import React from "react";
import PropTypes from "prop-types";

const ButtonAction = (props) => {
  return (
    <button
      className={`
        ${props.border ? "border-2" : "border-0"}
        ${props.className}
      `}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

ButtonAction.propTypes = {
  border: PropTypes.bool,
  className: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ButtonAction;
