import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
const NewProduct = () => {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState();
  const [preview, setPreview] = useState();
  return (
    <div className="p-3">
      <h3>thêm mới sản phẩm</h3>
      <div>
        <div className="space-y-4 md:space-y-6" action="#">
          <div className="flex w-full items-center">
            <label htmlFor="" className="w-1/3">
              Tên sản phẩm
            </label>
            <input
              type="text"
              name="name"
              className="block w-full rounded border border-gray-300 bg-gray-50 p-2 text-gray-900 focus:border-primary focus:outline-none focus:ring-primary-600 sm:text-sm"
              placeholder="Tên sản phẩm"
              required="a-z"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div className="flex w-full items-center">
            <label htmlFor="" className="w-1/3">
              Mô tả sản phẩm
            </label>
            <input
              type="text"
              name="name"
              className="block w-full rounded border border-gray-300 bg-gray-50 p-2 text-gray-900 focus:border-primary focus:outline-none focus:ring-primary-600 sm:text-sm"
              placeholder="Mô tả sản phẩm"
              required="a-z"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div className="flex w-full items-center">
            <label htmlFor="" className="w-1/3">
              Danh mục
            </label>
            <input
              type="text"
              name="name"
              className="block w-full rounded border border-gray-300 bg-gray-50 p-2 text-gray-900 focus:border-primary focus:outline-none focus:ring-primary-600 sm:text-sm"
              placeholder="Phân cách nhau bởi dấu ; "
              required="a-z"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div className="flex w-full items-center gap-3">
            <div className="w-1/2 flex items-center">
              <label htmlFor="" className="w-1/3">
                Giá niêm yết
              </label>
              <input
                type="text"
                name="name"
                className="block w-2/3 rounded border border-gray-300 bg-gray-50 p-2 text-gray-900 focus:border-primary focus:outline-none focus:ring-primary-600 sm:text-sm"
                placeholder="Phân cách nhau bởi dấu ; "
                required="a-z"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>
            <div className="w-1/2 flex items-center">
              <label htmlFor="" className="w-1/3">
                Giá niêm yết
              </label>
              <input
                type="text"
                name="name"
                className="block w-2/3 rounded border border-gray-300 bg-gray-50 p-2 text-gray-900 focus:border-primary focus:outline-none focus:ring-primary-600 sm:text-sm"
                placeholder="Phân cách nhau bởi dấu ; "
                required="a-z"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="flex w-full items-center">
            <div className="w-1/3">
              <label htmlFor="">Hình ảnh sản phẩm</label>
            </div>
            <div className="w-2/3 flex items-center gap-2">
              <input
                type="file"
                name="name"
                className="block w-full rounded border border-gray-300 bg-gray-50 p-2 text-gray-900 focus:border-primary focus:outline-none focus:ring-primary-600 sm:text-sm"
                required="a-z"
                onChange={(e) => {
                  setFile(e.target.files[0]);
                }}
              />
              {file && (
                <img src={URL.createObjectURL(file)} alt="" className="w-32" />
              )}
              <button className="p-2 bg-primary rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v12m6-6H6"
                  />
                </svg>
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full rounded bg-primary px-5 py-3 text-center text-sm font-medium text-white hover:bg-green-700 focus:outline-none"
          >
            {loading ? (
              <svg
                class="h-5  w-5 animate-spin text-white mx-auto"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              "Tạo mới"
            )}
          </button>
          <ToastContainer />
          <div className="flex items-center justify-between">
            <Link
              to="/"
              className="text-sm font-medium text-primary hover:underline"
            >
              Trang chủ
            </Link>
            <p className="text-sm font-light text-gray-500">
              Chưa có tài khoản?
              <Link
                to="/register"
                className="ml-2 font-medium text-primary hover:underline"
              >
                Đăng ký
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewProduct;
