import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import {
  Navbar,
  Footer,
  Slider,
  Promotion,
  Category,
  ItemCard,
  ProductCat,
  HotProducts,
  Header,
  Lastest,
  Carousel,
  MySlider,
  Sidebar,
} from "../components";
const Home = () => {
  const { currentMsg } = useSelector((state) => state.msg);
  return (
    <div>
      <Promotion />
      <Header />
      <Navbar />
      <div className="max-w-screen-xl bg-gray-100 mx-auto">
        <Slider />
        <Sidebar />
        <Category />
        {/* <MySlider /> */}
        <HotProducts title="nổi bật" />
        <Lastest />
        <ProductCat
          catTitle="rau - củ - quả"
          picCover="https://green.web5phut.com/wp-content/uploads/2022/08/banner_prduct3.png"
        />
        <ProductCat
          catTitle="thịt - cá"
          picCover="https://green.web5phut.com/wp-content/uploads/2022/08/banner_prduct2.png"
        />
        <ProductCat
          catTitle="mì - cháo - phở"
          picCover="https://green.web5phut.com/wp-content/uploads/2022/08/banner_prduct1.png"
        />
      </div>
      {/* <ToastContainer /> */}
      <Footer />
    </div>
  );
};

export default Home;
