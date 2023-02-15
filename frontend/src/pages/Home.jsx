import React from "react";
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
} from "../components";
const Home = () => {
  return (
    <div className="h-screen relative">
      <Promotion />
      <Header />
      <Navbar />
      <Slider />
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
      <Footer />
    </div>
  );
};

export default Home;
