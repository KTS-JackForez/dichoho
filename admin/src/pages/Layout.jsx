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
} from "../pages";

const Layout = () => {
  return (
    <div className="w-screen flex">
      <Sidebar />
      <div className="bg-gray-200 flex-1">
        <Header />
        <Routes>
          <Route index element={<Home />} />
          <Route path="san-pham">
            <Route index element={<Products />} />
            <Route path="new" element={<NewProduct />} />
            <Route path="edit" element={<EditProduct />} />
          </Route>
          <Route path="don-hang" element={<Orders />} />
          <Route path="tai-khoan" element={<Account />} />
          <Route path="bai-viet">
            <Route index element={<Post />} />
            <Route path="new" element={<NewPost />} />
            <Route path="edit" element={<EditPost />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
};

export default Layout;
