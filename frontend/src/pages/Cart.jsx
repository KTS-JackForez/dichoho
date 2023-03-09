import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { vnd } from "../../ultis/ktsFunc";
import ktsRequest from "../../ultis/ktsrequest";
import { Footer, Header, Navbar, Promotion } from "../components";
import { addToCart, removeItem, resetCart } from "../redux/cartReducer";
import { setMsg } from "../redux/msgSlice";
import QR_Code from "../assets/imgs/QR_CodeFull.jpg";
const Cart = () => {
  const { products } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [payment, setPayment] = useState("cod");
  const [payCode, setPayCode] = useState("");
  const [isCheckout, setIsCheckout] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const total = (products) => {
    let total = 0;
    products.map((item) => {
      total += item.quantity * item.currentPrice;
    });
    return total;
  };
  const handleClick = async () => {
    if (!currentUser) {
      return navigate("/login");
    }
    const { token } = currentUser;
    try {
      const res = await ktsRequest.post(
        "/orders",
        {
          buyerId: currentUser._id,
          total: total(products),
          payCode,
          products,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(res.data.message);
      setOrderNumber(res.data.data);
      dispatch(resetCart());
      setIsCheckout(true);
    } catch (err) {
      console.log(err);
      err.response
        ? toast.error(err.response.data)
        : toast.error("Network Error!");
    }
  };
  return (
    <div>
      <Promotion />
      <Header />
      <Navbar />
      <div className="max-w-screen-xl mx-auto my-10 min-h-[30vh]">
        {products.length > 0 ? (
          <div className="flex gap-3 flex-wrap md:flex-nowrap border border-primary rounded">
            <div className="md:w-3/4 w-full divide-primary divide-dashed divide-y shadow-lg">
              <div className="flex p-3">
                <h3 className="font-bold text-gray-700 uppercase w-2/5 pl-10">
                  hàng hóa
                </h3>
                <h3 className="font-bold text-center text-gray-600 uppercase w-1/5">
                  số lượng
                </h3>
                <h3 className="font-bold text-center text-gray-600 uppercase w-1/5">
                  đơn giá
                </h3>
                <h3 className="font-bold text-center text-gray-600 uppercase w-1/5">
                  thành tiền
                </h3>
              </div>
              <div className="gap-3 p-3">
                {products.map((i, index) => {
                  return (
                    <div className="flex items-center px-6 py-5 " key={index}>
                      <div className="flex w-2/5 items-center">
                        <div className="text-center pr-5">
                          <button
                            className="bg-white p-2 rounded-full hover:bg-primary hover:text-white"
                            onClick={() => {
                              dispatch(removeItem(i.id));
                            }}
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
                        <div className="w-20">
                          <img
                            className="h-20 w-20 object-cover object-center rounded-md"
                            src={i.img}
                            alt=""
                          />
                        </div>
                        <div className="flex flex-col justify-between ml-4 flex-grow">
                          <Link
                            to={`/products/${i.id}`}
                            className="font-bold text-sm"
                          >
                            {i.productName}
                          </Link>
                          <span className="text-red-500 text-xs">
                            {i.description}
                          </span>
                        </div>
                      </div>
                      <div className="flex justify-center w-1/5">
                        <button
                          className="bg-gray-200 rounded px-2 hover:bg-primary"
                          onClick={() =>
                            dispatch(
                              addToCart({
                                id: i.id,
                                quantity: i.quantity < 2 ? 0 : -1,
                              })
                            )
                          }
                        >
                          <svg
                            className="fill-current text-gray-600 w-3"
                            viewBox="0 0 448 512"
                          >
                            <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                          </svg>
                        </button>
                        <input
                          className="mx-2 border text-center w-12 focus:border-primary focus:outline-none focus:ring-primary rounded disable"
                          type="text"
                          value={i.quantity}
                          disabled={true}
                        />
                        <button
                          className="bg-gray-200 rounded px-2 hover:bg-primary"
                          onClick={() => {
                            dispatch(
                              addToCart({
                                id: i.id,
                                quantity: 1,
                              })
                            );
                          }}
                        >
                          <svg
                            className="fill-current text-gray-600 w-3"
                            viewBox="0 0 448 512"
                          >
                            <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                          </svg>
                        </button>
                      </div>
                      <span className="text-center w-1/5 font-semibold text-sm">
                        {vnd(i.currentPrice)}
                      </span>
                      <span className="text-center w-1/5 font-semibold text-sm">
                        {vnd(i.quantity * i.currentPrice)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="md:w-1/4 w-full divide-primary divide-dashed divide-y">
              <h1 className="uppercase p-3 font-bold">đơn hàng</h1>
              <div className="p-3 flex gap-3 flex-col">
                <div className="flex justify-between">
                  <span className="font-semibold text-sm uppercase py-3">
                    tiền hàng
                  </span>
                  <span className="font-semibold text-sm py-3">
                    {vnd(total(products))}
                  </span>
                </div>
                <div>
                  <label className="font-medium inline-block text-sm uppercase">
                    phương thức vận chuyển
                  </label>
                  <select className="block w-full rounded border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 focus:outline-none focus:border-primary focus:ring-primary">
                    <option>Tiêu chuẩn</option>
                    <option>Siêu tốc</option>
                  </select>
                </div>
                <div>
                  <label className="font-medium inline-block text-sm uppercase">
                    phương thức thanh toán
                  </label>
                  <select
                    className="block w-full rounded border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 focus:outline-none focus:border-primary focus:ring-primary"
                    onChange={(e) => setPayment(e.target.value)}
                  >
                    <option value="cod">COD</option>
                    <option value="bank">Trực tuyến</option>
                  </select>
                </div>
                {payment === "bank" && (
                  <div>
                    {/* <p>Số TK: 123456789098</p>
                    <p>Tên NK: Vietcombank</p>
                    <p>Tên chủ TK: MrTTS</p> */}
                       <img
                  src={QR_Code}
                alt=""
                className="md:w-full w-1/2 md:h-1/6 object-contain"
              />
                  </div>
                )}
                {payment === "bank" && (
                  <div className="">
                    <label
                      htmlFor="payCode"
                      className="font-semibold inline-block text-sm uppercase"
                    >
                      Mã giao dịch (chuyển khoản)
                    </label>
                    <input
                      onChange={(e) => setPayCode(e.target.value)}
                      type="text"
                      id="payCode"
                      placeholder="Nhập mã giao dịch"
                      className="border-grey-light block w-full rounded border p-2 focus:border-primary focus:outline-none"
                    />
                  </div>
                )}

                {/* <button className="bg-orange-500 hover:bg-orange-600 px-5 py-2 text-sm text-white uppercase rounded">
                  Áp dụng
                </button> */}
                <div className="">
                  <label
                    htmlFor="note"
                    className="font-semibold inline-block text-sm uppercase"
                  >
                    Ghi chú
                  </label>
                  {/* <input
                    type="text"
                    id="note"
                    placeholder="Ghi chú của người mua"
                    className="border-grey-light block w-full rounded border p-2 focus:border-primary focus:outline-none"
                  /> */}
                  <textarea
                    type="text"
                    id="note"
                    placeholder="Ghi chú của người mua"
                    className="border-grey-light block w-full rounded border p-2 focus:border-primary focus:outline-none"
                  />
                </div>
                <div className="border-t mt-8">
                  <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                    <span>tổng tiền đơn hàng</span>
                    <span>{vnd(total(products))}</span>
                  </div>
                  <button
                    className="bg-primary font-semibold hover:bg-primary rounded py-3 text-sm text-white uppercase w-full"
                    onClick={handleClick}
                  >
                    đặt hàng
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center flex-col items-center gap-3">
            {isCheckout ? (
              <div className="">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={4}
                  stroke="green"
                  className="w-16 h-16 mx-auto"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
                <p className="mt-1">
                  Cảm ơn bạn đã đặt hàng! Mã đơn hàng của bạn là:{" "}
                  <span className="bg-gray-200 px-3 py-1 font-semibold rounded-md">
                    {orderNumber}
                  </span>
                  Chúng tôi đang chuẩn bị hàng giao đến bạn
                </p>
              </div>
            ) : (
              <div>bạn chưa chọn sản phẩm nào !!!</div>
            )}

            <div className="flex gap-2">
              <Link
                to="/"
                className="px-4 py-1 bg-primary text-white hover:bg-green-700"
              >
                 Mua thêm
              </Link>
              <Link
                to="/contact"
                className="px-4 py-1 bg-primary text-white hover:bg-green-700"
              >
                Liên hệ chúng tôi
              </Link>
            </div>
          </div>
        )}
        {products.length > 0 && (
          <div>
            <Link
              to="/"
              className="flex font-semibold text-primary text-sm mt-10 hover:text-green-700"
            >
              <svg
                className="fill-current mr-2 text-primary w-4"
                viewBox="0 0 448 512"
              >
                <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
              </svg>
              Thêm nhiều món ngon nữa
            </Link>
          </div>
        )}
        <ToastContainer />
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
