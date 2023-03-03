import React, { useEffect, useState } from "react";
import { Footer, Header, Navbar, Promotion } from "../components";
// import "./News.css";
// import "../assets/css/base.css";
import ktsRequest from "../../ultis/ktsrequest";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

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
  const hot = data.length > 5 ? data.slice(0, 5) : data;
  return (
    <div className="bg-gray-100">
      <Promotion />
      <Header />
      <Navbar />
      <div className="max-w-screen-xl bg-white mx-auto">
        <div className="w-full flex flex-col md:flex-row py-3 gap-6">
          <div className="md:w-3/4 w-full grid grid-cols-2 gap-3 md:grid-cols-3">
            {data.map((p, i) => {
              return (
                <Link to={`/news/${p._id}`} className="bg-gray-100" key={i}>
                  <div className="w-full md:h-48 h-32">
                    <img
                      src={p.thumbnail}
                      alt=""
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                  <div className="text-gray-800 hover:text-gray-600 py-2">
                    <p className="line-clamp-2 font-semibold">{p.title}</p>
                    <p className="line-clamp-3">{p.description}</p>
                  </div>
                </Link>
              );
            })}
          </div>
          <div className="md:w-1/4 w-full">
            <div className="bg-white w-full">
              <h3 className="text-white bg-primary px-4 py-2">
                bài viết nổi bật
              </h3>
              <div className="divide-y divide-dashed divide-primary bg-white flex flex-col">
                {hot.map((p, i) => {
                  return (
                    <Link className="px-4 py-1" key={i} to={`/news/${p._id}`}>
                      {p.title}
                    </Link>
                  );
                })}
              </div>
            </div>
            <div className="bg-white w-full mt-3">
              <h3 className="text-white bg-primary px-4 py-2">
                bài viết nổi bật
              </h3>
              <div className="divide-y divide-dashed divide-primary bg-white flex flex-col">
                {hot.map((p, i) => {
                  return (
                    <Link className="px-4 py-1" key={i} to={`/news/${p._id}`}>
                      {p.title}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
      <Footer />
    </div>
  );
};

export default News;
