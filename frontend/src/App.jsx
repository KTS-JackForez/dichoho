import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, lazy } from "react";

import { Home } from "./pages";
const News = lazy(() => import("./pages/News"));
const Product = lazy(() => import("./pages"));
const Login = lazy(() => import("./pages"));
const Register = lazy(() => import("./pages"));
const NotFound = lazy(() => import("./pages"));
const Contact = lazy(() => import("./pages"));
const About = lazy(() => import("./pages"));
const Cart = lazy(() => import("./pages"));
const Post = lazy(() => import("./pages"));
const Products = lazy(() => import("./pages"));
const Dashboard = lazy(() => import("./pages"));
const Shop = lazy(() => import("./pages"));

import { useSelector } from "react-redux";
import ktsRequest from "../ultis/ktsrequest";
import { ToastContainer } from "react-toastify";
function App() {
  const { currentUser } = useSelector((state) => state.user);
  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }
    return children;
  };
  useEffect(() => {
    const countVisitor = async () => {
      await ktsRequest.get("/count");
    };
    countVisitor();
  }, []);
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="news">
            <Route index element={<News />} />
            <Route path=":postId" element={<Post />} />
          </Route>
          <Route path="contact" element={<Contact />} />
          <Route path="about" element={<About />} />
          <Route path="products">
            <Route index element={<Products />} />
            <Route path=":productId" element={<Product />} />
          </Route>
          <Route path="abc" element={<Products />} />
          <Route path="cart" element={<Cart />} />
          <Route path="shop/:shopId" element={<Shop />} />
          <Route
            path="dashboard/*"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
