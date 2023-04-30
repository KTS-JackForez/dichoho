import React, { useEffect, useState } from "react";
import ktsRequest from "../../ultis/ktsrequest";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Modal, OrderCard } from "../components";
const DbHome = () => {
  const [postData, setPostData] = useState([]);
  const [orderData, setOrderData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [orderDetails, setOrderDetails] = useState({});
  const { currentUser } = useSelector((state) => state.user);
  const { token } = currentUser;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res1 = await ktsRequest.get("/posts");
        const res = await ktsRequest.get("/orders?limit=5", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        setPostData(res1.data.slice(0.5));
        setOrderData(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="w-full p-2">
      {openModal && <Modal close={setOpenModal} data={orderDetails} />}
      <div className="flex justify-between px-4 py-3 bg-orange-300 rounded-md">
        <h3 className="uppercase font-bold">Đơn hàng gần nhất</h3>
        <Link
          to="/dashboard/don-hang"
          className="hover:text-primary hover:italic"
        >
          Xem tất cả đơn hàng
        </Link>
      </div>
      <div className="w-full mt-3 rounded bg-white shadow-lg overflow-hidden">
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
              return (
                <OrderCard
                  data={o}
                  key={i}
                  openmodal={setOpenModal}
                  token={token}
                />
              );
            })}
          </div>
        ) : (
          <div className="p-2 text-center text-gray-700">Không có dữ liệu</div>
        )}
      </div>
      <div className="flex justify-between px-4 py-3 bg-orange-300 rounded-md mt-3">
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
