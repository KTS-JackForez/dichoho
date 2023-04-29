import React from "react";

const Modal = () => {
  return (
    <div className="h-screen w-screen absolute top-0 left-0 bg-black/50 z-50 flex items-center">
      <div className="bg-white w-1/2 h-1/2 mx-auto">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Modal;
