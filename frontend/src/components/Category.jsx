import React from "react";
import { ktsConfig } from "../../ultis/config";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
const Category = () => {
  return (
    // <div className="max-w-screen-xl mx-auto text-center mt-3  bg-green-200 w-full overflow-hidden flex text-xs md:text-base gap-2 justify-around">

    //   {ktsConfig.categories.map((i, index) => {
    //     return (
    //       <Link
    //         className="p-3 font-semibold hover:bg-green-500 flex gap-2 items-center flex-col w-full"
    //         to=""
    //         key={index}
    //       >
    //         <svg
    //           xmlns="http://www.w3.org/2000/svg"
    //           version="1.1"
    //           viewBox="0 0 512 512"
    //           className="w-8 h-8"
    //         >
    //           <path d={i.path}></path>
    //         </svg>
    //         <p className="hidden md:block">{i.title}</p>
    //       </Link>
    //     );
    //   })}
    // </div>
    <Swiper
      spaceBetween={0}
      slidesPerView={6}
      className="max-w-screen-xl mx-auto text-center mt-3  bg-green-200 w-full overflow-hidden flex text-xs md:text-base gap-2 justify-around"
    >
      {ktsConfig.categories.map((i, index) => {
        return (
          <SwiperSlide className="h-full" key={index}>
            <Link
              className="p-3 font-semibold hover:bg-green-500 flex gap-2 items-center flex-col w-full"
              to=""
              key={index}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                viewBox="0 0 512 512"
                className="w-8 h-8"
              >
                <path d={i.path}></path>
              </svg>
              <p className="hidden md:block">{i.title}</p>
            </Link>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default Category;
