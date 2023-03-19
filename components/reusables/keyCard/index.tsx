import React from "react";

interface KeyCardInterface {
  percentage: number;
  generatedToken: string;
  issuer: string;
  label: string;
  onClickCopy: () => void;
  onClickDelete: () => void;
}

const KeyCard = ({generatedToken, issuer, label, onClickCopy, onClickDelete, percentage}: KeyCardInterface) => {

  const colorBar = {
    red: "rgb(185 28 28 / var(--tw-bg-opacity))",
    green: "rgb(34 197 94 / var(--tw-bg-opacity))",
  };
  const progressBar = {
    height: "0.25rem",
    width: `${percentage.toString()}%`,
    "--tw-bg-opacity": 1,
    backgroundColor: percentage <= 30 ? colorBar.red : colorBar.green,
    transition: "all .8s",
  };

  return (
    <div className="bg-base-300 w-full my-4">
      <div className="flex flex-col justify-between p-4">
        <div className="flex flex-row">
          <div className="flex flex-col w-full">
            <h2 className="font-bold text-3xl tracking-wide">
              {generatedToken}
            </h2>
            <div className="flex flex-row">
              <h3 className="">
                {issuer} <span>({label})</span>
              </h3>
            </div>
          </div>
          {/** action button */}
          <div className="flex flex-row justify-end items-center">
            <button
              className="btn btn-square rounded-none btn-outline mx-1"
              onClick={() =>
                onClickCopy()
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="w-5 h-5"
              >
                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
              </svg>
            </button>
            <button
              className="btn btn-square rounded-none btn-outline mx-1"
              onClick={() => onClickDelete()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="w-5 h-5"
              >
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                <line x1="10" y1="11" x2="10" y2="17"></line>
                <line x1="14" y1="11" x2="14" y2="17"></line>
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/** progress bar */}
      <div style={progressBar} />
    </div>
  );
};

export default KeyCard;
