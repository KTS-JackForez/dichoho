import React from "react";
import ItemCard from "./ItemCard";

const Lastest = () => {
  return (
    <div className="w-full bottom-0 mt-1 py-2">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex justify-between bg-green-200">
          <div className="flex justify-start items-center gap-3">
            <img
              src="https://green.web5phut.com/wp-content/themes/flatsome-child/images/icon_ns.png"
              alt=""
            />
            <h3 className="uppercase font-semibold ">mới nhất</h3>
          </div>
          <div className="flex items-center pr-4">
            Xem tất cả
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
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          </div>
        </div>
        <div className="gap-2 mx-auto grid grid-cols-2 md:grid-cols-5 justify-center grid-rows-2 p-3">
          <ItemCard />
          <ItemCard />
          <ItemCard />
          <ItemCard />
          <ItemCard />
          <ItemCard />
          <ItemCard />
          <ItemCard />
          <ItemCard />
          <ItemCard />
        </div>
      </div>
    </div>
  );
};

export default Lastest;
