import { vnd } from "../../ultis/ktsFunc";
import { status } from "../../ultis/config";
import { toast } from "react-toastify";
import ktsRequest from "../../ultis/ktsrequest";
const OrderCard = ({ data, openmodal, token }) => {
  const st = data.status;
  const orderDate = new Date(data.createdAt);
  console.log(st);
  const handleCancel = async () => {
    try {
      const res = await ktsRequest.put(
        `/orders/cancel/${data?._id}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(res.data);
    } catch (error) {
      toast.error(error.response ? error.response.data : "Network error");
    }
  };
  return (
    <div className="">
      <div className="hidden w-full md:flex p-1 gap-1 items-center">
        <div className="w-3/12 inline-block">
          <div className="font-semibold">{data.orderNumber}</div>
          <div className="">
            {orderDate.toLocaleTimeString() +
              " - " +
              orderDate.toLocaleDateString()}
          </div>
        </div>

        <div className="w-4/12">
          <ul className="space-y-1">
            {data.products.map((p, j) => {
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
                      <span className="font-semibold">{p.productName} - </span>
                      <span className="text-red-500 italic">{p.shopName}</span>
                      <div className="">
                        <span>{vnd(p.currentPrice) + " * "}</span>
                        <span>{p.quantity + " = "}</span>
                        <span>{vnd(p.quantity * p.currentPrice)}</span>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="w-2/12 font-semibold text-end pr-10">
          {vnd(data?.total)}
        </div>
        <div className="w-2/12 text-center text-xs">
          <span
            className={`${status[st].bgColor} ${status[st].textColor} px-1.5 py-0.5 font-semibold rounded`}
          >
            {status[st].name}
          </span>
        </div>
        <div className="w-1/12 flex gap-2">
          <button
            className={`p-1.5  rounded border ${
              st > 1
                ? "bg-gray-300 border-gray-300"
                : "bg-white border-orange-400 text-orange-400 hover:border-orange-400 hover:bg-orange-400 hover:text-white"
            }`}
            disabled={st > 1}
            title="chi tiết đơn hàng"
            onClick={() => {
              toast.success("ok");
              openmodal(true);
            }}
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
            onClick={handleCancel}
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
        <div className="flex justify-between">
          <span className="space-x-2">
            <span>{data.orderNumber}</span>
            <span>
              {" "}
              {orderDate.toLocaleDateString() +
                "-" +
                orderDate.toLocaleTimeString()}
            </span>
            <span className="font-semibold">{vnd(data.total)}</span>
          </span>
          <span
            className={`${status[st].bgColor} ${status[st].textColor} px-1.5 py-0.5 font-semibold rounded`}
          >
            {status[st].name}
          </span>
        </div>
        <div className="mt-3">
          <div className="font-semibold">Chi tiết</div>
          {data.products.map((p, j) => {
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
            title="chi tiết đơn hàng"
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
};

export default OrderCard;
