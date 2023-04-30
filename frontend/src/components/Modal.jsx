import React from "react";

const Modal = ({ data, close }) => {
  return (
    <div className="h-screen w-screen absolute top-0 left-0 bg-black/50 z-50 flex items-center">
      <div className="bg-white w-1/2 h-1/2 mx-auto rounded overflow-hidden">
        <div className="bg-primary text-white">
          <div className="flex justify-between items-center">
            <h3 className="pl-2">Chi tiết đơn hàng</h3>
            <button
              className="px-4 py-2 bg-red-500 hover:bg-red-700"
              onClick={() => close(false)}
            >
              x
            </button>
          </div>
        </div>
        <div>
          <div>Tên người nhận hàng: {data.buyerName}</div>
          <div>Số điện thoại nhận hàng: {data.buyerPhone} </div>
          <div>Dịa chỉ nhận hàng: {data.buyerAddress}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
