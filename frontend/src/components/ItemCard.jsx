import React from "react";
import img from "../assets/imgs/1-300x300.jpg";
import { Link } from "react-router-dom";
const ItemCard = () => {
  const myStyle = {};
  return (
    <div class="bg-white rounded-lg relative flex flex-col justify-betwee hover:shadow-lg w-52">
      <div className="z-10 w-12 h-12 border-double border-4 border-white bg-red-600 absolute top-3 right-3 rounded-tl-3xl rounded-tr-3xl rounded-bl rounded-br-3xl flex items-center text-center pl-0.5 text-white">
        <p className="font-semibold">-19%</p>
      </div>
      <div className="overflow-hidden p-3 rounded-lg">
        <Link to="/products">
          <img
            class="rounded-t-lg  object-cover transition duration-500 hover:scale-125 rounded-md"
            src={img}
            alt=""
          />
        </Link>
      </div>
      <div class="pt-5 px-3">
        <a href="#">
          <h5 class="mb-2 text-xl font-bold tracking-tight">Rau sạch Đồ Sơn</h5>
        </a>
        <p class="mb-3 font-normal text-gray-700">200K/45kg.</p>
      </div>
    </div>
  );
};

export default ItemCard;
