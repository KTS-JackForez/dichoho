import React from "react";
import { ktsConfig } from "../../ultis/config";
import { Link } from "react-router-dom";
const Category = () => {
  return (
    <div className="max-w-screen-xl mx-auto text-center mt-3  bg-green-200 w-full overflow-hidden flex text-xs md:text-base gap-2 justify-around flex-nowrap">
      {ktsConfig.categories.map((i, index) => {
        return (
          <Link
            className="p-3 font-semibold hover:bg-green-500 block"
            to=""
            key={index}
          >
            <p> {i.title}</p>
          </Link>
        );
      })}
    </div>
  );
};

export default Category;
