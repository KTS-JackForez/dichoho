import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Header, Footer, Navbar } from "./components";
import "react-toastify/dist/ReactToastify.css";

import {
  Home,
  News,
  Products,
  Product,
  Login,
  Register,
  NotFound,
  Contact,
  About,
  Cart,
} from "./pages";
function App() {
  const ProtectedRoute = ({ children }) => {
    if (true) {
      <Navigate to="/login" />;
    }
    return children;
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="news" element={<News />} />
          <Route path="contact" element={<Contact />} />
          <Route path="about" element={<About />} />
          <Route path="products" element={<Products />} />
          <Route path="product" element={<Product />} />
          <Route path="cart" element={<Cart />} />

          {/* <Route
            path="dashboard/*"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          /> */}
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
