import React from "react";
import { Navbar, Footer, Slider, Promotion, Category } from "../components";
const Home = () => {
  return (
    <div className="h-screen relative">
      <Promotion />
      <Navbar />
      <Slider />
      <Category />
      <Footer />
    </div>
  );
};

export default Home;
