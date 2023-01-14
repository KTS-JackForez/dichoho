import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Login, NotFound, Register } from "./pages";
import Layout from "./pages/Layout";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const login = true;
  const ProtectedRoute = ({ children }) => {
    if (false) {
      return <Navigate to="/login" />;
    }
    return children;
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Login />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route
            path="admin/*"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
