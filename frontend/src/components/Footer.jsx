import React from "react";
import logo from "../assets/imgs/logo.png";
const MyCart = ({
  children: cart,
  show = true,
  img = "",
  text1 = "",
  text2 = "",
  size = "56",
}) => {
  return (
    show && (
      <div
        className={`p-3 border border-primary flex w-${size} justify-center items-center gap-2 bg-white rounded-lg `}
      >
        <div>
          <img src={img} alt="" />
        </div>
        <div>
          <p className="text-gray-800 uppercase font-semibold">{text1}</p>
          <p className="text-gray-800">{text2}</p>
        </div>
      </div>
    )
  );
};
const Footer = () => {
  return (
    <div className="w-full bg-green-100 py-4">
      <div className="max-w-screen-xl mx-auto flex flex-wrap justify-between pt-3 mb-8">
        <MyCart
          img="https://green.web5phut.com/wp-content/uploads/2022/07/p1.png"
          text1="sản phẩm"
          text2="chất lượng"
          size="56"
        />
        <MyCart
          img="https://green.web5phut.com/wp-content/uploads/2022/07/p2.png"
          text1="chủng loại"
          text2="phong phú"
          size="56"
        />
        <MyCart
          img="https://green.web5phut.com/wp-content/uploads/2022/07/p3.png"
          text1="giá cả"
          text2="cạnh tranh"
          size="56"
        />
        <MyCart
          img="https://green.web5phut.com/wp-content/uploads/2022/07/p4.png"
          text1="giao hàng"
          text2="nhanh chóng"
          size="56"
        />
      </div>
      <div className="flex justify-between mt-2 mx-auto max-w-screen-xl p-3 text-gray-700">
        <div className="flex gap-4 w-1/2">
          <div className="flex">
            <div className="px-4">
              <img src={logo} alt="" className="w-56" />
              <img
                src="https://green.web5phut.com/wp-content/uploads/2021/10/Untitled-7.png"
                alt=""
                className="w-56"
              />
            </div>

            <ul className="pt-8 flex flex-col gap-2">
              <li className="flex gap-2 items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                  />
                </svg>

                <span>
                  Địa chỉ: Tầng 2 - KTS Home, Nguyễn Văn Linh, An Dương, Hải
                  Phòng
                </span>
              </li>
              <li className="flex gap-2 items-center">
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
                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                  />
                </svg>
                <span>Email: hotro@sale168.vn</span>
              </li>
              <li className="flex gap-2">
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
                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                  />
                </svg>

                <span>Điện thoại: 0788.300.894</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex w-1/2 justify-between">
          <div className="w-1/2 px-3 gap-2 flex flex-col">
            <h3 className="uppercase font-semibold text-xl">về chúng tôi</h3>
            <ul className="flex flex-col gap-1">
              <li>Hướng dẫn đăng ký</li>
              <li>Bảo mật thông tin cá nhân</li>
              <li>Quy chế hoạt động</li>
              <li>Quy trình giải quyết khiếu nại</li>
            </ul>
          </div>
          <div className="w-1/2 px-3 gap-2 flex flex-col">
            <h3 className="uppercase font-semibold text-xl">chính sách</h3>
            <ul className="flex flex-col gap-1">
              <li>Hotline: 1900-636-001 (1000đ/phút, 9h-18h từ T2 - T7)</li>
              <li>Các câu hỏi thường gặp</li>
              <li>Hướng dẫn đặt hàng</li>
              <li>Phương thức vận chuyển</li>
              <li>Khiếu nại khách hàng</li>
            </ul>
          </div>
        </div>
      </div>
      <div className=" bg-green-600 mx-auto py-3 text-white font-semibold text-center">
        Copyright 2023 © Thiết kế bởi sale168.com
      </div>
    </div>
  );
};

export default Footer;
