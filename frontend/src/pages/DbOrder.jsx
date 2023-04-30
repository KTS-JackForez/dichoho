import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { vnd } from "../../../admin/ultis/ktsFunc";
import ktsRequest from "../../ultis/ktsrequest";
import { Modal, OrderCard } from "../components";
import { status } from "../../ultis/config";

const DbOrder = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { token } = currentUser;
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [orderDetails, setOrderDetails] = useState({});
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
  const search = (data) => {
    return data.filter((item) =>
      item.products.some((product) =>
        product.productName.toLowerCase().includes(query)
      )
    );
  };
  return (
    <div className="p-3 text-xs md:text-base">
      <div className="flex justify-between">
        <div className="flex w-full md:w-1/2 relative">
          <input
            type="text"
            name="name"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-gray-900 focus:border-primary focus:outline-none focus:ring-primary-600 sm:text-sm"
            placeholder="Tìm kiếm tên sản phẩm"
            required="a-z"
            onChange={(e) => {
              {
                setQuery(e.target.value);
              }
            }}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6 absolute right-2 top-1.5 text-gray-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </div>
      </div>
      <div className="w-full mt-4 rounded  bg-white shadow-lg overflow-hidden">
        <div className="hidden md:flex p-3 font-semibold items-center bg-primary text-white">
          <div className="w-2/12">Đơn hàng</div>
          <div className="w-5/12">Chi tiết</div>
          <div className="w-2/12 text-center">Thành tiền</div>
          <div className="w-2/12 text-center">Trạng thái</div>
          <div className="w-1/12">Thao tác</div>
        </div>
        {data?.length > 0 ? (
          <div className="divide-y divide-dashed divide-primary">
            {search(data).length > 0 ? (
              search(data).map((o, i) => {
                return (
                  <OrderCard
                    data={o}
                    key={i}
                    openmodal={setOpenModal}
                    token={token}
                    details={setOrderDetails}
                  />
                );
              })
            ) : (
              <div className="py-4 text-center rounded-b-md">
                Không có dữ liệu phù hợp
              </div>
            )}
          </div>
        ) : (
          <div className="py-4 text-center">Bạn chưa có đơn hàng nào</div>
        )}
      </div>
      {openModal && <Modal close={setOpenModal} data={orderDetails} />}
    </div>
  );
};

export default DbOrder;
