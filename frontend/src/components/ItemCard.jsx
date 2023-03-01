import React from "react";
import img from "../assets/imgs/1-300x300.jpg";
import { Link } from "react-router-dom";
import { vnd } from "../../../admin/ultis/ktsFunc";
const ItemCard = (props) => {
  const discount = Math.round(
    ((props.data?.stockPrice - props.data?.currentPrice) * 100) /
      props.data?.stockPrice
  );
  return (
    // <div class="bg-white rounded-lg relative block justify-between shadow-lg mx-atuto max-w-full overflow-hidden">
    <div class="bg-white rounded-lg relative flex flex-col justify-betwee shadow-lg w-full mx-atuto">
      <div className="z-10 w-12 h-12 border-double border-4 border-white bg-red-600 absolute top-3 right-3 rounded-tl-3xl rounded-tr-3xl rounded-bl rounded-br-3xl flex items-center text-center pl-1.5 text-white">
        <p className="font-semibold">{`${discount}%`}</p>
      </div>
      <div className="overflow-hidden rounded-t-lg w-full md:h-52 h-40">
        <Link to={`/products/${props.data?._id}`}>
          <img
            className="transition duration-500 hover:scale-125 object-cover object-center w-full h-full"
            // className="rounded-t-lg  object-cover transition duration-500 hover:scale-125 rounded-md"
            src={
              props.data?.imgs[0] ||
              "https://via.placeholder.com/300.png/09f/fff"
            }
            alt=""
          />
        </Link>
      </div>
      <div className="py-2 px-3">
        <h5 class="mb-1 text-xl font-semibold tracking-tight truncate">
          {props.data?.productName}
        </h5>
        <p className="mb-1  text-red-600 font-semibold line-through">
          {vnd(props.data?.stockPrice)}
        </p>
        {discount > 0 && (
          <p className="mb-1 text-primary font-semibold">
            {vnd(props.data?.currentPrice)}
          </p>
        )}
      </div>
    </div>
  );
};

export default ItemCard;
