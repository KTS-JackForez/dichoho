import React, { useState } from "react";
import img from "../assets/imgs/promo-7c4c4254.webp";
const Promotion = () => {
  const [show, setShow] = useState(true);
  return (
    show && (
      <div className="w-full mx-auto relative md:flex hidden bg-primary">
        <img src={img} alt="" className="mx-auto object-cover object-center" />
        <button
          className="absolute top-2 right-2 rounded-full bg-white/50 p-1 text-gray-800 hover:bg-white"
          onClick={() => setShow(false)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    )
  );
};

export default Promotion;
