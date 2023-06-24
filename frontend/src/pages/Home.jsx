import React from "react";

import {
  Navbar,
  Footer,
  Slider,
  Promotion,
  Category,
  ProductCat,
  HotProducts,
  Header,
  Lastest,
  Sidebar,
} from "../components";
import raucuqua from "../assets/imgs/banner_prduct3.webp";
import thitca from "../assets/imgs/banner_prduct2.webp";
import michaopho from "../assets/imgs/banner_prduct1.webp";
const Home = () => {
  return (
    <div>
      <Promotion />
      <Header />
      <Navbar />
      <div className="max-w-screen-xl bg-gray-100 mx-auto">
        <Slider />
        <Sidebar />
        <Category />
        <HotProducts title="nổi bật" />
        <Lastest />
        <ProductCat catTitle="rau - củ - quả" picCover={raucuqua} />
        <ProductCat catTitle="thịt - cá" picCover={thitca} />
        <ProductCat catTitle="mì - cháo - phở" picCover={michaopho} />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
