import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ktsRequest from "../../ultis/ktsrequest";
import { vnd } from "../../ultis/ktsFunc";
const Products = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await ktsRequest.get("/products");
        setData(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-3 text-xs md:text-base">
      <div className="flex justify-end">
        <Link
          to="new"
          className="py-2 px-4 hover:bg-primary rounded font-bold border border-primary text-primary bg-white hover:text-white"
        >
          Tạo mới sản phẩm
        </Link>
      </div>
      <div className="w-full mt-4 border border-dashed border-primary rounded divide-y divide-primary divide-dashed bg-white shadow-lg">
        <div className=" flex p-3 font-semibold items-center bg-primary text-white">
          <div className="w-1/6">Sản phẩm</div>
          <div className="w-2/6">Tên</div>
          <div className="w-1/6">Giá bán</div>
          <div className="w-1/6">Trạng thái</div>
          <div className="w-1/6">Thao tác</div>
        </div>
        {data.map((p, i) => {
          return (
            <div className="w-full flex p-2 gap-1 items-center" key={i}>
              <div className="w-1/6">
                <img
                  src={p?.imgs[0]}
                  alt=""
                  className="w-20 object-contain rounded-md"
                />
              </div>
              <div className="w-2/6">{p?.productName}</div>
              <div className="w-1/6">{vnd(p?.currentPrice)}</div>
              <div className="w-1/6">còn hàng</div>
              <div className="w-1/6 flex gap-2">
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

export default Products;
