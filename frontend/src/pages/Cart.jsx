import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { vnd } from "../../ultis/ktsFunc";
import ktsRequest from "../../ultis/ktsrequest";
import { Footer, Header, Navbar, Promotion } from "../components";
import { addToCart, removeItem, resetCart } from "../redux/cartReducer";
import QR_Code from "../assets/imgs/QR_CodeFull.jpg";
import io from "socket.io-client";
import { ktsSocket } from "../../ultis/config";
import axios from "axios";
const Cart = () => {
  const [payment, setPayment] = useState("cod");
  const [payCode, setPayCode] = useState("");
  const [note, setNote] = useState("");
  const [isCheckout, setIsCheckout] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const { currentUser } = useSelector((state) => state.user);
  const { products } = useSelector((state) => state.cart);
  const [editAddress, setEditAddress] = useState(false);
  const [shipMode, setShipMode] = useState(0);
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [inputs, setInputs] = useState({
    buyerName: currentUser?.displayName || "",
    buyerPhone: currentUser?.phone || "",
    buyerAddress: currentUser?.address || "",
    cityCode: currentUser?.cityCode || -1,
    districtCode: currentUser?.districtCode || -1,
    wardCode: currentUser?.wardCode || -1,
    wardName: currentUser?.wardName || "",
    districtName: currentUser?.districtName || "",
    cityName: currentUser?.cityName || "",
    wardFullName: currentUser?.wardFullName || "",
    districtFullName: currentUser?.districtFullName || "",
    cityFullName: currentUser?.cityFullName || "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const socket = io.connect(ktsSocket);
  const shipCost = [20000, 35000];
  const total = (products) => {
    let total = 0;
    products.map((item) => {
      total += item.quantity * item.currentPrice;
    });
    return total;
  };
  useEffect(() => {
    const getCities = async () => {
      try {
        const res = await axios.get("https://api.ktscorp.vn/api/cities");
        const data = Object.values(res.data);
        setCities(data);
      } catch (error) {
        toast.error(error);
      }
    };
    getCities();
  }, []);
  useEffect(() => {
    const getDistricts = async () => {
      try {
        const resd = await axios.get(
          `https://api.ktscorp.vn/api/cities/districts/${inputs?.cityCode}`
        );
        const cName = cities.find((city) => city.code === inputs?.cityCode);
        const data = Object.values(resd.data);
        setDistricts(data);
        setInputs((prev) => {
          return {
            ...prev,
            districtCode:
              data.findIndex((el) => el.code === inputs.districtCode) > -1
                ? inputs.districtCode
                : data[0]?.code,
            cityCode: inputs?.cityCode,
            cityName: cName?.name,
            cityFullName: cName?.name_with_type,
          };
        });
      } catch (error) {
        toast.error(error);
      }
    };
    getDistricts();
  }, [inputs?.cityCode]);
  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  useEffect(() => {
    const getWards = async () => {
      try {
        const resw = await axios.get(
          `https://api.ktscorp.vn/api/cities/wards/${inputs?.districtCode}`
        );
        const data = Object.values(resw.data);
        const dName = districts.find((d) => d.code === inputs?.districtCode);
        setWards(data);
        setInputs((prev) => {
          return {
            ...prev,
            wardCode:
              data.findIndex((el) => el.code === inputs.wardCode) > -1
                ? inputs.wardCode
                : data[0]?.code,
            districtCode: inputs?.districtCode,
            districtName: dName?.name,
            districtFullName: dName?.name_with_type,
          };
        });
      } catch (error) {
        toast.error(error);
      }
    };
    getWards();
  }, [inputs?.districtCode]);
  useEffect(() => {
    const getWard = () => {
      if (inputs?.wardCode) {
        const wName = wards.find((w) => w.code === inputs?.wardCode);
        setInputs((prev) => {
          return {
            ...prev,
            wardCode: inputs?.wardCode,
            wardName: wName?.name,
            wardFullName: wName?.name_with_type,
          };
        });
      }
    };
    getWard();
  }, [inputs?.wardCode]);
  const handleClick = async () => {
    if (!currentUser) {
      return navigate("/login");
    }
    const { token } = currentUser;
    try {
      const res = await ktsRequest.post(
        "/orders",
        {
          buyerId: currentUser._id,
          buyerName: inputs.buyerName || currentUser.displayName,
          buyerPhone: inputs.buyerPhone || currentUser.phone,
          toAddress: inputs.buyerAddress || currentUser.address,
          toWard: inputs.wardFullName || currentUser.wardFullName,
          toDistrict: inputs.districtFullName || currentUser.districtFullName,
          toCity: inputs.cityFullName || currentUser.cityFullName,
          total: total(products) + shipCost[shipMode],
          payCode,
          products,
          note,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(res.data.message);
      setOrderNumber(res.data.data);
      socket.emit("dathang", {
        buyerId: currentUser._id,
        products,
        buyerName: currentUser.username,
      });
      dispatch(resetCart());
      setIsCheckout(true);
    } catch (err) {
      console.log(err);
      err.response
        ? toast.error(err.response.data)
        : toast.error("Network Error!");
    }
  };
  return (
    <div>
      <Promotion />
      <Header />
      <Navbar />
      <div className="max-w-screen-xl mx-auto my-10 min-h-[30vh] space-y-2">
        {currentUser && (
          <div className="border border-primary rounded p-2 md:grid grid-cols-5 gap-1">
            <div className="mt-2 md:mt-0">
              <label>Tên người nhận hàng: </label>
              <input
                name="buyerName"
                className={`block w-full rounded border border-gray-300 ${
                  editAddress ? "bg-gray-50" : "bg-gray-200"
                } p-2 text-gray-900 focus:border-primary focus:outline-none focus:ring-primary-600 sm:text-sm `}
                value={inputs?.buyerName}
                onChange={handleChange}
                disabled={!editAddress}
              />
            </div>
            <div className="mt-2 md:mt-0">
              <label>Số điện thoại: </label>
              <input
                name="buyerPhone"
                className={`block w-full rounded border border-gray-300 ${
                  editAddress ? "bg-gray-50" : "bg-gray-200"
                } p-2 text-gray-900 focus:border-primary focus:outline-none focus:ring-primary-600 sm:text-sm `}
                value={inputs?.buyerPhone}
                onChange={handleChange}
                disabled={!editAddress}
              />
            </div>
            <div className="col-span-3 mt-2 md:mt-0">
              <div className="flex justify-between">
                <label>Địa chỉ: </label>
                {editAddress ? (
                  <span className="space-x-3">
                    <span
                      className="hover:text-primary hover:underline cursor-pointer"
                      onClick={() => {
                        setInputs({
                          buyerName: currentUser?.displayName || "",
                          buyerPhone: currentUser?.phone || "",
                          buyerAddress: currentUser?.address || "",
                          cityCode: currentUser?.cityCode || -1,
                          districtCode: currentUser?.districtCode || -1,
                          wardCode: currentUser?.wardCode || -1,
                          wardName: currentUser?.wardName || "",
                          districtName: currentUser?.districtName || "",
                          cityName: currentUser?.cityName || "",
                          wardFullName: currentUser?.wardFullName || "",
                          districtFullName: currentUser?.districtFullName || "",
                          cityFullName: currentUser?.cityFullName || "",
                        });
                        setEditAddress(false);
                      }}
                    >
                      Xóa
                    </span>
                    <span
                      className="hover:text-primary hover:underline cursor-pointer"
                      onClick={() => setEditAddress(false)}
                    >
                      Áp dụng
                    </span>
                  </span>
                ) : (
                  <span
                    className="hover:text-primary hover:underline cursor-pointer"
                    onClick={() => setEditAddress(true)}
                  >
                    Thay đổi
                  </span>
                )}
              </div>
              <div className="">
                {editAddress ? (
                  <>
                    <input
                      name="buyerAddress"
                      onChange={handleChange}
                      className="block w-full rounded border border-gray-300 bg-gray-50 p-2 text-gray-900 focus:border-primary focus:outline-none focus:ring-primary-600 sm:text-sm"
                      placeholder={
                        (inputs?.buyerAddress || currentUser.address) +
                        ", " +
                        (inputs?.wardFullName || currentUser.wardFullName) +
                        ", " +
                        (inputs?.districtFullName ||
                          currentUser.districtFullName) +
                        ", " +
                        (inputs?.cityFullName || currentUser.cityFullName)
                      }
                      value={inputs?.buyerAddress}
                    />
                    <div className="w-full justify-start flex mt-1">
                      <div className="w-1/3 flex flex-col pr-1">
                        <label htmlFor="" className="hidden md:block">
                          Tỉnh/Thành
                        </label>
                        <select
                          id="cities"
                          name="cityCode"
                          className="block w-full rounded border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 focus:border-primary focus:ring-primary"
                          onChange={handleChange}
                        >
                          {cities.map((i) => {
                            return (
                              <option
                                value={i.code}
                                key={i.code}
                                selected={i.code === inputs?.cityCode}
                              >
                                {i.name_with_type}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                      <div className="w-1/3 flex flex-col pr-1">
                        <label htmlFor="" className="hidden md:block">
                          Quận/Huyện
                        </label>
                        <select
                          id="districts"
                          name="districtCode"
                          className="block w-full rounded border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 focus:border-primary focus:ring-primary"
                          onChange={handleChange}
                        >
                          {districts.map((i) => {
                            return (
                              <option
                                value={i.code}
                                key={i.code}
                                selected={i.code === inputs?.districtCode}
                              >
                                {i.name_with_type}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                      <div className="w-1/3 flex flex-col">
                        <label htmlFor="" className="hidden md:block">
                          Phường/Xã
                        </label>
                        <select
                          id="wards"
                          name="wardCode"
                          className="block w-full rounded border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 focus:border-primary focus:ring-primary"
                          onChange={handleChange}
                        >
                          {wards.map((i) => {
                            return (
                              <option
                                value={i.code}
                                key={i.code}
                                selected={i.code === inputs?.wardCode}
                              >
                                {i.name_with_type}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="block w-full rounded border border-gray-300 p-2 text-gray-900 bg-gray-200 sm:text-sm">
                    {(inputs?.buyerAddress || currentUser.address) +
                      ", " +
                      (inputs?.wardFullName || currentUser.wardFullName) +
                      ", " +
                      (inputs?.districtFullName ||
                        currentUser.districtFullName) +
                      ", " +
                      (inputs?.cityFullName || currentUser.cityFullName)}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        {products.length > 0 ? (
          <div className="flex gap-3 flex-wrap md:flex-nowrap border border-primary rounded">
            <div className="md:w-3/4 w-full divide-primary divide-dashed divide-y shadow-lg">
              <div className="flex p-3">
                <h3 className="font-bold text-gray-700 uppercase w-4/5 md:w-2/5 pl-10 md:text-base text-xs">
                  hàng hóa
                </h3>
                <h3 className="font-bold text-center text-gray-600 uppercase w-1/5 md:text-base text-xs">
                  số lượng
                </h3>
                <h3 className="font-bold text-center text-gray-600 uppercase hidden md:block md:w-1/5">
                  đơn giá
                </h3>
                <h3 className="font-bold text-center text-gray-600 uppercase hidden md:block md:w-1/5">
                  thành tiền
                </h3>
              </div>
              <div className="gap-3 py-3">
                {products.map((i, index) => {
                  return (
                    <div className="flex items-center px-3 py-5 " key={index}>
                      <div className="flex w-4/5 md:w-2/5 text-xs items-center">
                        <div className="text-center pr-2">
                          <button
                            className="bg-white p-2 rounded-full hover:bg-red-500 hover:text-white"
                            onClick={() => {
                              dispatch(removeItem(i.id));
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={3}
                              stroke="currentColor"
                              className="w-3 h-3"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        </div>
                        <div className="md:w-20 w-16">
                          <img
                            className="h-full w-full aspect-square object-cover object-center rounded-md"
                            src={i.img}
                            alt=""
                          />
                        </div>
                        <div className="flex flex-col justify-between ml-4 flex-grow">
                          <Link
                            to={`/products/${i.id}`}
                            className="font-bold text-xs"
                          >
                            {i.productName}
                          </Link>
                          <span className="italic text-red-500">
                            {i?.shopName}
                          </span>
                          <span className="text-start text-sm mt-3 md:hidden">
                            Đơn giá: {vnd(i.currentPrice)}
                          </span>
                          <span className="text-start text-sm md:hidden">
                            Thành tiền {vnd(i.quantity * i.currentPrice)}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col md:flex-row gap-2 items-end md:justify-center w-1/5 text-xs">
                        <button
                          className="bg-gray-200 rounded md:px-2 p-2 hover:bg-primary"
                          onClick={() =>
                            dispatch(
                              addToCart({
                                id: i.id,
                                quantity: i.quantity < 2 ? 0 : -1,
                              })
                            )
                          }
                        >
                          <svg
                            className="fill-current text-gray-600 w-3"
                            viewBox="0 0 448 512"
                          >
                            <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                          </svg>
                        </button>
                        <input
                          className="md:mx-2 border text-center w-7 py-1 border-primary focus:border-primary focus:outline-none focus:ring-primary rounded disable"
                          type="text"
                          value={i.quantity}
                          disabled={true}
                        />
                        <button
                          className="bg-gray-200 rounded px-2 p-2 hover:bg-primary"
                          onClick={() => {
                            dispatch(
                              addToCart({
                                id: i.id,
                                quantity: 1,
                              })
                            );
                          }}
                        >
                          <svg
                            className="fill-current text-gray-600 w-3"
                            viewBox="0 0 448 512"
                          >
                            <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                          </svg>
                        </button>
                      </div>
                      <span className="text-center w-1/5  text-sm hidden md:block">
                        {vnd(i.currentPrice)}
                      </span>
                      <span className="text-center w-1/5  text-sm hidden md:block">
                        {vnd(i.quantity * i.currentPrice)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="md:w-1/4 w-full divide-primary divide-dashed divide-y">
              <h1 className="uppercase p-3 font-bold">đơn hàng</h1>
              <div className="p-3 flex gap-3 flex-col">
                <div className="flex justify-between">
                  <span className=" text-sm uppercase py-3">tiền hàng</span>
                  <span className=" text-sm py-3">{vnd(total(products))}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font- text-sm uppercase py-3">cước</span>
                  <span className="font- text-sm py-3">
                    {vnd(shipCost[shipMode])}
                  </span>
                </div>
                <div>
                  <label className=" inline-block text-sm uppercase">
                    phương thức vận chuyển
                  </label>
                  <select
                    className="block w-full rounded border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 focus:outline-none focus:border-primary focus:ring-primary"
                    onChange={(e) => {
                      setShipMode(e.target.value);
                    }}
                  >
                    <option value={0}>Tiêu chuẩn</option>
                    <option value={1}>Siêu tốc</option>
                  </select>
                </div>
                <div>
                  <label className=" inline-block text-sm uppercase">
                    phương thức thanh toán
                  </label>
                  <select
                    className="block w-full rounded border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 focus:outline-none focus:border-primary focus:ring-primary"
                    onChange={(e) => setPayment(e.target.value)}
                  >
                    <option value="cod">COD</option>
                    <option value="bank">Trực tuyến</option>
                  </select>
                </div>
                {payment === "bank" && (
                  <div>
                    <img
                      src={QR_Code}
                      alt=""
                      className="md:w-full w-1/2 md:h-1/6 object-contain"
                    />
                  </div>
                )}
                {payment === "bank" && (
                  <div className="">
                    <label
                      htmlFor="payCode"
                      className=" inline-block text-sm uppercase"
                    >
                      Mã giao dịch (chuyển khoản)
                    </label>
                    <input
                      onChange={(e) => setPayCode(e.target.value)}
                      type="text"
                      id="payCode"
                      placeholder="Nhập mã giao dịch"
                      className="border-grey-light block w-full rounded border p-2 focus:border-primary focus:outline-none"
                    />
                  </div>
                )}

                <div className="">
                  <label
                    htmlFor="note"
                    className=" inline-block text-sm uppercase"
                  >
                    Ghi chú
                  </label>
                  <textarea
                    type="text"
                    id="note"
                    placeholder="Ghi chú của người mua"
                    className="border-grey-light block w-full rounded border p-2 focus:border-primary focus:outline-none"
                    onChange={(e) => setNote(e.target.value)}
                  />
                </div>
                <div className="border-t mt-8">
                  <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                    <span>tổng tiền đơn hàng</span>
                    <span>{vnd(total(products) + shipCost[shipMode])}</span>
                  </div>
                  <button
                    className="bg-primary  hover:bg-primary rounded py-3 text-sm text-white uppercase w-full"
                    onClick={handleClick}
                  >
                    đặt hàng
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center flex-col items-center gap-3">
            {isCheckout ? (
              <div className="">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={4}
                  stroke="green"
                  className="w-16 h-16 mx-auto"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
                <p className="mt-1">
                  Cảm ơn bạn đã đặt hàng! Mã đơn hàng của bạn là:{" "}
                  <span className="bg-gray-200 px-3 py-1  rounded-md">
                    {orderNumber}
                  </span>
                  Chúng tôi đang chuẩn bị hàng giao đến bạn
                </p>
              </div>
            ) : (
              <div>bạn chưa chọn sản phẩm nào !!!</div>
            )}

            <div className="flex gap-2">
              <Link
                to="/"
                className="px-4 py-1 bg-primary text-white hover:bg-green-700"
              >
                Mua thêm
              </Link>
              <Link
                to="/contact"
                className="px-4 py-1 bg-primary text-white hover:bg-green-700"
              >
                Liên hệ chúng tôi
              </Link>
            </div>
          </div>
        )}
        {products.length > 0 && (
          <div>
            <Link
              to="/"
              className="flex  text-primary text-sm mt-10 hover:text-green-700"
            >
              <svg
                className="fill-current mr-2 text-primary w-4"
                viewBox="0 0 448 512"
              >
                <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
              </svg>
              Thêm nhiều món ngon nữa
            </Link>
          </div>
        )}
        <ToastContainer />
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
