import React, { useState } from "react";
import img from "../assets/imgs/promo.jpg";
const Promotion = () => {
  const [show, setShow] = useState(true);
  return (
    show && (
      <div className="w-full mx-auto relative">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/dichoho-4e879.appspot.com/o/images%2Fbanners%2Ftopbanner.jpg?alt=media&token=be3b9ef9-a46c-4b58-a7e0-2e08e7db607d"
          alt=""
          className="w-full object-cover h-full"
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
