import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import {
  Home,
  News,
  Product,
  Login,
  Register,
  NotFound,
  Contact,
  About,
  Cart,
  Post,
  Products,
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
