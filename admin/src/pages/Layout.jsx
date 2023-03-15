import React from "react";
import { Routes, Route } from "react-router-dom";
import { Header, Sidebar } from "../components";
import {
  Home,
  Products,
  Account,
  Orders,
  NewProduct,
  EditProduct,
  NewPost,
  EditPost,
  Post,
  Notifications,
  Notification,
  MyAccount,
  SinglePost,
} from "../pages";

const Layout = () => {
  return (
    <div className="flex relative">
      <Sidebar />
      <div className="bg-gray-200 flex-1">
        <Header />
        <Routes>
          <Route index element={<Home />} />
          <Route path="san-pham">
            <Route index element={<Products />} />
            <Route path="new" element={<NewProduct />} />
            <Route path=":productid" element={<EditProduct />} />
          </Route>
          <Route path="don-hang" element={<Orders />} />
          <Route path="tai-khoan" element={<Account />} />
          <Route path="thong-tin-tai-khoan" element={<MyAccount />} />
          <Route path="thong-bao">
            <Route index element={<Notifications />} />
            <Route path=":notificationId" element={<Notification />} />
          </Route>
          <Route path="bai-viet">
            <Route index element={<Post />} />
            <Route path="new" element={<NewPost />} />
            <Route path="edit/:postid" element={<EditPost />} />
            <Route path=":postid" element={<SinglePost />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
};

export default Layout;
