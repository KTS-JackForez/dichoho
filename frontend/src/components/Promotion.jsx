import React, { useState } from "react";
import img from "../assets/imgs/promo-7c4c4254.webp";
import { Link } from "react-router-dom";
const Promotion = () => {
  const [show, setShow] = useState(true);
  return (
    show && (
      <Link
        to="/news/64bb56f78197f230d267d848"
        className="w-full mx-auto relative md:flex hidden bg-primary"
      >
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
      </Link>
    )
  );
};

export default Promotion;
