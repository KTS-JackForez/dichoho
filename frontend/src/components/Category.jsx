import React from "react";
import { ktsConfig } from "../../ultis/config";
import { Link } from "react-router-dom";
const Category = () => {
  return (
    <div className="max-w-screen-xl mx-auto text-center mt-1 grid grid-flow-col bg-green-200">
      {ktsConfig.categories.map((i, index) => {
        return (
          <Link
            className="p-3 uppercase inline-block font-semibold hover:bg-green-500"
            to=""
          >
            {i.title}
          </Link>
        );
      })}
    </div>
  );
};

export default Category;
