import React from "react";
import { Footer, Header, Navbar, Promotion } from "../components";

const Cart = () => {
  return (
    <div>
      <Promotion />
      <Header />
      <Navbar />
      <div className="max-w-screen-xl mx-auto grid grid-cols-3">
        <table class="table-auto col-span-2">
          <thead>
            <tr>
              <th>Tên hàng</th>
              <th>Đơn giá</th>
              <th>Số lượng</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
              <td>Malcolm Lockyer</td>
              <td>1961</td>
            </tr>
            <tr>
              <td>Witchy Woman</td>
              <td>The Eagles</td>
              <td>1972</td>
            </tr>
            <tr>
              <td>Shining Star</td>
              <td>Earth, Wind, and Fire</td>
              <td>1975</td>
            </tr>
          </tbody>
        </table>

        <div></div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
