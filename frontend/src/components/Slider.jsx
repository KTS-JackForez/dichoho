import React, { useState } from "react";
import promo from "../assets/imgs/promo.jpg";
const Slider = () => {
  const dots = [1, 2, 3];
  const [activeSlide, setActiveSlide] = useState(0);
  const data = [
    "https://green.web5phut.com/wp-content/uploads/2022/07/banner1.jpg",
    "https://green.web5phut.com/wp-content/uploads/2022/07/banner4.jpg",
    "https://green.web5phut.com/wp-content/uploads/2022/07/banner3.jpg",
  ];
  return (
    //wrapper
    <div className="w-full bottom-0 my-2">
      <div className="max-w-screen-xl mx-auto">
        <div className="relative w-full bg-white overflow-hidden">
          <div
            className="flex w-full duration-300"
            // style={{ transform: `translateX(-${activeSlide * 100}%)` }}
            style={{ transform: `translateX(-${activeSlide * 100}%)` }}
          >
            {data.map((i) => {
              return (
                <img
                  src={data[activeSlide]}
                  alt=""
                  className="max-w-full h-auto object-fill inline-block align-middle"
                />
              );
            })}
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8 absolute top-[50%] text-gray-600 hover:text-black cursor-pointer hover:bg-gray-200 rounded-full"
            onClick={() => {
              setActiveSlide(
                activeSlide === 0 ? data.length - 1 : (prev) => prev - 1
              );
            }}
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
            onClick={() => {
              setActiveSlide(
                activeSlide === data.length - 1 ? 0 : (prev) => prev + 1
              );
            }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
          <div className=" absolute bottom-1 w-full">
            <div className="flex justify-center">
              {dots.map((i, index) => {
                return (
                  <button
                    className={`${
                      activeSlide === index
                        ? "bg-green-600 text-white"
                        : "hover:bg-white bg-white/20"
                    }  mx-1 px-2 rounded-full block`}
                    onClick={() => setActiveSlide(i - 1)}
                  >
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
