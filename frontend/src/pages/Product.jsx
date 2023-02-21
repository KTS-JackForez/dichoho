import React, { useState } from "react";
import { Footer, Header, Navbar, Promotion } from "../components";
import { vnd } from "../../ultis/ktsFunc";
const Product = () => {
  const [weight, setWeight] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const [openTab, setOpenTab] = useState(1);
  return (
    <div className="">
      <Promotion />
      <Header />
      <Navbar />
      <div>
        <div>
          <div className="mb-12 max-w-screen-xl mx-auto py-4 flex gap-3">
            <div className="flex w-3/4 gap-2">
              <div className="w-1/2">
                <div className="relative overflow-hidden">
                  <button
                    onClick={() =>
                      setActiveImg((prev) => (prev === 0 ? 3 : prev - 1))
                    }
                    className="p-3 z-10  bg-green-500/30 rounded-full hover:bg-green-300 absolute top-[50%]"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 "
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 19.5L8.25 12l7.5-7.5"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() =>
                      setActiveImg((prev) => (prev === 3 ? 0 : prev + 1))
                    }
                    className="p-3 z-10 bg-green-500/30 rounded-full hover:bg-green-500 absolute top-[50%] right-0"
                  >
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
                        d="M8.25 4.5l7.5 7.5-7.5 7.5"
                      />
                    </svg>
                  </button>
                  <div
                    className="flex w-full duration-500"
                    // style={{ transform: `translateX(-${activeSlide * 100}%)` }}
                    style={{ transform: `translateX(-${activeImg * 100}%)` }}
                  >
                    {[0, 1, 2, 3].map((i) => {
                      return (
                        <img
                          src="https://green.web5phut.com/wp-content/uploads/2022/06/2.jpg"
                          alt=""
                        />
                      );
                    })}
                  </div>
                </div>
                <div className="w-full flex overflow-hidden h-24 ">
                  {[0, 1, 2, 3].map((i, k) => {
                    return (
                      <img
                        src="https://green.web5phut.com/wp-content/uploads/2022/06/2.jpg"
                        alt=""
                        className={`w-1/4 opacity-${
                          activeImg === i
                            ? "100 border border-primary rounded"
                            : "50"
                        } cursor-pointer h-auto`}
                        onClick={() => setActiveImg(i)}
                      />
                    );
                  })}
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="text-gray-700 text-xl font-bold">
                  Thực phẩm hữu cơ sạch
                </h3>
                <p3 className="text-green-600 font-bold text-xl">
                  {vnd(20000) + "- " + vnd(30000)}
                </p3>
                <ul className="list-disc ml-5">
                  <li>Đạt chuẩn an toàn VietGap</li>
                  <li>Hàng tươi mới mỗi ngày</li>
                </ul>
                <div className="bg-orange-100 rounded border border-dashed border-red-500 divide-y divide-dashed divide-red-500">
                  <div className="flex gap-3 p-3 items-center">
                    <img
                      src="https://green.web5phut.com/wp-content/uploads/2022/07/gift.png"
                      className="w-8"
                      alt=""
                    />
                    <h3 className="uppercase font-semibold">
                      khuyến mãi trị giá{" "}
                      <span className="font-bold">{vnd(300000)}</span>
                    </h3>
                  </div>
                  <div className="p-3">
                    <ul className="list-decimal ml-5 ">
                      <li>Đạt chuẩn an toàn VietGap</li>
                      <li>Hàng tươi mới mỗi ngày</li>
                    </ul>
                  </div>
                </div>
                <div className="flex my-5">
                  <span className="font-bold text-gray-700">
                    Trọng lượng (KG)
                  </span>
                  <div className="flex w-1/2 mx-auto">
                    <button className="bg-gray-300 px-2.5 hover:bg-gray-500">
                      -
                    </button>
                    <input
                      type="text"
                      className="border border-gray-300 w-1/4 text-center"
                      value={1}
                    />
                    <button className="bg-gray-300 px-2.5 hover:bg-gray-500">
                      +
                    </button>
                  </div>
                </div>
                <div className="w-full grid grid-cols-2 gap-2">
                  <button className="p-3 font-semibold text-white bg-primary rounded-md">
                    Thêm vào giỏ hàng
                  </button>
                  <button className="p-3 font-semibold text-white bg-orange-400 rounded-md">
                    Mua luôn
                  </button>
                </div>
              </div>
            </div>
            <div className="w-1/4">
              <h3 className="p-3 bg-primary w-full text-center text-white rounded-md block uppercase fo">
                sản phẩm nổi bật
              </h3>
              <div className="divide-y divide-dashed divide-primary">
                <div className="py-1 flex gap-3">
                  <img
                    src="https://green.web5phut.com/wp-content/uploads/2022/06/5-600x600.jpg"
                    alt=""
                    className="w-1/3"
                  />
                  <div className="flex flex-col justify-center items-start flex-1">
                    <p className="font-semibold">sản phẩm hữu cơ sạch</p>
                    <p className="text-green-400">{vnd(20000)}</p>
                  </div>
                </div>
                <div className="py-1 flex gap-3">
                  <img
                    src="https://green.web5phut.com/wp-content/uploads/2022/06/5-600x600.jpg"
                    alt=""
                    className="w-1/3"
                  />
                  <div className="flex flex-col justify-center items-start flex-1">
                    <p className="font-semibold">sản phẩm hữu cơ sạch</p>
                    <p className="text-green-400">{vnd(20000)}</p>
                  </div>
                </div>
                <div className="py-1 flex gap-3">
                  <img
                    src="https://green.web5phut.com/wp-content/uploads/2022/06/5-600x600.jpg"
                    alt=""
                    className="w-1/3"
                  />
                  <div className="flex flex-col justify-center items-start flex-1">
                    <p className="font-semibold">sản phẩm hữu cơ sạch</p>
                    <p className="text-green-400">{vnd(20000)}</p>
                  </div>
                </div>
                <div className="py-1 flex gap-3">
                  <img
                    src="https://green.web5phut.com/wp-content/uploads/2022/06/5-600x600.jpg"
                    alt=""
                    className="w-1/3"
                  />
                  <div className="flex flex-col justify-center items-start flex-1">
                    <p className="font-semibold">sản phẩm hữu cơ sạch</p>
                    <p className="text-green-400">{vnd(20000)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap max-w-screen-xl mx-auto">
          <div className="w-full">
            <ul
              className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
              role="tablist"
            >
              <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                <a
                  className={
                    "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                    (openTab === 1
                      ? "text-white bg-primary"
                      : "text-primary bg-white")
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenTab(1);
                  }}
                  data-toggle="tab"
                  href="#link1"
                  role="tablist"
                >
                  mô tả
                </a>
              </li>
              <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                <a
                  className={
                    "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                    (openTab === 2
                      ? "text-white bg-primary"
                      : "text-primary bg-white")
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenTab(2);
                  }}
                  data-toggle="tab"
                  href="#link2"
                  role="tablist"
                >
                  thông tin bổ sung
                </a>
              </li>
              <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                <a
                  className={
                    "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                    (openTab === 3
                      ? "text-white bg-primary"
                      : "text-primary bg-white")
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenTab(3);
                  }}
                  data-toggle="tab"
                  href="#link3"
                  role="tablist"
                >
                  đánh giá
                </a>
              </li>
            </ul>
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
              <div className="px-4 py-5 flex-auto">
                <div className="tab-content tab-space">
                  <div
                    className={openTab === 1 ? "block" : "hidden"}
                    id="link1"
                  >
                    <p>
                      Mô tả sản phẩm
                    </p>
                  </div>
                  <div
                    className={openTab === 2 ? "block" : "hidden"}
                    id="link2"
                  >
                    <p>
                     Thông tin về sản phẩm
                    </p>
                  </div>
                  <div
                    className={openTab === 3 ? "block" : "hidden"}
                    id="link3"
                  >
                    <p>
                     hãy là người đầu tiên đánh giá về sản phẩm
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Product;
