import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import { ktsSocket } from "../../ultis/config";
import { toast, ToastContainer } from "react-toastify";
import ktsRequest from "../../ultis/ktsrequest";
import { vnd } from "../../ultis/ktsFunc";

const Delivery = () => {
  const [data, setData] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  const { token } = currentUser;
  const [refresh, setRefresh] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [orderId, setOrderId] = useState("");
  const socket = io.connect(ktsSocket);
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
    const socket = io.connect(ktsSocket);
    socket.on("newNoti", () => {
      setRefresh(true);
      toast.success;
    });
  }, []);
  useEffect(() => {
    currentUser &&
      socket.emit("newUser", {
        uid: currentUser._id,
        uname: currentUser.username,
      });
  }, []);
  useEffect(() => {
    setRefresh(false);
    const fetchData = async () => {
      try {
        const res = await ktsRequest.post(
          "/orders/my",
          {},
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setData(res.data);
      } catch (err) {
        err.response
          ? toast.error(err.response.data)
          : toast.error("Network Error!");
      }
    };
    fetchData();
  }, [refresh]);
  const subTotal = (products) => {
    const total = 0;
    return products.reduce(
      (total, i) => total + i.currentPrice * i.quantity,
      total
    );
  };
  const handleClick1 = async (id, newStatus) => {
    try {
      const res = await ktsRequest.put(
        `/orders/${id}`,
        {
          status: newStatus,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(res.data);
      setRefresh(true);
    } catch (err) {
      err.response
        ? toast.error(err.response.data)
        : toast.error("Network Error!");
    }
  };
  return (
    <div className="w-full h-full p-2">
      <div className="w-full bg-white shadow-lg rounded-md overflow-hidden">
        <div className=" flex p-3 font-semibold items-center bg-primary text-white">
          <div className="w-2/12 flex">Đơn hàng</div>
          <div className="w-3/12">Chi tiết đơn hàng</div>
          <div className="w-5/12 flex">
            <div className="w-1/2 text-start">Khách hàng</div>
            <div className="w-1/2 text-start">Shop</div>
          </div>
          <div className="w-2/12">Thao tác</div>
        </div>
        {data?.length > 0 ? (
          <div className="rounded divide-y divide-primary divide-dashed text-gray-800">
            {data.map((o, i) => {
              const st = o.status;
              return (
                <div className="w-full flex p-1 gap-1 items-center" key={i}>
                  <div className="w-2/12">
                    <div>{new Date(o.createdAt).toLocaleString()}</div>
                    <div>{o.orderNumber}</div>
                    <div
                      className={`${status[st].bgColor} ${status[st].textColor} px-1.5 py-0.5 text-xs font-semibold rounded inline`}
                    >
                      {status[st].name}
                    </div>
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
                              <div>
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

                    <div className="text-sm pl-14">
                      <span className="font-semibold">Ghi chú: </span>
                      {o?.note}
                    </div>
                    <span className="pl-14 font-semibold">
                      Tổng thu: {vnd(subTotal(o.products))}
                    </span>
                  </div>
                  <div className="w-5/12 flex">
                    <div className="w-1/2 text-start">
                      <div>{o?.buyerName}</div>
                      <div>{o?.buyerPhone}</div>
                      <div>{o?.buyerPhone}</div>
                    </div>
                    <div className="w-1/2">
                      <div>{o?.buyerName}</div>
                      <div>{o?.buyerPhone}</div>
                      <div>{o?.buyerPhone}</div>
                    </div>
                  </div>
                  <div className="w-2/12 text-xs">
                    <button
                      className="block p-2 hover:bg-primary"
                      onClick={() => handleClick1(o?._id, 2)}
                    >
                      XN giao xong
                    </button>
                    <button
                      className="block p-2 hover:bg-primary"
                      onClick={() =>
                        toast.success(
                          "Chuyển thông tin giao nhận qua 3PL thành công",
                          { onClose: handleClick1(o?._id, 1) }
                        )
                      }
                    >
                      Điều giao nhận
                    </button>
                    <button
                      className="block p-2 hover:bg-primary"
                      onClick={() => handleClick1(o?._id, 3)}
                    >
                      Hủy giao nhận
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-2 text-center text-gray-700">Không có dữ liệu</div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Delivery;
