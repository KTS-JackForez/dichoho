import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/imgs/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { vnd } from "../../ultis/ktsFunc";
import { removeItem, resetCart } from "../redux/cartReducer";
const Cart = (props) => {
  const show = window.location.pathname === "/cart" ? false : true;
  const [subtotal, setSubtotal] = useState(0);
  let subtotal1 = 0;
  const dispatch = useDispatch();
  return (
    show && (
      <div className="text-gray-800 bg-white rounded shadow absolute top-12 right-0 z-50 p-3 flex flex-col w-96 gap-2 ">
        {props.data.length > 0 ? (
          <div>
            <div>
              <div className="divide-y divide-dashed divide-primary">
                <div className="pb-3 flex justify-end items-center">
                  <button
                    className="block border border-primary px-3 py-1 rounded hover:bg-primary hover:text-white"
                    onClick={() => dispatch(resetCart())}
                  >
                    xóa giỏ hàng
                  </button>
                </div>
                {props.data.map((i, k) => {
                  subtotal1 += i.currentPrice * i.quantity;
                  return (
                    <div
                      className="py-1 flex gap-2 justify-between items-center"
                      key={k}
                    >
                      <img src={i.img} alt="" className="w-16" />
                      <div className="flex flex-col justify-center items-start flex-1">
                        <p className="font-semibold text-left">
                          {i.productName}
                        </p>
                        <p className="text-green-600">
                          {vnd(i.currentPrice) + " * " + i.quantity}
                        </p>
                      </div>
                      <div className="text-center w-1/5">
                        <button
                          className="bg-white p-2 rounded-full hover:bg-primary hover:text-white"
                          onClick={() => dispatch(removeItem(i.id))}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={3}
                            stroke="currentColor"
                            className="w-3 h-3"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="flex justify-between pr-6">
              <span>tổng tiền</span>
              <span className="font-bold">{vnd(subtotal1)}</span>
            </div>
            <div className="flex flex-col gap-2">
              <Link
                to="/cart"
                className="p-2 bg-primary rounded uppercase font-semibold text-white hover:bg-green-700"
              >
                Xem giỏ hàng
              </Link>
              <Link
                to="/checkout"
                className="p-2 bg-orange-500 rounded uppercase font-semibold text-white hover:bg-orange-700"
              >
                thanh toán
              </Link>
            </div>
          </div>
        ) : (
          "Chưa có sản phẩm nào"
        )}
      </div>
    )
  );
};
const Header = () => {
  const [openCart, setOpenCart] = useState(false);
  const { products } = useSelector((state) => state.cart);
  const hoverOn = () => {
    setOpenCart(true);
  };
  const hoverOut = () => {
    setOpenCart(false);
  };
  const totalItems = (cart) => {
    let total = 0;
    cart.map((item) => {
      total += item.quantity;
    });
    return total;
  };
  return (
    <div className="max-w-screen-xl mx-auto text-center flex items-center justify-between">
      <Link to="/">
        <img src={logo} alt="" className="w-36 h-auto" />
      </Link>
      <div className="flex justify-center flex-1">
        <input
          type="text"
          placeholder="Tìm kiếm ..."
          className="p-2 border border-gray-300 rounded-l-md focus:outline-none w-3/5"
        />
        <button className="bg-primary px-3 rounded-r-md text-white hover:bg-green-700">
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
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </button>
      </div>
      <div className="flex gap-4">
        <div className="flex justify-center items-center gap-2">
          <div className="bg-green-600 p-2 mx-auto text-white rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
              />
            </svg>
          </div>
          <div>
            <p className="text-md">Hỗ trợ khách hàng</p>
            <p className="text-primary font-extrabold text-xl">0123456789</p>
          </div>
        </div>
        <div
          className="flex items-center relative bg-green-600 rounded px-4 text-white font-semibold gap-2  hover:bg-green-700"
          onMouseOver={hoverOn}
          onMouseOut={hoverOut}
        >
          <p>giỏ hàng</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
            />
          </svg>
          {products.length > 0 && (
            <div className="bg-red-500 w-3 h-3 p-3 rounded-full -right-2 absolute flex justify-center items-center -top-2 ">
              {totalItems(products)}
            </div>
          )}
          {openCart && <Cart data={products} />}
        </div>
        <Link
          to="/login"
          tooltip="Tài khoản"
          className="bg-primary p-4 flex items-center rounded-full text-white hover:bg-green-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default Header;
