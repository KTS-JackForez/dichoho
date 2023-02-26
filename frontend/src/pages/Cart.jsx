import React from "react";
import { Link } from "react-router-dom";
import { vnd } from "../../ultis/ktsFunc";
import { Footer, Header, Navbar, Promotion } from "../components";

const Cart = () => {
  const data = [1, 2];
  return (
    <div>
      <Promotion />
      <Header />
      <Navbar />
      <div className="max-w-screen-xl mx-auto my-10">
        <div className="flex gap-3 flex-wrap md:flex-nowrap border border-primary rounded">
          <div className="md:w-3/4 w-full divide-primary divide-dashed divide-y">
            <div className="flex p-3">
              <h3 class="font-bold text-gray-700 uppercase w-2/5">hàng hóa</h3>
              <h3 class="font-bold text-center text-gray-600 uppercase w-1/5">
                số lượng
              </h3>
              <h3 class="font-bold text-center text-gray-600 uppercase w-1/5">
                đơn giá
              </h3>
              <h3 class="font-bold text-center text-gray-600 uppercase w-1/5">
                thành tiền
              </h3>
            </div>
            <div className="gap-3 p-3">
              {data.map((i) => {
                return (
                  <div class="flex items-center px-6 py-5 ">
                    <div class="flex w-2/5 items-center">
                      <div className="text-center pr-5">
                        <button className="bg-white p-2 rounded-full hover:bg-primary hover:text-white">
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
                      <div class="w-20">
                        <img
                          class="h-20"
                          src="https://green.web5phut.com/wp-content/uploads/2022/06/4.jpg"
                          alt=""
                        />
                      </div>
                      <div class="flex flex-col justify-between ml-4 flex-grow">
                        <span class="font-bold text-sm">Rau sạch Đồ Sơn</span>
                        <span class="text-red-500 text-xs">
                          hàng tuyển chất lượng cao
                        </span>
                      </div>
                    </div>
                    <div class="flex justify-center w-1/5">
                      <button className="bg-gray-200 rounded px-2 hover:bg-primary">
                        <svg
                          class="fill-current text-gray-600 w-3"
                          viewBox="0 0 448 512"
                        >
                          <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                        </svg>
                      </button>
                      <input
                        class="mx-2 border text-center w-8"
                        type="text"
                        value="1"
                      />
                      <button className="bg-gray-200 rounded px-2 hover:bg-primary">
                        <svg
                          class="fill-current text-gray-600 w-3"
                          viewBox="0 0 448 512"
                        >
                          <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                        </svg>
                      </button>
                    </div>
                    <span class="text-center w-1/5 font-semibold text-sm">
                      {vnd}
                    </span>
                    <span class="text-center w-1/5 font-semibold text-sm">
                      $400.00
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="md:w-1/4 w-full divide-primary divide-dashed divide-y">
            <h1 className="uppercase p-3 font-bold">đơn hàng</h1>
            <div className="p-3 flex gap-3 flex-col">
              <div class="flex justify-between">
                <span class="font-semibold text-sm uppercase py-3">
                  tiền hàng
                </span>
                <span class="font-semibold text-sm py-3">{vnd(30000)}</span>
              </div>
              <div>
                <label class="font-medium inline-block text-sm uppercase">
                  phương thức vận chuyển
                </label>
                <select class="block p-2 text-gray-600 w-full text-sm">
                  <option>tiêu chuẩn</option>
                  <option>siêu tốc</option>
                </select>
              </div>
              <div class="">
                <label
                  for="promo"
                  class="font-semibold inline-block text-sm uppercase"
                >
                  Mã khuyến mại
                </label>
                <input
                  type="text"
                  id="promo"
                  placeholder="Nhập mã khuyến mại"
                  class="p-2 text-sm w-full"
                />
              </div>
              <button class="bg-orange-500 hover:bg-orange-600 px-5 py-2 text-sm text-white uppercase rounded">
                Áp dụng
              </button>
              <div class="border-t mt-8">
                <div class="flex font-semibold justify-between py-6 text-sm uppercase">
                  <span>tổng tiền đơn hàng</span>
                  <span>{vnd(30000)}</span>
                </div>
                <button class="bg-primary font-semibold hover:bg-primary rounded py-3 text-sm text-white uppercase w-full">
                  thanh toán
                </button>
              </div>
            </div>
          </div>
        </div>
        <div>
          <Link
            to="/"
            class="flex font-semibold text-primary text-sm mt-10 hover:text-green-700"
          >
            <svg
              class="fill-current mr-2 text-primary w-4"
              viewBox="0 0 448 512"
            >
              <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
            </svg>
            Thêm nhiều món ngon nữa
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
