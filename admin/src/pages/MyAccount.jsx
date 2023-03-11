import React from "react";
import { useSelector } from "react-redux";

const MyAccount = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { token } = currentUser;
  return (
    <div className="w-full px-2">
      <div className="w-full bg-white rounded flex overflow-hidden">
        <div className="w-1/3 py-12 px-2 flex flex-col items-center">
          <div className="w-32 h-32 rounded-full relative">
            <img
              src={currentUser.img}
              alt=""
              className="w-full h-full object-cover object-center rounded-full"
            />
            <button className="rounded-full bg-primary text-white p-2 absolute bottom-1 right-1 z-10 border-2 border-white hover:border-primary hover:text-primary hover:bg-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-3 h-3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                />
              </svg>
            </button>
          </div>

          <div>#{currentUser.username}</div>
          <div>{currentUser.role}</div>
        </div>
        <div className="w-2/3 gap-2 p-2 flex flex-col items-center justify-center">
          <h3 className="uppercase font-bold w-full">Thông tin cơ bản</h3>
          <div className="w-full">
            <label htmlFor="" className="">
              Tên hiển thị
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                name="name"
                className="w-3/4 rounded border border-gray-300 bg-gray-50 px-3 py-2 text-gray-900 focus:border-primary focus:outline-none focus:ring-primary-600 sm:text-sm"
                placeholder="JackForez"
                required="a-z"
                disabled={true}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <button className="px-2.5 bg-white rounded border border-orange-400 text-orange-400 hover:border-orange-400 hover:bg-orange-400 hover:text-white">
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
            </div>
          </div>
          <div className="w-full">
            <label htmlFor="" className="">
              Số điện thoại
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                name="name"
                className="w-3/4 rounded border border-gray-300 bg-gray-50 px-3 py-2 text-gray-900 focus:border-primary focus:outline-none focus:ring-primary-600 sm:text-sm"
                placeholder={currentUser.phone}
                required="a-z"
                disabled={true}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <button className="px-2.5 bg-white rounded border border-orange-400 text-orange-400 hover:border-orange-400 hover:bg-orange-400 hover:text-white">
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
            </div>
          </div>
          <div className="w-full">
            <label htmlFor="" className="">
              Email{" "}
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                name="name"
                className="w-3/4 rounded border border-gray-300 bg-gray-50 px-3 py-2 text-gray-900 focus:border-primary focus:outline-none focus:ring-primary-600 sm:text-sm"
                placeholder={currentUser.email || "user@sale168.com"}
                required="a-z"
                disabled={true}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <button className="px-2.5 bg-white rounded border border-orange-400 text-orange-400 hover:border-orange-400 hover:bg-orange-400 hover:text-white">
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
            </div>
          </div>
          <div className="w-full">
            <label htmlFor="" className="">
              Địa chỉ
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                name="name"
                className="w-3/4 rounded border border-gray-300 bg-gray-50 px-3 py-2 text-gray-900 focus:border-primary focus:outline-none focus:ring-primary-600 sm:text-sm"
                placeholder={currentUser.address || "766 Nguyễn Văn Linh"}
                required="a-z"
                disabled={true}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <button className="px-2.5 bg-white rounded border border-orange-400 text-orange-400 hover:border-orange-400 hover:bg-orange-400 hover:text-white">
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
            </div>
          </div>
          <h3 className="uppercase font-bold w-full mt-5">Bảo mật</h3>
          <div className="w-full">
            <label htmlFor="" className="">
              Mật khẩu
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                name="name"
                className="w-3/4 rounded border border-gray-300 bg-gray-50 px-3 py-2 text-gray-900 focus:border-primary focus:outline-none focus:ring-primary-600 sm:text-sm"
                placeholder="***************"
                required="a-z"
                disabled={true}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <button className="px-2.5 bg-white rounded border border-orange-400 text-orange-400 hover:border-orange-400 hover:bg-orange-400 hover:text-white">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
