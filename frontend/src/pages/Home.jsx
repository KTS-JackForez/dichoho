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
        <ProductCat
          catTitle="rau - củ - quả"
          picCover={import("../assets/imgs/banner_prduct3.webp")}
        />
        <ProductCat
          catTitle="thịt - cá"
          picCover={import("../assets/imgs/banner_prduct2.webp")}
        />
        <ProductCat
          catTitle="mì - cháo - phở"
          picCover={import("../assets/imgs/banner_prduct1.webp")}
        />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
