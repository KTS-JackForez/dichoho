import React from "react";
import promo from "../assets/imgs/promo.jpg";
const Slider = () => {
  const dots = [1, 2, 3, 4];
  return (
    //wrapper
    <div className="w-full bg-red-400 bottom-0 mt-1">
      <div className="max-w-screen-xl mx-auto">
        <div className="relative">
          <img src={promo} alt="" />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8 absolute top-[50%] text-gray-600 hover:text-black cursor-pointer hover:bg-gray-200 rounded-full"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8 absolute top-[50%] right-0 text-gray-600 hover:text-black cursor-pointer hover:bg-gray-200 rounded-full"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
          <div className=" absolute bottom-1 w-full">
            <div className="flex justify-center">
              {dots.map((i) => {
                return (
                  <button className="hover:bg-white bg-white/20 mx-1 px-2 rounded-full">
                    {i}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slider;
