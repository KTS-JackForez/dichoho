import React, { useEffect, useState } from "react";
import ktsRequest from "../../ultis/ktsrequest";
import { ToastContainer, toast } from "react-toastify";

import { Footer, Header, ItemCard, Navbar, Promotion } from "../components";
import { useSearchParams } from "react-router-dom";

const products = () => {
  const [data, setData] = useState([]);
  const [searchParams] = useSearchParams();
  useEffect(() => {
    const query = searchParams.get("q") || "";
    const fetchData = async () => {
      try {
        const res = await ktsRequest.get(`/products?q=${query}`);
        setData(res.data);
      } catch (err) {
        err.response
          ? toast.error(err.response.data.message)
          : toast.error("Network Error!");
      }
    };
    fetchData();
  }, [searchParams]);
  return (
    <div>
      <Promotion />
      <Header />
      <Navbar />
      <div className="max-w-screen-xl mx-auto py-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 w-full">
        {data.map((p, i) => {
          return <ItemCard data={p} key={i} />;
        })}
      </div>
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default products;
