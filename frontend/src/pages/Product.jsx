import React, { useEffect, useState } from "react";
import { Footer, Header, Navbar, Promotion } from "../components";
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
                <ul className="list-disc ml-5">
                  <li>Đạt chuẩn an toàn VietGap</li>
                  <li>Hàng tươi mới mỗi ngày</li>
                </ul>
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
                <div className="py-1 flex gap-3">
                  <img
                    src="https://green.web5phut.com/wp-content/uploads/2022/06/5-600x600.jpg"
                    alt=""
                    className="w-1/3"
                  />
                  <div className="flex flex-col justify-center items-start flex-1">
                    <p className="font-semibold">sản phẩm hữu cơ sạch</p>
                    <p className="text-green-400">{vnd(20000)}</p>
                  </div>
                </div>
                <div className="py-1 flex gap-3">
                  <img
                    src="https://green.web5phut.com/wp-content/uploads/2022/06/5-600x600.jpg"
                    alt=""
                    className="w-1/3"
                  />
                  <div className="flex flex-col justify-center items-start flex-1">
                    <p className="font-semibold">sản phẩm hữu cơ sạch</p>
                    <p className="text-green-400">{vnd(20000)}</p>
                  </div>
                </div>
                <div className="py-1 flex gap-3">
                  <img
                    src="https://green.web5phut.com/wp-content/uploads/2022/06/5-600x600.jpg"
                    alt=""
                    className="w-1/3"
                  />
                  <div className="flex flex-col justify-center items-start flex-1">
                    <p className="font-semibold">sản phẩm hữu cơ sạch</p>
                    <p className="text-green-400">{vnd(20000)}</p>
                  </div>
                </div>
                <div className="py-1 flex gap-3">
                  <img
                    src="https://green.web5phut.com/wp-content/uploads/2022/06/5-600x600.jpg"
                    alt=""
                    className="w-1/3"
                  />
                  <div className="flex flex-col justify-center items-start flex-1">
                    <p className="font-semibold">sản phẩm hữu cơ sạch</p>
                    <p className="text-green-400">{vnd(20000)}</p>
                  </div>
                </div>
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
    </div>
  );
};

export default Product;
