import React from "react";
import { Navbar, Footer, Slider } from "../components";
const Home = () => {
  return (
    <div className="max-w-screen-xl mx-auto text-center">
      <Navbar />
      <Slider />
      <Footer />
    </div>
  );
};

export default Home;
