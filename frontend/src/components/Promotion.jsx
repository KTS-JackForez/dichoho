import React, { useState } from "react";
import img from "../assets/imgs/promo.jpg";
const Promotion = () => {
  const [show, setShow] = useState(true);
  return (
    show && (
      <div className="w-full mx-auto h-24 relative">
        <img
          src="	https://green.web5phut.com/wp-content/uploads/2022/07/top_banner.jpg"
          alt=""
          className="h-24 w-full"
        />
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
