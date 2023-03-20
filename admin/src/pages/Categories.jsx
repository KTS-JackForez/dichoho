import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ktsRequest from "../../ultis/ktsrequest";
import { vnd } from "../../ultis/ktsFunc";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import Modal from "../components/Modal";

const Categories = () => {
  const [data, setData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openNew, setOpenNew] = useState(false);
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState({});
  const { currentUser } = useSelector((state) => state.user);
  const { token } = currentUser;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await ktsRequest.get("/categories");
        setData(res.data);
      } catch (error) {
        toast.error(
          `${error.respronse ? error.respronse.data : "Network error!"}`
        );
      }
    };
    fetchData();
  }, []);
  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleClick = (e) => {
    setOpenNew(!openNew);
  };
  const handleNew = async () => {
    console.log("click");
    try {
      const res = await ktsRequest.post(
        "/categories",
        {
          ...inputs,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setData(res.data);
    } catch (error) {
      toast.error(
        `${error.respronse ? error.respronse.data : "Network error!"}`
      );
    }
  };
  return (
    <div className="w-full p-2 text-xs md:text-base space-y-3 ">
      <div className="">
        {/* <Link
          to="new"
          className="py-2 px-4 hover:bg-primary rounded font-bold border border-primary text-primary bg-white hover:text-white"
        >
          Tạo mới danh mục
        </Link> */}
        {!openNew && (
          <button
            className="bg-white float-right mb-2 rounded flex items-center gap-2 p-2.5 text-primary border border-primary uppercase font-bold hover:bg-primary hover:text-white"
            onClick={() => setOpenNew(!openNew)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>

            <span className="hidden md:inline">tạo mới danh mục</span>
          </button>
        )}
        {openNew && (
          <div className="bg-white p-3 rounded-md text-gray-800 font-semibold shadow-md">
            <div className="flex gap-2">
              <div className="flex w-full md:w-5/12 items-center justify-between">
                <label
                  htmlFor="code"
                  className="w-1/3 hidden md:block text-center"
                >
                  Mã DM
                </label>
                <input
                  type="text"
                  className="block w-full rounded border border-gray-300 bg-gray-50 p-2 text-gray-900 focus:border-primary focus:outline-none focus:ring-primary-600 sm:text-sm"
                  placeholder="Mã danh mục"
                  required="a-z"
                  onChange={handleChange}
                  id="code"
                  name="code"
                />
              </div>

              <div className="flex w-full md:w-5/12 items-center justify-between">
                <label
                  htmlFor="name"
                  className="w-1/3 hidden md:block text-center"
                >
                  Tên DM
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="block w-full rounded border border-gray-300 bg-gray-50 p-2 text-gray-900 focus:border-primary focus:outline-none focus:ring-primary-600 sm:text-sm"
                  placeholder="Tên danh mục"
                  required="a-z"
                  onChange={handleChange}
                />
              </div>
              <div className="flex w-full md:w-2/12 justify-center gap-3">
                <button
                  className="px-3 rounded bg-primary hover:bg-green-700"
                  onClick={handleNew}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 64 64"
                    stroke="white"
                    strokeWidth={1.5}
                    className="h-5 w-5"
                  >
                    <g>
                      <path d="M35.267 6.041h-8v10h8v-10zm-1.897 8.102h-4.205V7.94h4.205v6.204zM41 47.041H21a1 1 0 100 2h20a1 1 0 100-2zM41 39.041H21a1 1 0 100 2h20a1 1 0 100-2z"></path>
                      <path d="M12 56.041h38v-26H12v26zm2-24h34v22H14v-22z"></path>
                      <path d="M49.381.041L49.361 0H7a4 4 0 00-4 4v56a4 4 0 004 4h50a4 4 0 004-4V11.696L49.381.041zm-9.42 2.04V20H14.038V2.082H39.96zM59 60c0 1.103-.897 2-2 2H7c-1.103 0-2-.897-2-2V4c0-1.103.897-2 2-2h5v20.041h30V2h6.51L59 12.523V60z"></path>
                    </g>
                  </svg>
                </button>
                <button
                  className="px-3 rounded bg-red-500 hover:bg-red-700"
                  onClick={handleClick}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="white"
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
          </div>
        )}
      </div>
      <div className="w-full mt-4 rounded-md overflow-hidden bg-white shadow-lg">
        <div className=" flex p-3 font-semibold items-center bg-primary text-white">
          <div className="w-2/12 text-center">Mã danh mục</div>
          <div className="w-5/12">Tên danh mục</div>
          <div className="w-2/12">Ngày tạo</div>
          <div className="w-2/12">Trạng thái</div>
          <div className="w-1/12">Thao tác</div>
        </div>
        {data.length > 0 ? (
          <div className="divide-y divide-primary divide-dashed">
            {data.map((c, i) => {
              return (
                <div className="w-full flex p-1 gap-1 items-center " key={i}>
                  <div className="w-2/12">{c?.code}</div>
                  <div className="w-5/12">{c?.name}</div>
                  <div className="w-2/12">
                    {new Date(c?.createdAt).toLocaleString()}
                  </div>
                  <div className="w-2/12">
                    <div
                      className={`w-12 h-6 bg-${
                        c?.active ? "primary" : "slate-400"
                      } rounded-full relative`}
                    >
                      <button
                        onClick={() => handleClick(p)}
                        className={`w-5 h-5 bg-white  rounded-full ${
                          c?.active ? "right-1" : "left-1"
                        }
                        } duration-400 transition-transform top-0.5 absolute`}
                      ></button>
                    </div>
                  </div>
                  <div className="w-1/12 flex gap-2">
                    <Link
                      to={`#`}
                      className="p-1.5 bg-white rounded border border-orange-400 text-orange-400 hover:border-orange-400 hover:bg-orange-400 hover:text-white"
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
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                        />
                      </svg>
                    </Link>
                    <button className="p-1.5 bg-white rounded border border-red-600 text-red-600 hover:border-red-600 hover:bg-red-600 hover:text-white">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4"
                        onClick={() => {
                          setDelProd(c);
                          setOpenModal(true);
                        }}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </button>
                    {openModal && (
                      <Modal
                        title="cảnh báo"
                        message={`Bạn chắc chắn muốn xóa sản phẩm "${delProd?.productName}"?`}
                        to={`/products/`}
                        close={setOpenModal}
                        token={token}
                        data={delProd}
                        editedData={{ active: false }}
                        refreshData={setRefresh}
                      />
                    )}
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

export default Categories;
