import React from "react";

const Container = (props) => {
  return (
    <div className="container mx-auto max-w-xs h-screen">
      <div className="mx-auto h-5/6 w-full flex justify-center">
        {props.children}
      </div>
    </div>
  );
};

export default Container;
