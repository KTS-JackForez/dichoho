import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import { storage } from "../../ultis/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useSelector } from "react-redux";
import ktsRequest from "../../ultis/ktsrequest";

const NewProduct = () => {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState([]);
  const [urls, setUrls] = useState([]);
  const [inputs, setInputs] = useState({});
  const [isLoadingFiles, setIsLoadingFiles] = useState(false);
  const [percs, setPercs] = useState(0);
  const { currentUser } = useSelector((state) => state.user);
  useEffect(() => {
    // https://stackoverflow.com/questions/75570241/cant-get-urls-after-upload-fire-to-firebase
    const uploadFile = async () => {
      setUrls([]);
      setPercs(0);
      await Promise.all(
        file.map((f, i) => {
          const name = new Date().getTime() + currentUser._id + "_" + f.name;
          const storageRef = ref(
            storage,
            `images/products/${currentUser._id}/${name}`
          );
          const uploadTask = uploadBytesResumable(storageRef, f);

          uploadTask.on(
            "state_changed",
            (snapshot) => {},
            (error) => {},
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                setUrls((prev) => [...prev, downloadURL]);
              });
            }
          );
        })
      );
      setPercs(100);
    };
    file && uploadFile();
  }, [file]);
  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleClick = async () => {
    try {
      const config = {
        method: "post",
        url: "/products",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentUser.token}`,
        },
        data: { ...inputs, imgs: urls, shopID: currentUser._id },
      };
      ktsRequest(config)
        .then((res) => {
          toast.success(res.data);
          setFile([]);
          setUrls([]);
        })
        .catch((er) => toast.error(er));
    } catch (error) {
      error.response
        ? toast.error(error.response.data.message)
        : toast.error("Network Error!");
    }
  };
  return (
    <div className="p-3">
      <h3 className="py-3 uppercase font-bold">th??m m???i s???n ph???m</h3>
      <div className="bg-white p-3 rounded-md text-gray-800 font-semibold shadow-md">
        <div className="space-y-4 md:space-y-6">
          <div className="flex w-full items-center">
            <div className="w-1/4 hidden md:block">
              <label htmlFor="">H??nh ???nh s???n ph???m </label>
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
                          className={`flex justify-between absolute bottom-0 w-[${percs}%] h-4 bg-primary rounded-b-md`}
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
                  // setShowButton(false);
                }}
              />
            </div>
          </div>
          <div className="flex w-full items-center">
            <label htmlFor="productName" className="w-1/3 hidden md:block">
              T??n s???n ph???m
            </label>
            <input
              type="text"
              name="productName"
              id="productName"
              className="block w-full rounded border border-gray-300 bg-gray-50 p-2 text-gray-900 focus:border-primary focus:outline-none focus:ring-primary-600 sm:text-sm"
              placeholder="T??n s???n ph???m"
              required="a-z"
              onChange={handleChange}
            />
          </div>
          <div className="flex w-full items-center">
            <label htmlFor="description" className="w-1/3 hidden md:block">
              M?? t??? s???n ph???m
            </label>
            <textarea
              name="description"
              id="description"
              className="block w-full rounded border border-gray-300 bg-gray-50 p-2 text-gray-900 focus:border-primary focus:outline-none focus:ring-primary-600 sm:text-sm"
              placeholder="M?? t??? s???n ph???m"
              required="a-z"
              onChange={handleChange}
            />
            {/* <input
              type="text"
              name="description"
              id="description"
              className="block w-full rounded border border-gray-300 bg-gray-50 p-2 text-gray-900 focus:border-primary focus:outline-none focus:ring-primary-600 sm:text-sm"
              placeholder="M?? t??? s???n ph???m"
              required="a-z"
              onChange={handleChange}
            /> */}
          </div>
          <div className="flex w-full items-center">
            <label htmlFor="cats" className="w-1/3 hidden md:block">
              Danh m???c
            </label>
            <input
              type="text"
              name="cats"
              id="cats"
              className="block w-full rounded border border-gray-300 bg-gray-50 p-2 text-gray-900 focus:border-primary focus:outline-none focus:ring-primary-600 sm:text-sm"
              placeholder="Ph??n c??ch nhau b???i d???u ; "
              required="a-z"
              onChange={handleChange}
            />
          </div>
          <div className="flex w-full items-center">
            <label htmlFor="stockPrice" className="w-1/3 hidden md:block">
              Gi?? ni??m y???t
            </label>
            <input
              type="text"
              name="stockPrice"
              id="stockPrice"
              className="block w-full rounded border border-gray-300 bg-gray-50 p-2 text-gray-900 focus:border-primary focus:outline-none focus:ring-primary-600 sm:text-sm"
              placeholder="Gi?? ni??m y???t (VN??)"
              required="^[0-9]*$"
              onChange={handleChange}
            />
          </div>
          <div className="flex w-full items-center">
            <label htmlFor="currentPrice" className="w-1/3 hidden md:block">
              Gi?? b??n
            </label>
            <input
              type="text"
              name="currentPrice"
              id="currentPrice"
              className="block w-full rounded border border-gray-300 bg-gray-50 p-2 text-gray-900 focus:border-primary focus:outline-none focus:ring-primary-600 sm:text-sm"
              placeholder="Gi?? b??n (VN??)"
              required="^[0-9]*$"
              onChange={handleChange}
            />
          </div>

          <button
            onClick={handleClick}
            className="w-full rounded bg-primary px-5 py-3 text-center text-sm font-medium text-white hover:bg-green-700 focus:outline-none"
          >
            {loading ? (
              <svg
                className="h-5  w-5 animate-spin text-white mx-auto"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              "T???o m???i"
            )}
          </button>
          <ToastContainer />
          <div className="flex items-center justify-between">
            <Link
              to="/admin/san-pham"
              className="text-sm font-medium text-primary hover:underline"
            >
              Qu???n l?? s???n ph???m
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewProduct;
