import React, { useEffect, useState } from "react";
import { Chat, Footer, Header, Navbar, Promotion } from "../components";
import { vnd } from "../../ultis/ktsFunc";
import "./Products.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import ktsRequest from "../../ultis/ktsrequest";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/cartReducer";
const Product = () => {
  const { products } = useSelector((state) => state.cart);
  const { currentUser } = useSelector((state) => state.user);
  const [weight, setWeight] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const [openTab, setOpenTab] = useState(1);
  const [product, setProduct] = useState({});
  const [shopId, setShopId] = useState();
  const [quantity, setQuantity] = useState(1);
  const [hotProducts, setHotProducts] = useState([]);
  const [showChat, setShowChat] = useState(false);
  const [showNotification, setShowNotification] = useState(true);
  const { productId } = useParams();
  const { imgs } = product;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    // setShowChat(false)
    const fetchData = async () => {
      try {
        const res = await ktsRequest.get(`/products/${productId}`);
        setProduct(res.data);
        setShopId(res.data.shopID);
      } catch (err) {
        err.response ? navigate("/notfound") : toast.error("Network Error!");
      }
    };
    fetchData();
  }, [window.location.pathname]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await ktsRequest.get(`/products/hotest/5`);
        setHotProducts(res.data);
      } catch (err) {
        err.response ? navigate("/notfound") : toast.error("Network Error!");
      }
    };
    fetchData();
  }, []);
  const handleClick = (type) => {
    // type-true: mua luôn
    // type-false: thêm vào giỏ hàng
    const data = {
      id: productId,
      productName: product.productName,
      description: product.description,
      currentPrice: product.currentPrice,
      shopID: product.shopID,
      img: product.imgs[0],
      quantity,
    };
    dispatch(addToCart(data));

    type ? "" : navigate("/cart");
  };
  return (
    <div className="">
      <Promotion />
      <Header />
      <Navbar />
      <div className="min-h-screen">
        <div>
          <div className="mb-12 max-w-screen-xl mx-auto py-4 flex gap-3 p-3 md-p-0">
            <div className="flex flex-col md:flex-row lg:w-3/4 gap-2">
              <div className="md:w-1/2 w-full">
                <div className="relative overflow-hidden w-full">
                  <button
                    onClick={() =>
                      setActiveImg((prev) =>
                        prev === 0 ? imgs.length - 1 : prev - 1
                      )
                    }
                    className="p-3 z-10  bg-green-500/30 rounded-full hover:bg-green-300 absolute top-[50%]"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 "
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 19.5L8.25 12l7.5-7.5"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() =>
                      setActiveImg((prev) =>
                        prev === imgs.length - 1 ? 0 : prev + 1
                      )
                    }
                    className="p-3 z-10 bg-green-500/30 rounded-full hover:bg-green-500 absolute top-[50%] right-0"
                  >
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
                        d="M8.25 4.5l7.5 7.5-7.5 7.5"
                      />
                    </svg>
                  </button>
                  <div
                    className="w-full duration-500 h-96 flex"
                    // style={{ transform: `translateX(-${activeSlide * 100}%)` }}
                    style={{ transform: `translateX(-${activeImg * 100}%)` }}
                  >
                    {imgs &&
                      imgs.map((i, index) => {
                        return (
                          <img
                            key={index}
                            src={i}
                            alt=""
                            className="object-cover w-full h-full"
                          />
                        );
                      })}
                  </div>
                </div>
                {imgs && (
                  <div className="w-full flex overflow-hidden md:h-28 gap-1 mt-1">
                    {imgs.map((i, k) => {
                      return (
                        <div
                          key={k}
                          className={`w-1/4 
                            ${
                              activeImg === k
                                ? "opacity-100 border border-primary rounded"
                                : "opacity-30"
                            }
                           cursor-pointer p-1`}
                          onClick={() => {
                            setActiveImg(k);
                          }}
                        >
                          <img
                            src={i}
                            alt=""
                            className="w-full md:h-full h-20 object-cover"
                          />
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="text-gray-700 text-xl font-bold">
                  {product?.productName}
                </h3>
                <div className="flex">
                  {/* Xem shop */}
                  <div
                    className="flex text-sm justify-evenly w-28 px-1.5 py-1.5 bg-white text-black rounded align-center leading-5 border border-current cursor-pointer"
                    onClick={() => {
                      if (!currentUser) {
                        return navigate("/login");
                      }
                      setShowChat(true);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                      />
                    </svg>
                    <span className="no-underline font-semibold">
                      Chat ngay
                    </span>
                  </div>
                  {showChat && (
                    <Chat
                      onClose={setShowChat}
                      shop={shopId}
                      me={currentUser}
                    />
                  )}

                  {/* chat ngay */}
                  <div className="flex text-sm justify-evenly w-28 px-1.5 py-1.5 bg-primary text-white rounded align-center leading-5 ml-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z"
                      />
                    </svg>
                    <Link
                      className="no-underline font-semibold"
                      to={`/shop/${product.shopID}`}
                    >
                      Xem shop
                    </Link>
                  </div>
                </div>

                <h3 className="text-green-600 font-bold text-xl">
                  {vnd(product.currentPrice) + "- " + vnd(product.stockPrice)}
                </h3>
                <div className="flex justify-between">
                  <ul className="list-disc ml-5">
                    <li>Đạt chuẩn an toàn VietGap</li>
                    <li>Hàng tươi mới mỗi ngày</li>
                  </ul>
                  {/* <button className="px-4 py-2 bg-primary rounded text-white w-4/6" onClick={()=>{setShowChat(!showChat)}}>
                  Nhắn tin cho người bán
                </button> */}
                </div>

                <div className="bg-orange-100 rounded border border-dashed border-red-500 divide-y divide-dashed divide-red-500">
                  <div className="flex gap-3 p-3 items-center">
                    <img
                      src="https://green.web5phut.com/wp-content/uploads/2022/07/gift.png"
                      className="w-8"
                      alt=""
                    />
                    <h3 className="uppercase font-semibold">
                      khuyến mãi trị giá{" "}
                      <span className="font-bold">{vnd(300000)}</span>
                    </h3>
                  </div>
                  <div className="p-3">
                    <ul className="list-decimal ml-5 ">
                      <li>Đạt chuẩn an toàn VietGap</li>
                      <li>Hàng tươi mới mỗi ngày</li>
                    </ul>
                  </div>
                </div>
                <div className="flex my-5">
                  <span className="font-bold text-gray-700">
                    Trọng lượng (KG)
                  </span>
                  <div className="flex w-1/2 mx-auto gap-1">
                    <button
                      className="bg-gray-300 px-2.5 hover:bg-gray-500 rounded"
                      onClick={() =>
                        setQuantity((prev) => (prev > 0 ? prev - 1 : 0))
                      }
                    >
                      -
                    </button>
                    <input
                      type="number"
                      className="focus:border-primary focus:outline-none focus:ring-primary w-1/4 border border-green-100 text-center"
                      value={quantity}
                      onChange={(e) => setQuantity(parseInt(e.target.value))}
                    />
                    <button
                      className="bg-gray-300 px-2.5 hover:bg-gray-500 rounded"
                      onClick={() => setQuantity((prev) => prev + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="w-full grid grid-cols-2 gap-2">
                  <button
                    className="p-3 font-semibold text-white bg-primary hover:bg-green-700 rounded-md"
                    onClick={() => handleClick(true)}
                  >
                    Thêm vào giỏ hàng
                  </button>
                  <button
                    className="p-3 font-semibold text-white bg-orange-400 rounded-md text-center hover:bg-orange-600"
                    onClick={() => handleClick(false)}
                  >
                    Mua ngay
                  </button>
                </div>
              </div>
            </div>
            <div className="lg:w-1/4 lg:block hidden">
              <h3 className="p-3 bg-primary w-full text-center text-white rounded-md block uppercase fo">
                sản phẩm nổi bật
              </h3>
              <div className="divide-y divide-dashed divide-primary">
                {hotProducts.map((p, i) => {
                  return (
                    <Link
                      to={`/products/${p._id}`}
                      className="py-1 flex gap-3"
                      key={i}
                    >
                      <img
                        src={
                          p.imgs[0] ||
                          "https://via.placeholder.com/300.png/09f/fff"
                        }
                        alt=""
                        className="w-1/3 h-24 object-cover object-center rounded-md"
                      />
                      <div className="flex flex-col justify-center items-start flex-1">
                        <p to={`/products/${p._id}`} className="font-semibold">
                          {p?.productName}
                        </p>
                        <p className="text-green-500 font-semibold">
                          {vnd(p.currentPrice)}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap max-w-screen-xl mx-auto">
          <div className="w-full">
            <ul
              className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
              role="tablist"
            >
              <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                <a
                  className={
                    "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                    (openTab === 1
                      ? "text-white bg-primary"
                      : "text-primary bg-white")
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenTab(1);
                  }}
                  data-toggle="tab"
                  href="#link1"
                  role="tablist"
                >
                  Mô tả
                </a>
              </li>
              <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                <a
                  className={
                    "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                    (openTab === 2
                      ? "text-white bg-primary"
                      : "text-primary bg-white")
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenTab(2);
                  }}
                  data-toggle="tab"
                  href="#link2"
                  role="tablist"
                >
                  thông tin bổ sung
                </a>
              </li>
              <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                <a
                  className={
                    "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                    (openTab === 3
                      ? "text-white bg-primary"
                      : "text-primary bg-white")
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenTab(3);
                  }}
                  data-toggle="tab"
                  href="#link3"
                  role="tablist"
                >
                  đánh giá
                </a>
              </li>
            </ul>

            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
              <div className="px-4 py-5 flex-auto">
                <div className="tab-content tab-space">
                  <div className={openTab === 1 ? "flex" : "hidden"} id="link1">
                    <p
                      dangerouslySetInnerHTML={{ __html: product.description }}
                    ></p>
                  </div>
                  <div className={openTab === 2 ? "flex" : "hidden"} id="link2">
                    <table>
                      <thead>
                        <tr>
                          <th>KÍCH THƯỚC</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>M, L, S, XL, XXL</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div
                    className={openTab === 3 ? "block" : "hidden"}
                    id="link3"
                  >
                    <div className="product-main grid">
                      <div className="product-footer">
                        <div className="product-footer-content">
                          <div className="product-footer-content-pane product-footer-content-comment active">
                            <div className="comments">
                              <h3>Đánh giá</h3>
                              <p>Chưa có đánh giá nào.</p>
                            </div>
                            <div className="comment-form-wrapper">
                              <div className="comment-respond">
                                <h3 className="comment-respond-title">
                                  Hãy là người đầu tiên nhận xét “Thực phẩm hữu
                                  cơ sạch”{" "}
                                </h3>
                                <form action="" className="comment-form">
                                  <label htmlFor="rating">
                                    Đánh giá của bạn&nbsp;
                                    <span className="required">*</span>
                                  </label>
                                  <div className="product-item-rating-selected">
                                    <div className="product-item__rating active">
                                      <i className="product-item__star-gold fas fa-star"></i>
                                    </div>
                                    <div className="product-item__rating">
                                      <i className="product-item__star-gold fas fa-star"></i>
                                      <i className="product-item__star-gold fas fa-star"></i>
                                    </div>
                                    <div className="product-item__rating">
                                      <i className="product-item__star-gold fas fa-star"></i>
                                      <i className="product-item__star-gold fas fa-star"></i>
                                      <i className="product-item__star-gold fas fa-star"></i>
                                    </div>
                                    <div className="product-item__rating">
                                      <i className="product-item__star-gold fas fa-star"></i>
                                      <i className="product-item__star-gold fas fa-star"></i>
                                      <i className="product-item__star-gold fas fa-star"></i>
                                      <i className="product-item__star-gold fas fa-star"></i>
                                    </div>
                                    <div className="product-item__rating">
                                      <i className="product-item__star-gold fas fa-star"></i>
                                      <i className="product-item__star-gold fas fa-star"></i>
                                      <i className="product-item__star-gold fas fa-star"></i>
                                      <i className="product-item__star-gold fas fa-star"></i>
                                      <i className="product-item__star-gold fas fa-star"></i>
                                    </div>
                                  </div>
                                  <label htmlFor="comment">
                                    Nhận xét của bạn&nbsp;
                                    <span className="required">*</span>
                                  </label>
                                  <textarea
                                    id="comment"
                                    name="comment"
                                    cols="45"
                                    rows="8"
                                    required=""
                                  ></textarea>
                                  <div className="modal-comment">
                                    <div className="modal-comment-author">
                                      <div>
                                        <label
                                          htmlFor="name"
                                          className="modal-label"
                                        >
                                          Tên&nbsp;
                                        </label>
                                        <input
                                          id="name"
                                          type="text"
                                          className="modal-input"
                                          placeholder="Nhập tên của bạn"
                                        />
                                      </div>

                                      <div>
                                        <label
                                          htmlFor="email"
                                          className="modal-label"
                                        >
                                          Email&nbsp;
                                        </label>
                                        <input
                                          id="email"
                                          type="text"
                                          className="modal-input"
                                          placeholder="Nhập email của bạn"
                                        />
                                      </div>
                                    </div>

                                    <label
                                      htmlFor="send"
                                      className="modal-label"
                                    >
                                      <input id="send" type="checkbox" />
                                      <span>
                                        {" "}
                                        Lưu tên của tôi, email, và trang web
                                        trong trình duyệt này cho lần bình luận
                                        kế tiếp của tôi.
                                      </span>
                                    </label>

                                    <button className="submit btn--primary">
                                      GỬI ĐI
                                    </button>
                                  </div>
                                </form>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
      <Footer />
      {/* Chat với shop */}
      {/* <button
        className="fixed bottom-14 right-14 px-4 py-2 bg-primary rounded-full text-white w-14 h-14"
        onClick={() => {
          if (!currentUser) {
            return navigate("/login");
          }
          setShowChat(true);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-10"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
          />
        </svg>
        {showNotification && (
          <div className="absolute bottom-full right-1">
            <div
              className="bg-white rounded-full border border-solid text-primary text-sm absolute -top-2.5 -right-2.5"
              onClick={(e) => {
                setShowNotification(!showNotification);
                e.stopPropagation();
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                class="w-5 h-5"
              >
                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
              </svg>
            </div>
            <div className="text-black px-3.5 py-2.5 w-64 bg-slate-200 rounded-lg shadow-lg mb-2">
              <span>👋 Click ngay để chat với Shop</span>
            </div>
          </div>
        )}
      </button>
      {showChat && (
        <Chat onClose={setShowChat} shop={shopId} me={currentUser} />
      )} */}
    </div>
  );
};

export default Product;
