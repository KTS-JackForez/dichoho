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
        className={`p-3 border flex w-${size} justify-center items-center rounded gap-2`}
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
    <div className="w-full">
      <div className="max-w-screen-xl mx-auto flex flex-wrap justify-around">
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
      <div className="flex gap-2">
        <div>
          <img src={logo} alt="" />
          <ul>
            <li>Địa chỉ</li>
            <li>Email</li>
            <li>Điện thoại</li>
          </ul>
        </div>
        <div>
          <h3>về chúng tôi</h3>
          <ul>
            <li>Địa chỉ</li>
            <li>Email</li>
            <li>Điện thoại</li>
          </ul>
        </div>
        <div>
          <h3>chính sách</h3>
          <ul>
            <li>Địa chỉ</li>
            <li>Email</li>
            <li>Điện thoại</li>
          </ul>
        </div>
        <div></div>
      </div>
      <div className=" bg-green-600 mx-auto py-3 text-white font-semibold text-center">
        Copyright 2023 © Thiết kế bởi sale168.com
      </div>
    </div>
  );
};

export default Footer;
