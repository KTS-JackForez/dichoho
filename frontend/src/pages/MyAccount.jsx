import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../ultis/firebase";

const MyAccount = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { token } = currentUser;
  const [displayName, setDisplayName] = useState(currentUser.displayName);
  const [phone, setPhone] = useState(currentUser.phone);
  const [email, setEmail] = useState(currentUser.email);

  const [editName, setEditName] = useState(false);
  const [editPhone, setEditPhone] = useState(false);
  const [editEmail, setEditEmail] = useState(false);
  const [editAddress, setEditAddress] = useState(false);
  const [editPassword, setEditPassword] = useState(false);
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState("");
  const [check, setCheck] = useState(false);
  const [inputs, setInputs] = useState({});
  // const handleChange = (e) => {
  //   setCheck(true);
  //   setInputs((prev) => {
  //     return { ...prev, [e.target.name]: e.target.value };
  //   });
  // };
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
      <div className="w-full bg-white rounded flex overflow-hidden h-[calc(100vh-100px)]">
        <div className="w-1/4 py-12 px-2 flex flex-col items-center">
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
        </div>
        <div className="w-3/4 gap-2 p-2 flex">
          <div className="w-1/2 space-y-3">
            <h3 className="uppercase font-bold w-full">Thông tin cơ bản</h3>
            <div className="w-full">
              <label htmlFor="displayName" className="">
                Tên hiển thị
              </label>
              <div className="flex gap-2">
                <div className="w-3/4 relative">
                  <input
                    type="text"
                    name="displayName"
                    className={`w-full rounded border ${
                      editName ? "" : "bg-gray-200"
                    }
                } border-gray-300 bg-gray-50 px-3 py-2 text-gray-900 focus:border-primary focus:outline-none focus:ring-primary-600 sm:text-sm`}
                    placeholder="JackForez"
                    required="a-z"
                    disabled={!editName}
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4 absolute top-2.5 right-3 text-gray-600"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                    />
                  </svg>
                </div>
                <button
                  onClick={() => {
                    setEditName(!editName);
                  }}
                  className={`px-2.5 ${
                    editName
                      ? "bg-orange-400 text-white"
                      : "text-orange-400 bg-white"
                  } rounded border border-orange-400  hover:border-orange-400 hover:bg-orange-400 hover:text-white`}
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
                <div className="relative w-3/4">
                  <input
                    type="text"
                    name="phone"
                    className={`w-full rounded border ${
                      editPhone ? "" : "bg-gray-200"
                    }
                } border-gray-300 bg-gray-50 px-3 py-2 text-gray-900 focus:border-primary focus:outline-none focus:ring-primary-600 sm:text-sm `}
                    placeholder={currentUser.phone}
                    required="a-z"
                    disabled={!editPhone}
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4 absolute right-3 top-2.5 text-gray-600"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                    />
                  </svg>
                </div>

                <button
                  onClick={() => {
                    setEditPhone(!editPhone);
                  }}
                  className={`px-2.5 ${
                    editPhone
                      ? "bg-orange-400 text-white"
                      : "text-orange-400 bg-white"
                  } rounded border border-orange-400  hover:border-orange-400 hover:bg-orange-400 hover:text-white`}
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
                <div className="w-3/4 relative">
                  <input
                    type="text"
                    name="email"
                    className={`w-full rounded border ${
                      editEmail ? "" : "bg-gray-200"
                    }
                } border-gray-300 bg-gray-50 px-3 py-2 text-gray-900 focus:border-primary focus:outline-none focus:ring-primary-600 sm:text-sm`}
                    placeholder={currentUser.email || "user@sale168.com"}
                    required="a-z"
                    disabled={!editEmail}
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4 absolute text-gray-600 right-3 top-2.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                    />
                  </svg>
                </div>
                <button
                  onClick={() => setEditEmail(!editEmail)}
                  className={`px-2.5 ${
                    editEmail
                      ? "bg-orange-400 text-white"
                      : "text-orange-400 bg-white"
                  } rounded border border-orange-400  hover:border-orange-400 hover:bg-orange-400 hover:text-white`}
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
                <div className="w-3/4 relative">
                  <input
                    type="text"
                    name="address"
                    className={`w-full rounded border ${
                      editAddress ? "" : "bg-gray-200"
                    } border-gray-300 px-3 py-2 text-gray-900 focus:border-primary focus:outline-none focus:ring-primary-600 sm:text-sm`}
                    placeholder={currentUser.address || "766 Nguyễn Văn Linh"}
                    required="a-z"
                    disabled={!editAddress}
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4 absolute right-3 top-2.5 text-gray-600"
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
                </div>
                <button
                  onClick={() => setEditAddress(!editAddress)}
                  className={`px-2.5 ${
                    editAddress
                      ? "bg-orange-400 text-white"
                      : "text-orange-400 bg-white"
                  } rounded border border-orange-400  hover:border-orange-400 hover:bg-orange-400 hover:text-white`}
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
            {editAddress && (
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
            <div className="w-full">
              <button
                type="submit"
                className={`w-3/4 rounded ${
                  check
                    ? "bg-primary hover:bg-green-700 active:scale-95 transition-transform"
                    : "bg-slate-400"
                } px-5 py-3 text-center text-sm font-medium text-white mt-12`}
                onClick={() => console.log(inputs)}
                disabled={!check}
              >
                Cập nhật thông tin
              </button>
            </div>
          </div>
          <div className="w-1/2 space-y-3">
            <h3 className="uppercase font-bold w-full">Bảo mật</h3>
            <div className="w-full">
              <label htmlFor="password" className="">
                {editPassword ? "Mật khẩu cũ" : "Mật khẩu"}
              </label>
              <div className="flex gap-2">
                <div className="w-3/4 relative">
                  <input
                    type="text"
                    name="password"
                    className={`w-full rounded border ${
                      editPassword ? "" : "bg-gray-200"
                    } border-gray-300 px-3 py-2 text-gray-900 focus:border-primary focus:outline-none focus:ring-primary-600 sm:text-sm`}
                    placeholder="*********"
                    required="a-z"
                    disabled={!editPassword}
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4 absolute right-3 top-2.5 text-gray-600"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
                    />
                  </svg>
                </div>

                <button
                  onClick={() => setEditPassword(!editPassword)}
                  className={`px-2.5 ${
                    editPassword
                      ? "bg-orange-400 text-white"
                      : "text-orange-400 bg-white"
                  } rounded border border-orange-400  hover:border-orange-400 hover:bg-orange-400 hover:text-white`}
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
              <div className="w-full space-y-3">
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
                <div className="w-full">
                  <button
                    type="submit"
                    className={`w-3/4 rounded ${
                      check
                        ? "bg-primary hover:bg-green-700 active:scale-95 transition-transform"
                        : "bg-slate-400"
                    } px-5 py-3 text-center text-sm font-medium text-white mt-6`}
                    onClick={() => console.log(inputs)}
                    disabled={!check}
                  >
                    Thay đổi mật khẩu
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
