import React, { useEffect, useState } from "react";
import ktsRequest from "../../ultis/ktsrequest";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { vnd } from "../../ultis/ktsFunc";
const DbHome = () => {
  const [postData, setPostData] = useState([]);
  const [orderData, setOrderData] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  const { token } = currentUser;
  const status = [
    {
      id: 0,
      bgColor: "bg-blue-300",
      name: "Đơn mới",
      textColor: "text-blue-700",
    },
    {
      id: 1,
      bgColor: "bg-orange-300",
      name: "Đang giao",
      textColor: "text-orange-700",
    },
    {
      id: 2,
      bgColor: "bg-green-300",
      name: "Giao xong",
      textColor: "text-green-700",
    },
    { id: 3, bgColor: "bg-red-300", name: "Đã hủy", textColor: "text-red-700" },
  ];
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res1 = await ktsRequest.get("/posts");
        const res = await ktsRequest.get("/orders", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        setPostData(res1.data.slice(0.5));
        setOrderData(res.data.slice(0, 5));
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="w-full p-2 space-y-3">
      <div className="flex justify-between px-4 py-3 bg-orange-300 rounded-md">
        <h3 className="uppercase font-bold">Đơn hàng gần nhất</h3>
        <Link
          to="/dashboard/don-hang"
          className="hover:text-primary hover:italic"
        >
          Xem tất cả đơn hàng
        </Link>
      </div>
      <div className="w-full mt-4 rounded bg-white shadow-lg overflow-hidden">
        <div className="hidden md:flex p-3 font-semibold items-center bg-primary text-white">
          <div className="w-2/12">Đơn hàng</div>
          <div className="w-2/12">Ngày</div>
          <div className="w-3/12">Chi tiết</div>
          <div className="w-2/12 text-center">Thành tiền</div>
          <div className="w-2/12 text-center">Trạng thái</div>
          <div className="w-1/12">Thao tác</div>
        </div>
        {orderData?.length > 0 ? (
          <div className="rounded divide-y divide-primary divide-dashed text-gray-800">
            {orderData.map((o, i) => {
              const st = o.status;
              const orderDate = new Date(o.createdAt);
              return (
                <div>
                  <div
                    className="hidden w-full md:flex p-1 gap-1 items-center"
                    key={i}
                  >
                    <div className="w-2/12 inline-block">{o.orderNumber}</div>
                    <div className="w-2/12">
                      {orderDate.toLocaleDateString() +
                        "-" +
                        orderDate.toLocaleTimeString()}
                    </div>
                    <div className="w-3/12">
                      <ul className="space-y-1">
                        {o.products.map((p, j) => {
                          return (
                            <li key={j} className="">
                              <div className="flex gap-2">
                                <div>
                                  <img
                                    src={p.img}
                                    alt=""
                                    className="w-12 h-12 rounded object-cover object-center"
                                  />
                                </div>
                                <div className="text-xs">
                                  <span className="font-semibold">
                                    {p.productName}
                                  </span>
                                  <div className="">
                                    <span>{vnd(p.currentPrice) + " * "}</span>
                                    <span>{p.quantity + " = "}</span>
                                    <span>
                                      {vnd(p.quantity * p.currentPrice)}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                    <div className="w-2/12 font-semibold text-end pr-10">
                      {vnd(o?.total)}
                    </div>
                    <div className="w-2/12 text-center">
                      <span
                        className={`${status[st].bgColor} ${status[st].textColor} px-1.5 py-0.5 font-semibold rounded`}
                      >
                        {status[st].name}
                      </span>
                    </div>
                    <span
                      className={`${st.bgColor} ${st.textColor} px-2 py-1 font-semibold rounded`}
                    ></span>
                    <div className="w-1/12 flex gap-2">
                      <button
                        className={`p-1.5  rounded border ${
                          st > 1
                            ? "bg-gray-300 border-gray-300"
                            : "bg-white border-orange-400 text-orange-400 hover:border-orange-400 hover:bg-orange-400 hover:text-white"
                        }`}
                        disabled={st > 1}
                        title="chi tiết đơn hàng"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-4 h-4"
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
                      </button>
                      <button
                        className={`p-1.5 rounded border ${
                          st > 1
                            ? "bg-gray-300 border-gray-300"
                            : "bg-white border-red-600 text-red-600 hover:border-red-600 hover:bg-red-600 hover:text-white"
                        }`}
                        disabled={st > 1}
                        title="hủy đơn"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-4 h-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="md:hidden p-2">
                    <div className="space-x-2">
                      <span>{o.orderNumber}</span>
                      <span>
                        {" "}
                        {orderDate.toLocaleDateString() +
                          "-" +
                          orderDate.toLocaleTimeString()}
                      </span>
                      <span className="font-semibold">{vnd(o.total)}</span>
                      <span
                        className={`${status[st].bgColor} ${status[st].textColor} px-1.5 py-0.5 font-semibold rounded`}
                      >
                        {status[st].name}
                      </span>
                    </div>
                    <div className="mt-3">
                      <div className="font-semibold">Chi tiết</div>
                      {o.products.map((p, j) => {
                        return (
                          <div key={j}>
                            <span>{p.productName + "*" + p.quantity}</span>
                          </div>
                        );
                      })}
                    </div>
                    <div className="flex gap-2 justify-end">
                      <button
                        className={`p-1.5  rounded border ${
                          st > 1
                            ? "bg-gray-300 border-gray-300"
                            : "bg-white border-orange-400 text-orange-400 hover:border-orange-400 hover:bg-orange-400 hover:text-white"
                        }`}
                        disabled={st > 1}
                        title="sửa đơn hàng"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-2 h-2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                          />
                        </svg>
                      </button>
                      <button
                        className={`p-1.5 rounded border ${
                          st > 1
                            ? "bg-gray-300 border-gray-300"
                            : "bg-white border-red-600 text-red-600 hover:border-red-600 hover:bg-red-600 hover:text-white"
                        }`}
                        disabled={st > 1}
                        title="hủy đơn hàng"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-2 h-2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-2 text-center text-gray-700">Không có dữ liệu</div>
        )}
      </div>
      <div className="flex justify-between px-4 py-3 bg-orange-300 rounded-md">
        <h3 className="uppercase font-bold"> Tin tức mới nhất</h3>
        <Link to="/news" className="hover:text-primary hover:italic">
          Xem tất cả tin tức
        </Link>
      </div>
      <div className="bg-white">
        <ul className="divide-y divide-primary divide-dashed">
          {postData?.map((n, i) => {
            const postDate = new Date(n.createdAt);
            return (
              <li key={i} className="p-2">
                <Link
                  to={`/news/${n._id}`}
                  className={`hover:text-red-500 hover:italic text-gray-800`}
                >
                  <span className="mr-2">{postDate.toLocaleDateString()}</span>
                  <span className="mr-2">{postDate.toLocaleTimeString()}</span>
                  <span>{n.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default DbHome;
