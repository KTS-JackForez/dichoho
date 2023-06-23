import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
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
  Report,
  Categories,
  Messages,
  Message,
  Delivery,
  EditUser,
} from "../pages";
import NewCategories from "./NewCategories";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const Layout = () => {
  const { currentUser } = useSelector((state) => state.user);
  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }
    if (currentUser.role !== "admin") {
      toast.warn("Bạn không được cấp quyền thực hiện chức năng này");
      return <Navigate to="/admin" />;
    }
    return children;
  };
  return (
    <div className="flex relative">
      <Sidebar />
      <div className="bg-gray-200 flex-1 h-screen">
        <Header />
        <div className="h-[88vh] overflow-auto">
          <Routes>
            <Route index element={<Home />} />
            <Route path="san-pham">
              <Route index element={<Products />} />
              <Route path="new" element={<NewProduct />} />
              <Route path=":productid" element={<EditProduct />} />
            </Route>
            <Route path="don-hang" element={<Orders />} />
            <Route
              path="tai-khoan"
              element={
                <ProtectedRoute>
                  <Account />
                </ProtectedRoute>
              }
            />
            <Route
              path="giao-nhan"
              element={
                <ProtectedRoute>
                  <Delivery />
                </ProtectedRoute>
              }
            />
            <Route path="thong-tin-tai-khoan">
              <Route index element={<MyAccount />} />
              <Route path=":userId" element={<EditUser />} />
            </Route>
            <Route path="thong-bao">
              <Route index element={<Notifications />} />
              <Route path=":notificationId" element={<Notification />} />
            </Route>
            <Route path="tin-nhan">
              <Route index element={<Messages />} />
              <Route path=":chatId" element={<Message />} />
            </Route>
            <Route path="bai-viet">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <Post />
                  </ProtectedRoute>
                }
              />
              <Route
                path="new"
                element={
                  <ProtectedRoute>
                    <NewPost />{" "}
                  </ProtectedRoute>
                }
              />
              <Route
                path="edit/:postid"
                element={
                  <ProtectedRoute>
                    <EditPost />
                  </ProtectedRoute>
                }
              />
              <Route
                path=":postid"
                element={
                  <ProtectedRoute>
                    <SinglePost />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route
              path="bao-cao"
              element={
                <ProtectedRoute>
                  <Report />
                </ProtectedRoute>
              }
            />
            {/* <Route path="danh-muc" element={<Categories/>}/> */}
            <Route path="danh-muc">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <Categories />
                  </ProtectedRoute>
                }
              />
              <Route
                path="new"
                element={
                  <ProtectedRoute>
                    <NewCategories />
                  </ProtectedRoute>
                }
              />
            </Route>
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Layout;
