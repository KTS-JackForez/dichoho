import React, { useEffect, useState } from "react";
import ItemCard from "./ItemCard";

import { ToastContainer, toast } from "react-toastify";
import ktsRequest from "../../ultis/ktsrequest";
import { Link } from "react-router-dom";
import { vnd } from "../../../admin/ultis/ktsFunc";
const HotProducts = (props) => {
  const slideLeft = () => {
    var slider = document.getElementById("wrraper");
    slider.scrollLeft = slider.scrollLeft - slider.offsetWidth;
  };

  const slideRight = () => {
    var slider = document.getElementById("wrraper");
    slider.scrollLeft = slider.scrollLeft + slider.offsetWidth;
  };
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await ktsRequest.get("/products");
        setData(res.data.slice(0, 10));
      } catch (err) {
        err.response
          ? toast.error(err.response.data.message)
          : toast.error("Network Error!");
      }
    };
    fetchData();
  }, []);
  return (
    <div className="w-ful bottom-0 mt-1 py-2">
      <div className="max-w-screen-xl mx-auto border-4 border-green-500 rounded-md overflow-hidden">
        <div className="flex justify-between bg-white p-3">
          <div className="flex justify-start items-center gap-3">
            <img
              src="https://green.web5phut.com/wp-content/themes/flatsome-child/images/icon_hotsale.png"
              alt=""
              className="mb-3"
            />
            <h3 className="uppercase font-bold text-green-600">
              {props.title ? props.title : " sản phẩm "}
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              className="bg-green-600 p-2 rounded text-white hover:bg-white hover:text-green-600 hover:border hover:border-green-600 "
              onClick={slideLeft}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4 font-bold hover:duration-300 hover:scale-150"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </button>
            <button
              className="bg-green-600 p-2 rounded text-white hover:bg-white hover:text-green-600 hover:border hover:border-green-600"
              onClick={slideRight}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4 font-bold hover:duration-300 hover:scale-150"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
          </div>
        </div>
        <div
          className="flex gap-2 p-2 overflow-x-hidden scroll whitespace-nowrap scroll-smooth scrollbar-hide"
          id="wrraper"
        >
          {data.map((p, i) => {
            const discount = Math.round(
              ((p.stockPrice - p.currentPrice) * 100) / p.stockPrice
            );
            return (
              <div class="bg-white rounded-lg relative flex flex-col justify-betwee shadow-lg w-full mx-atuto">
                <div className="z-10 w-12 h-12 border-double border-4 border-white bg-red-600 absolute top-3 right-3 rounded-tl-3xl rounded-tr-3xl rounded-bl rounded-br-3xl flex items-center text-center pl-1.5 text-white">
                  <p className="font-semibold">{`${discount}%`}</p>
                </div>
                <div className="overflow-hidden rounded-t-lg md:w-56 md:h-56 w-28 h-28">
                  <Link to={`/products/${p._id}`}>
                    <img
                      className="transition duration-500 hover:scale-125 object-cover object-center w-full h-full"
                      src={
                        p.imgs[0] ||
                        "https://via.placeholder.com/300.png/09f/fff"
                      }
                      alt=""
                    />
                  </Link>
                </div>
                <div className="mt-2 px-3 overflow-hidden w-full">
                  <p class="mb-1 tracking-tight font-semibold truncate">
                    {p.productName}
                  </p>
                  <p className="mb-1  text-red-600 line-through">
                    {vnd(p.stockPrice)}
                  </p>
                  {discount > 0 && (
                    <p className="mb-1 text-primary font-semibold truncate">
                      {vnd(p.currentPrice)}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        {/* <div
          className="flex gap-2 p-2 overflow-x-hidden scroll whitespace-nowrap scroll-smooth scrollbar-hide"
          id="wrraper"
        >
          {data.map((p, i) => {
            return <ItemCard data={p} />;
          })}
        </div> */}
        <ToastContainer />
      </div>
    </div>
  );
};

export default HotProducts;
