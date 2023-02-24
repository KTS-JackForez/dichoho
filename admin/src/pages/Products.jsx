import React from "react";
import { Link } from "react-router-dom";
const Products = () => {
  return (
    <div>
      <Link to="new" className="p-3 bg-primary">
        Tạo mới
      </Link>
    </div>
  );
};

export default Products;
