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
  const [weight, setWeight] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const [openTab, setOpenTab] = useState(1);
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [hotProducts, setHotProducts] = useState([]);
  const [showChat, setShowChat] = useState(false);
  const [showNotification, setShowNotification] = useState(true);
  const { productId } = useParams();
  const { imgs } = product;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await ktsRequest.get(`/products/${productId}`);
        setProduct(res.data);
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
                      imgs.map((i) => {
                        return (
                          <img
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
                        <p className="text-green-400">{vnd(20000)}</p>
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
                    <p>{product.description}</p>
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
                    <div class="product-main grid">
                      <div class="product-footer">
                        <div class="product-footer-content">
                          <div class="product-footer-content-pane product-footer-content-comment active">
                            <div class="comments">
                              <h3>Đánh giá</h3>
                              <p>Chưa có đánh giá nào.</p>
                            </div>
                            <div class="comment-form-wrapper">
                              <div class="comment-respond">
                                <h3 class="comment-respond-title">
                                  Hãy là người đầu tiên nhận xét “Thực phẩm hữu
                                  cơ sạch”{" "}
                                </h3>
                                <form action="" class="comment-form">
                                  <label for="rating">
                                    Đánh giá của bạn&nbsp;
                                    <span class="required">*</span>
                                  </label>
                                  <div class="product-item-rating-selected">
                                    <div class="product-item__rating active">
                                      <i class="product-item__star-gold fas fa-star"></i>
                                    </div>
                                    <div class="product-item__rating">
                                      <i class="product-item__star-gold fas fa-star"></i>
                                      <i class="product-item__star-gold fas fa-star"></i>
                                    </div>
                                    <div class="product-item__rating">
                                      <i class="product-item__star-gold fas fa-star"></i>
                                      <i class="product-item__star-gold fas fa-star"></i>
                                      <i class="product-item__star-gold fas fa-star"></i>
                                    </div>
                                    <div class="product-item__rating">
                                      <i class="product-item__star-gold fas fa-star"></i>
                                      <i class="product-item__star-gold fas fa-star"></i>
                                      <i class="product-item__star-gold fas fa-star"></i>
                                      <i class="product-item__star-gold fas fa-star"></i>
                                    </div>
                                    <div class="product-item__rating">
                                      <i class="product-item__star-gold fas fa-star"></i>
                                      <i class="product-item__star-gold fas fa-star"></i>
                                      <i class="product-item__star-gold fas fa-star"></i>
                                      <i class="product-item__star-gold fas fa-star"></i>
                                      <i class="product-item__star-gold fas fa-star"></i>
                                    </div>
                                  </div>
                                  <label for="comment">
                                    Nhận xét của bạn&nbsp;
                                    <span class="required">*</span>
                                  </label>
                                  <textarea
                                    id="comment"
                                    name="comment"
                                    cols="45"
                                    rows="8"
                                    required=""
                                  ></textarea>
                                  <div class="modal-comment">
                                    <div class="modal-comment-author">
                                      <div>
                                        <label for="name" class="modal-label">
                                          Tên&nbsp;
                                        </label>
                                        <input
                                          id="name"
                                          type="text"
                                          class="modal-input"
                                          placeholder="Nhập tên của bạn"
                                        />
                                      </div>

                                      <div>
                                        <label for="email" class="modal-label">
                                          Email&nbsp;
                                        </label>
                                        <input
                                          id="email"
                                          type="text"
                                          class="modal-input"
                                          placeholder="Nhập email của bạn"
                                        />
                                      </div>
                                    </div>

                                    <label for="send" class="modal-label">
                                      <input id="send" type="checkbox" />
                                      <span>
                                        {" "}
                                        Lưu tên của tôi, email, và trang web
                                        trong trình duyệt này cho lần bình luận
                                        kế tiếp của tôi.
                                      </span>
                                    </label>

                                    <button class="submit btn--primary">
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
      <button
        className="fixed bottom-14 right-14 px-4 py-2 bg-primary rounded-full text-white w-14 h-14"
        onClick={() => {
          setShowChat(true);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-10"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
          />
        </svg>
        {showNotification && (
          <div className="absolute bottom-full right-1">
            <div
              className="bg-white rounded-full border border-solid border-t-sky-400 text-sky-400 text-sm absolute -top-2.5 -right-2.5"
              onClick={(e) => {
                setShowNotification(!showNotification);
                e.stopPropagation();
              }}
            >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
  <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
</svg>

            </div>
            <div className="text-black px-3.5 py-2.5 w-64 bg-slate-200 rounded-lg shadow-lg mb-2">
              <span>👋 Click ngay để chat với Shop</span>
            </div>
          </div>
        )}
      </button>
      {showChat && <Chat onClose={setShowChat} />}
    </div>
  );
};

export default Product;
