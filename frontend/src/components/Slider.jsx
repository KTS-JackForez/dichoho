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
            className="flex w-full duration-300 h-96 bg-red-500"
            // style={{ transform: `translateX(-${activeSlide * 100}%)` }}
            style={{ transform: `translateX(-${activeSlide * 100}%)` }}
          >
            {data.map((i) => {
              return (
                <img
                  src={data[activeSlide]}
                  alt=""
                  className="max-w-fit object-cover"
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
            className="w-8 h-8 p-1 bg-green-500/50 absolute top-[50%] text-white hover:text-black cursor-pointer hover:bg-green-700/50 rounded-full"
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
            className="w-8 h-8 p-1 bg-green-500/50 absolute top-[50%] right-0 text-white hover:text-black cursor-pointer hover:bg-green-700/50 rounded-full"
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
            <div className="flex justify-center gap-3 items-center">
              {dots.map((i, index) => {
                return (
                  <button
                    className={`${
                      activeSlide === index
                        ? "bg-green-600 text-white w-4 h-4"
                        : "hover:bg-white bg-white/20 w-3 h-3"
                    } rounded-full border border-double border-green-500`}
                    onClick={() => setActiveSlide(i - 1)}
                  ></button>
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
