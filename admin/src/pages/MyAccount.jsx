import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../ultis/firebase";

const MyAccount = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { token } = currentUser;
  const [editName, setEditName] = useState(false);
  const [editPhone, setEditPhone] = useState(false);
  const [editEmail, setEditEmail] = useState(false);
  const [editAddress, setEditAddress] = useState(false);
  const [editPassword, setEditPassword] = useState(false);
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState("");
  const [check, setCheck] = useState(false);
  const [inputs, setInputs] = useState({});
  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  useEffect(() => {
    // const uploadFile = async () => {
    //   const name = new Date().getTime() + currentUser._id + "_" + file.name;
    //   const storageRef = ref(
    //     storage,
    //     `images/users/${currentUser._id}/${name}`
    //   );
    //   const uploadTask = uploadBytesResumable(storageRef, file);
    //   uploadTask.on(
    //     "state_changed",
    //     (snapshot) => {},
    //     (error) => {},
    //     () => {
    //       getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
    //         setUrl((prev) => [...prev, downloadURL]);
    //       });
    //     }
    //   );
    // };
    // file && uploadFile();
  }, [file]);
  return (
    <div className="w-full px-2">
      <div className="w-full bg-white rounded flex overflow-hidden">
        <div className="w-1/3 py-12 px-2 flex flex-col items-center">
          <div className="w-32 h-32 rounded-full relative border-2 border-primary">
            <img
              src={file ? URL.createObjectURL(file) : currentUser?.img}
              alt=""
              className="w-full h-full object-cover object-center rounded-full"
            />
            <button
              className="rounded-full bg-primary text-white p-2 absolute bottom-1 right-1 z-10 border-2 border-white hover:border-primary hover:text-primary hover:bg-white"
              onClick={() => {
                document.getElementById("myInput").click();
              }}
            >
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
                  d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"
                />
              </svg>
            </button>
          </div>

          <div className="font-semibold">#{currentUser.username}</div>
          <div className="px-2 py-0.5 bg-orange-300 text-orange-700 rounded-md">
            {currentUser.role}
          </div>
          <input
            type="file"
            id="myInput"
            hidden
            onChange={(e) => setFile(e.target.files[0])}
            accept="image/*"
          />
          <button
            type="submit"
            className={`w-full rounded ${
              check ? "bg-primary hover:bg-green-700" : "bg-slate-400"
            } px-5 py-3 text-center text-sm font-medium text-white mt-12`}
            onClick={() => console.log("change")}
            disabled={!check}
          >
            Cập nhật thông tin
          </button>
        </div>
        <div className="w-2/3 gap-2 p-2 flex flex-col items-center justify-center">
          <h3 className="uppercase font-bold w-full">Thông tin cơ bản</h3>
          <div className="w-full">
            <label htmlFor="displayName" className="">
              Tên hiển thị
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                name="displayName"
                className={`w-3/4 rounded border ${
                  editName ? "bg-gray-200" : ""
                }
                } border-gray-300 bg-gray-50 px-3 py-2 text-gray-900 focus:border-primary focus:outline-none focus:ring-primary-600 sm:text-sm`}
                placeholder="JackForez"
                required="a-z"
                disabled={editName}
              />
              <button
                onClick={() => {
                  setEditName(!editName);
                }}
                className="px-2.5 bg-white rounded border border-orange-400 text-orange-400 hover:border-orange-400 hover:bg-orange-400 hover:text-white"
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
              </button>
            </div>
          </div>
          <div className="w-full">
            <label htmlFor="phone" className="">
              Số điện thoại
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                name="phone"
                className={`w-3/4 rounded border ${
                  editPhone ? "bg-gray-200" : ""
                }
                } border-gray-300 bg-gray-50 px-3 py-2 text-gray-900 focus:border-primary focus:outline-none focus:ring-primary-600 sm:text-sm`}
                placeholder={currentUser.phone}
                required="a-z"
                disabled={editPhone}
              />
              <button
                onClick={() => {
                  setEditPhone(!editPhone);
                }}
                className="px-2.5 bg-white rounded border border-orange-400 text-orange-400 hover:border-orange-400 hover:bg-orange-400 hover:text-white"
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
              </button>
            </div>
          </div>
          <div className="w-full">
            <label htmlFor="email" className="">
              Email{" "}
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                name="email"
                className={`w-3/4 rounded border ${
                  editEmail ? "bg-gray-200" : ""
                }
                } border-gray-300 bg-gray-50 px-3 py-2 text-gray-900 focus:border-primary focus:outline-none focus:ring-primary-600 sm:text-sm`}
                placeholder={currentUser.email || "user@sale168.com"}
                required="a-z"
                disabled={editEmail}
              />
              <button
                onClick={() => setEditEmail(!editEmail)}
                className="px-2.5 bg-white rounded border border-orange-400 text-orange-400 hover:border-orange-400 hover:bg-orange-400 hover:text-white"
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
              </button>
            </div>
          </div>
          <div className="w-full">
            <label htmlFor="address" className="">
              Địa chỉ
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                name="address"
                className={`w-3/4 rounded border ${
                  editAddress ? "bg-gray-200" : ""
                } border-gray-300 px-3 py-2 text-gray-900 focus:border-primary focus:outline-none focus:ring-primary-600 sm:text-sm`}
                placeholder={currentUser.address || "766 Nguyễn Văn Linh"}
                required="a-z"
                disabled={editAddress}
              />
              <button
                onClick={() => setEditAddress(!editAddress)}
                className="px-2.5 bg-white rounded border border-orange-400 text-orange-400 hover:border-orange-400 hover:bg-orange-400 hover:text-white"
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
              </button>
            </div>
          </div>
          {!editAddress && (
            <div className="w-full justify-start flex">
              <div className="w-1/4 flex flex-col pr-1">
                <label htmlFor="">Tỉnh/Thành</label>
                <select
                  id="districts"
                  class="block w-full rounded border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 focus:border-primary focus:ring-primary"
                  // onChange={(e) => setDistrictCode(e.target.value)}
                >
                  <option selected>Quận/Huyện</option>
                  {/* {districts.map((i) => {
                  return (
                    <option value={i.code} key={i.code}>
                      {i.name_with_type}
                    </option>
                  );
                })} */}
                </select>
              </div>
              <div className="w-1/4 flex flex-col pr-1">
                <label htmlFor="">Quận/Huyện</label>
                <select
                  id="districts"
                  class="block w-full rounded border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 focus:border-primary focus:ring-primary"
                  // onChange={(e) => setDistrictCode(e.target.value)}
                >
                  <option selected>Quận/Huyện</option>
                  {/* {districts.map((i) => {
                  return (
                    <option value={i.code} key={i.code}>
                      {i.name_with_type}
                    </option>
                  );
                })} */}
                </select>
              </div>
              <div className="w-1/4 flex flex-col">
                <label htmlFor="">Phường/Xã</label>
                <select
                  id="districts"
                  class="block w-full rounded border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 focus:border-primary focus:ring-primary"
                  // onChange={(e) => setDistrictCode(e.target.value)}
                >
                  <option selected>Quận/Huyện</option>
                  {/* {districts.map((i) => {
                  return (
                    <option value={i.code} key={i.code}>
                      {i.name_with_type}
                    </option>
                  );
                })} */}
                </select>
              </div>
            </div>
          )}
          <h3 className="uppercase font-bold w-full mt-5">Bảo mật</h3>
          <div className="w-full">
            <label htmlFor="password" className="">
              {editPassword ? "Mật khẩu cũ" : "Mật khẩu"}
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                name="password"
                className={`w-3/4 rounded border ${
                  !editPassword ? "bg-gray-200" : ""
                } border-gray-300 px-3 py-2 text-gray-900 focus:border-primary focus:outline-none focus:ring-primary-600 sm:text-sm`}
                placeholder="*********"
                required="a-z"
                disabled={!editPassword}
              />
              <button
                onClick={() => setEditPassword(!editPassword)}
                className="px-2.5 bg-white rounded border border-orange-400 text-orange-400 hover:border-orange-400 hover:bg-orange-400 hover:text-white"
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
              </button>
            </div>
          </div>
          {editPassword && (
            <div className="w-full">
              <div className="w-full">
                <label htmlFor="" className="">
                  Mật khẩu mới
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    name="name"
                    className="w-3/4 rounded border border-gray-300 px-3 py-2 text-gray-900 focus:border-primary focus:outline-none focus:ring-primary-600 sm:text-sm"
                    placeholder="*********"
                    required="a-z"
                  />
                </div>
              </div>
              <div className="w-full">
                <label htmlFor="" className="">
                  Xác nhận mật khẩu mới
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    name="name"
                    className="w-3/4 rounded border border-gray-300 px-3 py-2 text-gray-900 focus:border-primary focus:outline-none focus:ring-primary-600 sm:text-sm"
                    placeholder="*********"
                    required="a-z"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
