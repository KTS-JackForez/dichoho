import React, { useEffect, useState } from "react";
import ItemCard from "./ItemCard";
import hot from "../assets/imgs/hot.png";
import { ToastContainer, toast } from "react-toastify";
import ktsRequest from "../../ultis/ktsrequest";
const HotProducts = (props) => {
  const slideLeft = () => {
    var slider = document.getElementById("wrraper");
    slider.scrollLeft = slider.scrollLeft - 896;
  };

  const slideRight = () => {
    var slider = document.getElementById("wrraper");
    slider.scrollLeft = slider.scrollLeft + 896;
  };
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await ktsRequest.get("/products");
        setData(res.data.slice(0,10));
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
              className="bg-green-600 p-2 rounded text-white hover:bg-white hidden md:block hover:text-green-600 hover:border hover:border-green-600 "
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
              className="bg-green-600 p-2 rounded text-white hover:bg-white hidden md:block hover:text-green-600 hover:border hover:border-green-600"
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
        <div className="w-full overflow-hidden grid grid-cols-5 grid-rows-1">
        {data.map((p, i) => {
            return <ItemCard data={p} />;
          })}
        </div>
        <ToastContainer/>
      </div>
    </div>
  );
};

export default HotProducts;
