import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, lazy, Suspense } from "react";

import { Home } from "./pages";
const News = lazy(() => import("./pages/News"));
const Product = lazy(() => import("./pages/Product"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Contact = lazy(() => import("./pages/Contact"));
const About = lazy(() => import("./pages/About"));
const Cart = lazy(() => import("./pages/Cart"));
const Post = lazy(() => import("./pages/Post"));
const Products = lazy(() => import("./pages/Products"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Shop = lazy(() => import("./pages/Shop"));

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
      <Suspense
        fallback={
          <div className="flex justify-center items-center h-[30vh]">
            <svg
              className="h-5  w-5 animate-spin text-white mx-auto"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="green"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="green"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
        }
      >
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
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
