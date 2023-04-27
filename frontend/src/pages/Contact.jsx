import React from "react";
import { Footer, Header, Navbar, Promotion } from "../components";
import logo from "../assets/imgs/logo.png";

const Contact = () => {
  return (
    <div className="bg-gray-100">
      <Promotion />
      <Header />
      <Navbar />
      <div className="max-w-screen-xl bg-white mx-auto">
        <div className="flex flex-col md:flex-row px-3.5 py-3.5">
          <div className="w-full md:w-1/2">
            {/* <img src={logo} alt="" />
            <ul className="flex flex-col gap-2">
              <li className="flex gap-2 items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8 -ml-1.5"
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

                <span>
                  Địa chỉ: Tầng 2 - KTS Home, Nguyễn Văn Linh, An Dương, Hải
                  Phòng
                </span>
              </li>
              <li className="flex gap-2 items-center">
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
                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                  />
                </svg>
                <span>Email: hotro@sale168.vn</span>
              </li>
              <li className="flex gap-2">
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
                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                  />
                </svg>

                <span>Điện thoại: 0788.300.894</span>
              </li>
            </ul>
            <img
              src="https://green.web5phut.com/wp-content/uploads/2021/10/Untitled-7.png"
              alt=""
              className=" w-1/3 object-contain"
            /> */}
            <div className="w-full h-full">
              <div className="w-full h-full">
                <iframe
                  className="w-full pr-3 pt-3.5 h-full"
                  id="gmap_canvas"
                  src="https://maps.google.com/maps?q=766 Nguyễn Văn Linh Hải Phòngg&t=&z=10&ie=UTF8&iwloc=&output=embed"
                  frameborder="0"
                  scrolling="no"
                  marginheight="0"
                  marginwidth="0"
                ></iframe>
                <br />
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <form className="w-full flex flex-col gap-2">
              <div className="mt-4">
                <label htmlFor="name" className="font-semibold">
                  Họ và tên
                </label>
                <input
                  type="text"
                  placeholder="Họ và tên ..."
                  name="name"
                  id="name"
                  className="border-grey-light block w-full rounded border p-2 focus:border-primary focus:outline-none"
                  required="abc"
                  onChange={(e) => setDisplayName(e.target.value)}
                />
              </div>
              <div className="mt-4">
                <label htmlFor="phone" className="font-semibold">
                  Số điện thoại
                </label>
                <input
                  type="text"
                  placeholder="Số điện thoại ..."
                  name="phone"
                  id="phone"
                  className="border-grey-light block w-full rounded border p-2 focus:border-primary focus:outline-none"
                  required="abc"
                  onChange={(e) => setDisplayName(e.target.value)}
                />
              </div>
              <div className="mt-4">
                <label htmlFor="email" className="font-semibold">
                  Địa chỉ email
                </label>
                <input
                  type="email"
                  placeholder="Địa chỉ email ..."
                  name="email"
                  id="email"
                  className="border-grey-light block w-full rounded border p-2 focus:border-primary focus:outline-none"
                  required="abc"
                  onChange={(e) => setDisplayName(e.target.value)}
                />
              </div>
              <div className="mt-4">
                <label htmlFor="content" className="font-semibold">
                  Nội dung
                </label>
                <textarea
                  placeholder="Nội dung liên hệ ..."
                  name="content"
                  id="content"
                  className="border-grey-light block w-full rounded border p-2 focus:border-primary focus:outline-none"
                  required="abc"
                  onChange={(e) => setDisplayName(e.target.value)}
                />
                <div>
                  <button
                    type="submit"
                    className="w-full rounded bg-primary
                 px-5 py-3 text-center text-sm font-medium text-white focus:outline-none focus:ring-4 focus:ring-primary"
                  >
                    Gửi liên hệ cho chúng tôi
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
