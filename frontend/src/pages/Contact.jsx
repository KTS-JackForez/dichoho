import React from "react";
import { Footer, Header, Navbar, Promotion } from "../components";
// import './Contact.css';
// import '../assets/css/base.css';

const Contact = () => {
  return (
    <div className="bg-gray-100">
      <div className="max-w-screen-xl bg-white mx-auto">
        <Promotion />
        <Header />
        <Navbar />
        <div class="main">
          <div class="section-content">
            <div class="grid">
              <div class="contact-content">
                <div class="grid__row">
                  <div class="contact-content-introduce">
                    <h3>GREEN FOOD</h3>
                    <p>
                      Mọi thắc mắc quý khách vui lòng liên hệ tới chúng tôi
                      thông qua thông tin bên dưới hoặc quý khách có thể điền
                      thông tin ở form bên cạnh. Chúng tôi sẽ liên hệ giải đáp
                      thắc mắc tới quý khách một cách sớm nhất.
                    </p>
                    <p>
                      <i class="fa fa-map-marker" aria-hidden="true"></i> Địa
                      chỉ : FLC Star 418 Quang Trung, La Khê, Hà Đông
                    </p>
                    <p>
                      <i class="fa fa-envelope" aria-hidden="true"></i> Email :
                      greenfood@gmail.com
                    </p>
                    <p>
                      <i class="fa fa-phone" aria-hidden="true"></i> Điện thoại:
                      0387969609
                    </p>
                    {/* <p><img decoding="async" loading="lazy" class="alignnone size-full wp-image-400"
                            src={tenanh} alt="" width="232" height="89"/></p> */}
                  </div>
                  <div class="contact-content-information">
                    <span>
                      <input
                        type="text"
                        name=""
                        id=""
                        placeholder="Họ và tên..."
                      />
                      <span></span>
                    </span>
                    <span>
                      <input
                        type="email"
                        name=""
                        id=""
                        placeholder="Địa chỉ email..."
                      />
                      <span></span>
                    </span>
                    <span>
                      <input
                        type="tel"
                        name=""
                        id=""
                        placeholder="Số điện thoại..."
                      />
                      <span></span>
                    </span>
                    <span>
                      <textarea
                        name=""
                        id=""
                        cols="40"
                        rows="10"
                        placeholder="Nhập nội dung liên hệ..."
                      ></textarea>
                    </span>
                    <input
                      type="submit"
                      value="GỬI LIÊN HỆ"
                      class="btn btn--primary"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Contact;
