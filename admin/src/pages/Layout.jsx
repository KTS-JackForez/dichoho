import React from "react";
import { Routes, Route } from "react-router-dom";
import { Sidebar } from "../components";
import { Home, Products, Account, Orders } from "../pages";

const Layout = () => {
  return (
    <div className="w-screen flex">
      <Sidebar />
      <div className="bg-gray-200 flex-1">
        <Routes>
          <Route index element={<Home />} />
          <Route path="san-pham" element={<Products />} />
          <Route path="don-hang" element={<Orders />} />
          <Route path="tai-khoan" element={<Account />} />
        </Routes>
      </div>
    </div>
  );
};

export default Layout;
