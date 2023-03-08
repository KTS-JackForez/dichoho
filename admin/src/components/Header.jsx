import React from "react";
import { useState } from "react";

const Header = () => {
  const [show, setShow] = useState(false)
  return (
    <div className="w-full p-2">
      <div className="bg-white rounded px-2 py-4 flex justify-between items-center">
        <div> tiêu đề</div>
        <div className="flex gap-3 items-center">
          <div className="flex items-center gap-3 relative" onClick={()=>{
            setShow(!show)
          }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8 cursor-pointer"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
              />
            </svg>
            <div className="absolute -top-3 -right-2 rounded-full bg-red-500 w-5 h-5 flex justify-center items-center text-xs text-white">
              2
            </div>
            {/* showNotify */}
           {show &&  <div className="block w-96 right-0 bg-white absolute top-full border rounded-sm border-gray-400">
              <div className="h-10 bg-white">
                <h3 className="ml-3 leading-10 font-semibold text-gray-600">Thông Báo Mới Nhận</h3>
              </div>
              <ul className="">
                <li className="block text-base font-semibold hover:bg-orange-200 border-b rounded-sm border-gray-300 bg-orange-100">
                  <a href="" className="p-3 block">
                  <span className="text-base"><i className="text-rose-500">*</i>Bạn có đơn hàng mới</span>
                  <i className="block mt-1 text-sm text-slate-500">KH MrTTS đã đặt hàng, mã sản phẩm CE32652HG</i>
                  </a>
                  </li>
                  <li className="block text-base font-semibold hover:bg-orange-200 border-b rounded-sm border-gray-300 bg-orange-100">
                  <a href="" className="p-3 block">
                  <span className="text-base"><i className="text-rose-500">*</i>Hệ thống có bài viết mới</span>
                  <i className="block mt-1 text-sm text-slate-500">Cập thật thông tin chương trình mua hàng ngay, quà liền tay</i>
                  </a>
                  </li>
                  <li className="block text-base font-semibold hover:bg-orange-200 border-b rounded-sm border-gray-300 bg-orange-100">
                  <a href="" className="p-3 block">
                    <span className="text-base">Đơn hàng đã hoàn thành</span>
                    <i className="block mt-1 text-sm text-slate-500">Đơn hàng mã CE32652HG đã hoàn thành</i>
                  </a>
                  </li>
              </ul>
              <div className="flex justify-center"><a href="" className="no-underline py-2.5 px-12 text-current font-semibold">Xem tất cả</a></div>
            </div>}
          </div>
          <h3 className="font-bold"> JackForez123</h3>
          <div className="rounded-full h-12 w-12 bg-orange-500">
            {/* <img src="" alt="" /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
