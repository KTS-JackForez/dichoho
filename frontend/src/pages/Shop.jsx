import React, { useEffect, useState } from "react";
import {
  Chat,
  Footer,
  Header,
  ItemCard,
  Navbar,
  Promotion,
} from "../components";
import { ToastContainer, toast } from "react-toastify";
import ktsRequest from "../../ultis/ktsrequest";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const Shop = () => {
  const [shopInfo, setShopInfo] = useState({});
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const [showChat, setShowChat] = useState(false);

  const { currentUser } = useSelector((state) => state.user);
  const keys = ["productName"];
  const { shopId } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await ktsRequest.get(`/products/shop/${shopId}`);
        setData(res.data.products);
        setShopInfo(res.data.shop);
      } catch (err) {
        console.log(err);
        toast.error("Network Error!");
      }
    };
    fetchData();
  }, [window.location.pathname]);
  const search = (data) => {
    return data.filter((item) =>
      keys.some((key) => item[key].toLowerCase().includes(query))
    );
  };
  return (
    <div>
      <Promotion />
      <Header />
      <Navbar />
      <div className="max-w-screen-xl mx-auto">
        <div className="bg-cover py-12 flex rounded-md mt-2 bg-center bg-no-repeat text-white h-[50vh] bg-[url('https://cdn.tuoitrethudo.com.vn/stores/news_dataimages/2022/112022/24/15/nhung-dau-an-hp-320221124153448.jpg?rt=20221124153642')]">
          <div className="w-1/4">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTSHHIp_HJ8NpKbzLv_CRPR1uIjXlRVGKLhQ&usqp=CAU
            "
              alt=""
              className="w-40 h-40 mx-auto rounded-full"
            />
          </div>
          <div className="w-1/3 px-4 text-start space-y-4">
            <div className="flex items-center space-x-4 pl-0.5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>
              <h3 className="uppercase font-semibold text-xl">
                {shopInfo.displayName}
              </h3>
            </div>

            <button
              className="flex items-center gap-2 pl-0.5 pr-4 py-2 bg-primary rounded hover:bg-green-700"
              onClick={() => {
                if (!currentUser) {
                  return navigate("/login");
                }
                setShowChat(true);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 inline"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z"
                />
              </svg>
              <span>Nhắn tin cho Shop </span>
            </button>
            <div className="space-x-4 pl-0.5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 inline"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                />
              </svg>

              <span>Địa chỉ:</span>
              <span className="text-orange-300 font-semibold">
                {shopInfo.address}
              </span>
            </div>
          </div>
          <div className="w-1/3 px-4">
            <ul className="space-y-4">
              <li className="space-x-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 inline"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
                  />
                </svg>
                <span>Sản phẩm:</span>
                <span className="text-orange-300 font-semibold">
                  {data.length}
                </span>
              </li>
              <li className="space-x-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 inline"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                  />
                </svg>

                <span>Số người theo dõi:</span>
                <span className="text-orange-300 font-semibold">300</span>
              </li>
              <li className="space-x-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 inline"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
                  />
                </svg>
                <span>Tỷ lệ phản hồi:</span>
                <span className="text-orange-300 font-semibold">99%</span>
              </li>
              <li className="space-x-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 inline"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                  />
                </svg>

                <span>Ngày tham gia: </span>
                <span className="text-orange-300 font-semibold">
                  {new Date(shopInfo.createdAt).toLocaleDateString()}
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex md:flex-1 w-full justify-start md:justify-center relative mx-auto mt-2">
          <input
            type="text"
            placeholder="Tìm kiếm sản phẩm của shop..."
            className="p-2 border border-gray-300 rounded-md focus:outline-none w-full"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 absolute right-3 top-2 text-gray-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </div>
        {search(data).length > 0 ? (
          <div className="gap-2 mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 justify-center grid-rows-2 py-2 w-full">
            {search(data).map((p, i) => {
              return <ItemCard data={p} key={i} />;
            })}
          </div>
        ) : (
          <div className="p-2 text-center text-gray-700">
            Không có dữ liệu phù hợp
          </div>
        )}
        {showChat && (
          <Chat onClose={setShowChat} shop={shopId} me={currentUser} />
        )}
        <ToastContainer />
      </div>
      <Footer />
    </div>
  );
};

export default Shop;
