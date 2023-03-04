import React, { useState } from "react";

const Slider = () => {
  const dots = [1, 2, 3];
  const [activeImg, setActiveImg] = useState(0);
  const imgs = [
    "https://firebasestorage.googleapis.com/v0/b/dichoho-4e879.appspot.com/o/images%2Fbanners%2Fbanner1.jpg?alt=media&token=ab56333f-e2b4-4bcd-80f5-1defaf4adc9f",
    "https://firebasestorage.googleapis.com/v0/b/dichoho-4e879.appspot.com/o/images%2Fbanners%2Fbanner2.jpg?alt=media&token=e16e39fd-1209-4e7b-896a-903d55ce3899",
    "https://firebasestorage.googleapis.com/v0/b/dichoho-4e879.appspot.com/o/images%2Fbanners%2Fbanner3.jpg?alt=media&token=4a3aceec-f665-4862-bdba-62b8803cdec6",
  ];
  return (
    <div className="w-full">
      <div className="relative overflow-hidden w-full">
        <button
          onClick={() =>
            setActiveImg((prev) => (prev === 0 ? imgs.length - 1 : prev - 1))
          }
          className="p-3 z-10  bg-green-500/30 rounded-full hover:bg-green-300 absolute top-[50%]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 "
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </button>
        <button
          onClick={() =>
            setActiveImg((prev) => (prev === imgs.length - 1 ? 0 : prev + 1))
          }
          className="p-3 z-10 bg-green-500/30 rounded-full hover:bg-green-500 absolute top-[50%] right-0"
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
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
        <div
          className="md:h-[580px] duration-500 flex"
          style={{ transform: `translateX(-${activeImg * 100}%)` }}
        >
          {imgs.map((i, index) => {
            return (
              <img
                src={i}
                alt=""
                className="object-cover object-center w-full h-full"
                key={index}
              />
            );
          })}
        </div>
        <div className=" absolute bottom-1 w-full">
          <div className="flex justify-center gap-3 items-center">
            {dots.map((i, index) => {
              return (
                <button
                  className={`${
                    activeImg === index
                      ? "bg-green-600 text-white w-4 h-4"
                      : "hover:bg-white bg-white/20 w-3 h-3"
                  } rounded-full border border-double border-green-500`}
                  onClick={() => setActiveImg(i - 1)}
                  key={index}
                ></button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slider;
