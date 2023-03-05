import React from "react";
import img from "../assets/imgs/1-300x300.jpg";
import { Link } from "react-router-dom";
import { vnd } from "../../../admin/ultis/ktsFunc";
import { useSelector } from "react-redux";
const ItemCard = (props) => {
  const { currenUser } = useSelector((state) => state.user);
  const discount = Math.round(
    ((props.data?.stockPrice - props.data?.currentPrice) * 100) /
      props.data?.stockPrice
  );
  return (
    // <div class="bg-white rounded-lg relative block justify-between shadow-lg mx-atuto max-w-full overflow-hidden">
    <div className="bg-white rounded-lg relative flex flex-col justify-betwee shadow-lg w-full mx-atuto">
      <div className="z-10 w-10 h-10 md:w-12 md:h-12 border-double border-4 border-white bg-red-600 absolute top-3 right-3 rounded-tl-3xl rounded-tr-3xl rounded-bl rounded-br-3xl flex items-center text-center md:pl-1.5 pl-0.5 text-white">
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
        <h5 className="mb-1 text-xl font-semibold tracking-tight truncate">
          {props.data?.productName}
        </h5>
        <p className="mb-1  text-red-600 font-semibold line-through">
          {vnd(props.data?.stockPrice)}
        </p>
        <div className="flex justify-between">
          <div>
            {discount > 0 && (
              <p className="mb-1 text-primary font-semibold truncate">
                {vnd(props.data?.currentPrice)}
              </p>
            )}
          </div>
          <button onClick={() => console.log("like")}>
            {currenUser?.liked.incluse(props._id) ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="red"
                className="w-6 h-6"
              >
                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
              </svg>
            ) : (
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
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
