import PropTypes from "prop-types";
import ButtonAction from "../button-action";
import KeyHandler from "./index.handler";
import Emoji from "../emoji";

const KeyCard = (props) => {
  const handler = KeyHandler(props);
  const colorBar = {
    red: "rgb(185 28 28 / var(--tw-bg-opacity))",
    green: "rgb(21 128 61 / var(--tw-bg-opacity))",
  };
  const progressBar = {
    height: "0.25rem",
    width: `${handler.percentage.toString()}%`,
    "--tw-bg-opacity": 1,
    backgroundColor: handler.percentage <= 30 ? colorBar.red : colorBar.green,
    transition: "all .8s",
  };
  return (
    <div className="bg-slate-300 w-full my-1">
      <div className="py-4 px-4">
        <div className="flex flex-col">
          <div className="flex flex-row items-center">
            <h2 className="text-2xl font-medium mr-1">{props.issuer}</h2>
            <h3 className="text-base font-light">
              {props.label === "" ? "" : `(${props.label})`}
            </h3>
          </div>
          <div className="flex flex-row justify-between">
            <h1 className="text-4xl font-semibold text-gray-800">
              {handler.token}
            </h1>
            <div className="flex">
              <ButtonAction
                className="text-3xl mx-2"
                border={false}
                onClick={handler.copyClipboardHandler}
              >
                <Emoji symbol="📋" />
              </ButtonAction>
              <ButtonAction
                className="text-2xl mx-2"
                border={false}
                onClick={handler.deleteHandler}
              >
                <Emoji symbol="❌" />
              </ButtonAction>
            </div>
          </div>
        </div>
      </div>
      <div style={progressBar}></div>
    </div>
  );
};
KeyCard.propTypes = {
  issuer: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  secret: PropTypes.string.isRequired,
  index: PropTypes.string.isRequired,
};
export default KeyCard;
