import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import app from "../../ultis/firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

const NewProduct = () => {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState([]);
  const [showButton, setShowButton] = useState(true);
  const [inputs, setInputs] = useState({});
  const [isLoadingFiles, setIsLoadingFiles] = useState(false);
  const [percs, setPercs] = useState([]);
  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleCat = (e) => {
    setCat(e.target.value.split(","));
  };

  const handleClick = (e) => {
    e.preventDefault();
    const fileName = new Date().getTime() + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          // const product = { ...inputs, img: downloadURL, categories: cat };
          // addProduct(product, dispatch);
        });
      }
    );
  };

  return (
    <div className="p-3">
      <h3 className="py-3 uppercase font-bold">thêm mới sản phẩm</h3>
      <div className="bg-white p-3 rounded-md text-gray-800 font-semibold shadow-md">
        <div className="space-y-4 md:space-y-6">
          <div className="flex w-full items-center">
            <label htmlFor="name" className="w-1/3 hidden md:block">
              Tên sản phẩm
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="block w-full rounded border border-gray-300 bg-gray-50 p-2 text-gray-900 focus:border-primary focus:outline-none focus:ring-primary-600 sm:text-sm"
              placeholder="Tên sản phẩm"
              required="a-z"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div className="flex w-full items-center">
            <label htmlFor="desc" className="w-1/3 hidden md:block">
              Mô tả sản phẩm
            </label>
            <input
              type="text"
              name="desc"
              id="desc"
              className="block w-full rounded border border-gray-300 bg-gray-50 p-2 text-gray-900 focus:border-primary focus:outline-none focus:ring-primary-600 sm:text-sm"
              placeholder="Mô tả sản phẩm"
              required="a-z"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div className="flex w-full items-center">
            <label htmlFor="cats" className="w-1/3 hidden md:block">
              Danh mục
            </label>
            <input
              type="text"
              name="cats"
              id="cats"
              className="block w-full rounded border border-gray-300 bg-gray-50 p-2 text-gray-900 focus:border-primary focus:outline-none focus:ring-primary-600 sm:text-sm"
              placeholder="Phân cách nhau bởi dấu ; "
              required="a-z"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div className="flex w-full items-center">
            <label htmlFor="stockPrice" className="w-1/3 hidden md:block">
              Giá niêm yết
            </label>
            <input
              type="text"
              name="stockPrice"
              id="stockPrice"
              className="block w-full rounded border border-gray-300 bg-gray-50 p-2 text-gray-900 focus:border-primary focus:outline-none focus:ring-primary-600 sm:text-sm"
              placeholder="Giá niêm yết (VNĐ)"
              required="a-z"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div className="flex w-full items-center">
            <label htmlFor="currentPrice" className="w-1/3 hidden md:block">
              Giá bán
            </label>
            <input
              type="text"
              name="currentPrice"
              id="currentPrice"
              className="block w-full rounded border border-gray-300 bg-gray-50 p-2 text-gray-900 focus:border-primary focus:outline-none focus:ring-primary-600 sm:text-sm"
              placeholder="Giá bán (VNĐ)"
              required="a-z"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div className="flex w-full items-center">
            <div className="w-1/4 hidden md:block">
              <label htmlFor="">Hình ảnh sản phẩm </label>
            </div>
            <div className="max-w-3/4 flex items-center gap-2 rounded-md border border-dashed border-primary p-1.5 overflow-x-auto">
              {file?.length > 0 ? (
                <div className="flex gap-3">
                  {file.map((f, i) => {
                    return (
                      <div className="w-24 relative overflow-hidden" key={i}>
                        <div className="w-24 h-24 overflow-hidden flex rounded-md bg-white">
                          <img
                            src={URL.createObjectURL(f)}
                            alt=""
                            className="object-cover w-full h-auto"
                          />
                        </div>
                        <div
                          className={`flex justify-between absolute bottom-0 w-full h-4 z-20 ${
                            isLoadingFiles ? "text-white" : "bg-white/30"
                          }`}
                        >
                          <p className="truncate text-xs">{f.name}</p>
                          <button
                            className="hover:text-white hover:bg-red-500 p-1 rounded-full"
                            onClick={() => {
                              setFile(file.filter((e) => e.name !== f.name));
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={3}
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
                        <div
                          className={`flex justify-between absolute bottom-0 w-[20%] h-4 bg-primary rounded-b-md`}
                        ></div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="w-24 h-24 flex items-center justify-center">
                  <button
                    className="p-2 rounded-full bg-primary"
                    onClick={() => {
                      document.getElementById("imgInputs").click();
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="white"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6v12m6-6H6"
                      />
                    </svg>{" "}
                  </button>
                </div>
              )}
              <input
                type="file"
                multiple
                id="imgInputs"
                hidden
                onChange={(e) => {
                  setFile(Array.from(e.target.files));
                  setShowButton(false);
                }}
              />
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
              to="/admin/san-pham"
              className="text-sm font-medium text-primary hover:underline"
            >
              Quản lý sản phẩm
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewProduct;
