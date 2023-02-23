import React from "react";
import { Routes, Route } from "react-router-dom";
import { Sidebar } from "../components";
import {
  Home,
  Products,
  Account,
  Orders,
  NewProduct,
  EditProduct,
} from "../pages";

const Layout = () => {
  return (
    <div className="w-screen flex">
      <Sidebar />
      <div className="bg-gray-200 flex-1">
        <Routes>
          <Route index element={<Home />} />
          <Route path="san-pham">
            <Route index element={<Products />} />
            <Route path="new" element={<NewProduct />} />
            <Route path="edit" element={<EditProduct />} />
          </Route>
          <Route path="don-hang" element={<Orders />} />
          <Route path="tai-khoan" element={<Account />} />
        </Routes>
      </div>
    </div>
  );
};

export default Layout;
