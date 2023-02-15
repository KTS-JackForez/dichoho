import React, { useState } from "react";
import img from "../assets/imgs/promo.jpg";
const Promotion = () => {
  const [show, setShow] = useState(true);
  return (
    show && (
      <div className="w-full">
        <div className="max-w-screen-xl mx-auto h-24 relative">
          <img src={img} alt="" className="h-24 w-full" />
          <button
            className="absolute top-0 right-0 rounded-full"
            onClick={() => setShow(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
        </div>
      </div>
    )
  );
};

export default Promotion;
