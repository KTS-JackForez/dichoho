import React, { useEffect, useState } from "react";
import { Footer, Header, Navbar, Promotion } from "../components";
// import "./News.css";
// import "../assets/css/base.css";
import ktsRequest from "../../ultis/ktsrequest";
import { Link } from "react-router-dom";

const News = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await ktsRequest.get("/posts");
        setData(res.data);
      } catch (err) {
        err.response
          ? toast.error(err.response.data.message)
          : toast.error("Network Error!");
      }
    };
    fetchData();
  }, []);
  return (
    <div className="bg-gray-100">
      <Promotion />
      <Header />
      <Navbar />
      <div className="max-w-screen-xl bg-white mx-auto">
        <div class="w-full flex py-3 gap-6">
          <div className="w-3/4 grid grid-cols-2 gap-3 md:grid-cols-3">
            {data.map((p, i) => {
              return (
                <Link to="#" className="bg-gray-100">
                  <div className="w-full h-64">
                    <img
                      src={p.thumbnail}
                      alt=""
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                  <div className="text-gray-800 font-semibold hover:text-gray-600 py-2">
                    <p className="line-clamp-2">{p.title}</p>
                    <p className="line-clamp-3">{p.description}</p>
                  </div>
                </Link>
              );
            })}
          </div>
          <div className="w-1/4">
            <div className="bg-white w-full">
              <h3 className="text-white bg-primary px-4 py-2">
                bài viết nổi bật
              </h3>
              <div className="divide-y divide-dashed divide-primary bg-white flex flex-col">
                <Link className="px-4 py-1">abc</Link>
                <Link className="px-4 py-1">abc</Link>
                <Link className="px-4 py-1">abc</Link>
                <Link className="px-4 py-1">abc</Link>
                <Link className="px-4 py-1">abc</Link>
              </div>
            </div>
            <div className="bg-white w-full mt-3">
              <h3 className="text-white bg-primary px-4 py-2">
                bài viết nổi bật
              </h3>
              <div className="divide-y divide-dashed divide-primary bg-white flex flex-col">
                <Link className="px-4 py-1 hover:text-blue-500">abc</Link>
                <Link className="px-4 py-1 hover:text-blue-500">abc</Link>
                <Link className="px-4 py-1 hover:text-blue-500">abc</Link>
                <Link className="px-4 py-1 hover:text-blue-500">abc</Link>
                <Link className="px-4 py-1 hover:text-blue-500">abc</Link>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default News;
