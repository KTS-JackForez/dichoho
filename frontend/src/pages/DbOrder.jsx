import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { vnd } from "../../../admin/ultis/ktsFunc";
import ktsRequest from "../../ultis/ktsrequest";
const DbOrder = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { token } = currentUser;
  const [data, setData] = useState([]);
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
        const res = await ktsRequest.get("/orders", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        setData(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);
  // const search = (data) => {
  //   return data.filter((item) =>
  //     keys.some((key) => item[key].toLowerCase().includes(query))
  //   );
  // };
  return (
    <div className="p-3 text-xs md:text-base">
      <div className="flex justify-between">
        <div className="flex">
          <input
            type="text"
            name="name"
            className="block w-full rounded-l-lg border border-gray-300 bg-gray-50 p-2 text-gray-900 focus:border-primary focus:outline-none focus:ring-primary-600 sm:text-sm"
            placeholder="Tìm kiếm tên sản phẩm"
            required="a-z"
            onChange={(e) => {
              setQuery(e.target.value);
            }}
          />
          <button className="border-primary border rounded-r-lg p-2 text-gray-900 focus:border-primary focus:outline-none focus:ring-primary sm:text-sm hover:bg-primary hover:text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="w-full mt-4 border border-dashed border-primary rounded divide-y divide-primary divide-dashed bg-white shadow-lg">
        <div className=" flex p-3 font-semibold items-center bg-primary text-white">
          <div className="w-3/12">Đơn hàng</div>
          <div className="w-4/12">Chi tiết</div>
          <div className="w-2/12">Thành tiền</div>
          <div className="w-2/12">Trạng thái</div>
          <div className="w-1/12">Thao tác</div>
        </div>
        {data.map((o, i) => {
          const st = o.status;
          console.log(o);
          return (
            <div className="w-full flex p-1 gap-1 items-center" key={i}>
              <div className="w-3/12">{o.orderNumber}</div>
              <div className="w-4/12">
                {o.products.map((p, j) => {
                  return (
                    <div key={j}>
                      <span>{p.productName + "*" + p.quantity}</span>
                    </div>
                  );
                })}
              </div>
              <div className="w-2/12 font-semibold text-end pr-10">
                {vnd(o?.total)}
              </div>
              <div className="w-2/12 text-center">
                <span
                  className={`${status[st].bgColor} ${status[st].textColor} px-2 py-1 font-semibold rounded`}
                >
                  {status[st].name}
                </span>
              </div>
              <span
                className={`${st.bgColor} ${st.textColor} px-2 py-1 font-semibold rounded`}
              ></span>
              <div className="w-1/12 flex gap-2">
                <button className="p-1.5 bg-white rounded border border-orange-400 text-orange-400 hover:border-orange-400 hover:bg-orange-400 hover:text-white">
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
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                    />
                  </svg>
                </button>
                <button className="p-1.5 bg-white rounded border border-red-600 text-red-600 hover:border-red-600 hover:bg-red-600 hover:text-white">
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
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DbOrder;
