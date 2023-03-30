import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Link, useParams, useNavigate } from "react-router-dom";
import { storage } from "../../ultis/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useSelector } from "react-redux";
import ktsRequest from "../../ultis/ktsrequest";
import ReactQuill from "react-quill";

const EditProduct = () => {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState([]);
  const [urls, setUrls] = useState([]);
  const [purls, setPurls] = useState([]);
  const [inputs, setInputs] = useState({});
  const [isLoadingFiles, setIsLoadingFiles] = useState(false);
  const [percs, setPercs] = useState(0);
  const { currentUser } = useSelector((state) => state.user);
  const [product, setProduct] = useState({});
  const { token } = currentUser;
  const { productid } = useParams();
  const [value, setValue] = useState("");
  const [cats, setCats] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await ktsRequest.get(`/products/${productid}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (
          res.data.shopID === currentUser._id ||
          currentUser.role === "admin"
        ) {
          setProduct(res.data);
          setPurls(res.data.imgs);
          setValue(res.data.description);
          setInputs({
            productName: res.data.productName,
            tags: res.data.tags,
            stockPrice: res.data.stockPrice,
            currentPrice: res.data.currentPrice,
          });
        } else {
          return navigate("/admin/san-pham");
        }
      } catch (error) {
        error.response ? navigate("/notfound") : toast.error("Network Error!");
      }
    };
    fetchData();
  }, [window.location.pathname]);
  useEffect(() => {
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
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await ktsRequest.get("/categories");
        setCats(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      const checkRole = currentUser.role === "admin";
      try {
        const res = checkRole
          ? await ktsRequest.get("/categories/all", {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            })
          : await ktsRequest.get("/categories");
        setCats(res.data);
      } catch (error) {
        toast.error(
          `${error.response ? error.response.data : "Network error!"}`
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
  const handleClick = async () => {
    if (!inputs.productName) {
      toast.error("Tên sản phẩm không được để trống");
      return;
    }
    if ([...purls, ...urls].length < 1) {
      toast.error("Hình ảnh không được để trống");
      return;
    }
    try {
      const config = {
        method: "put",
        url: `/products/${productid}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentUser.token}`,
        },
        data: {
          ...inputs,
          imgs: [...purls, ...urls],
          updatedBy: currentUser.username,
          description: value,
        },
      };
      ktsRequest(config)
        .then((res) => {
          setFile([]);
          setUrls([]);
          toast.success(res.data, {
            onClose: () => navigate("/admin/san-pham"),
          });
        })
        .catch((er) => toast.error(er));
    } catch (error) {
      error.response
        ? toast.error(error.response.data)
        : toast.error("Network Error!");
    }
  };
  return (
    <div className="p-3">
      <h3 className="py-3 uppercase font-bold">Cập nhật thông tin sản phẩm</h3>
      <div className="bg-white p-3 rounded-md text-gray-800 font-semibold shadow-md">
        <div className="space-y-4 md:space-y-6">
          <div className="flex w-full items-center">
            <div className="w-1/4 hidden md:block">
              <label htmlFor="">Hình ảnh sản phẩm </label>
            </div>
            <div className="max-w-3/4 flex items-center gap-2 rounded-md border border-dashed border-primary p-1.5 overflow-x-auto">
              <div className="flex gap-3">
                {purls.map((u, i) => {
                  return (
                    <div className="w-24 relative overflow-hidden" key={i}>
                      <div className="w-24 h-24 overflow-hidden flex rounded-md bg-white">
                        <img
                          src={u}
                          alt=""
                          className="object-cover w-full h-auto"
                        />
                      </div>
                      <div
                        className={`flex justify-between absolute bottom-0 w-full h-4 z-20 ${
                          isLoadingFiles ? "text-white" : "bg-white/30"
                        }`}
                      >
                        <p className="truncate text-xs">{u}</p>
                        <button
                          className="hover:text-white hover:bg-red-500 p-1 rounded-full"
                          onClick={() => {
                            setPurls((prev) => prev.filter((e) => e !== u));
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
              </div>
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
              Tên sản phẩm
            </label>
            <input
              type="text"
              name="productName"
              id="productName"
              className="block w-full rounded border border-gray-300 bg-gray-50 p-2 text-gray-900 focus:border-primary focus:outline-none focus:ring-primary-600 sm:text-sm"
              placeholder={inputs?.productName || "Tên sản phẩm"}
              required="a-z"
              onChange={handleChange}
            />
          </div>

          <div className="flex w-full items-center">
            <label htmlFor="tags" className="w-1/3 hidden md:block">
              Danh mục
            </label>
            <select
              id="cat"
              name="cat"
              class="block w-full rounded border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 focus:border-primary focus:ring-primary"
              onChange={handleChange}
            >
              <option selected disabled hidden>
                Chọn danh mục sản phẩm
              </option>
              {cats.map((c, i) => {
                return (
                  <option
                    value={c.name}
                    key={i}
                    selected={product.cat === c.name}
                  >
                    {c.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="flex w-full items-center">
            <label htmlFor="stockPrice" className="w-1/3 hidden md:block">
              Giá niêm yết
            </label>
            <input
              type="number"
              name="stockPrice"
              id="stockPrice"
              className="block w-full rounded border border-gray-300 bg-gray-50 p-2 text-gray-900 focus:border-primary focus:outline-none focus:ring-primary-600 sm:text-sm"
              placeholder="Giá niêm yết (VNĐ)"
              pattern="[0-9]*"
              onChange={handleChange}
            />
          </div>
          <div className="flex w-full items-center">
            <label htmlFor="currentPrice" className="w-1/3 hidden md:block">
              Giá bán
            </label>
            <input
              type="number"
              name="currentPrice"
              id="currentPrice"
              className="block w-full rounded border border-gray-300 bg-gray-50 p-2 text-gray-900 focus:border-primary focus:outline-none focus:ring-primary-600 sm:text-sm"
              placeholder="Giá bán (VNĐ)"
              pattern="[0-9]*"
              onChange={handleChange}
            />
          </div>
          <div className="flex w-full items-center">
            <label htmlFor="description" className="w-1/3 hidden md:block">
              Mô tả sản phẩm
            </label>
            <ReactQuill
              theme="snow"
              value={value}
              onChange={setValue}
              name="description"
              id="description"
              className="block w-full"
              placeholder="Mô tả sản phẩm"
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
              <span className="uppercase">cập nhật</span>
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

export default EditProduct;
