import React from "react";
import { Route, Routes } from "react-router-dom";
import DbHeader from "../components/DbHeader";
import DbSidebar from "../components/DbSidebar";
import DbHome from "./DbHome";
import DbOrder from "./DbOrder";
import Messages from "./Messages";
import MyAccount from "./MyAccount";
import BottomMenu from "../components/BottomMenu";

const Dashboard = () => {
  return (
    <div className="w-screen flex">
      <DbSidebar />
      <div className="bg-gray-200 flex-1">
        <DbHeader />
        <Routes>
          <Route path="home" element={<DbHome />} />
          <Route path="don-hang">
            <Route index element={<DbOrder />} />
          </Route>
          <Route path="tai-khoan">
            <Route index element={<MyAccount />} />
          </Route>
          <Route path="tin-nhan">
            <Route index element={<Messages />} />
          </Route>
        </Routes>
        <BottomMenu />
      </div>
    </div>
  );
};

export default Dashboard;
