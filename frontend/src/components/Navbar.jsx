import React from "react";
import { ktsConfig } from "../../ultis/config";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <div className="bg-primary">
      <div className="max-w-screen-xl mx-auto text-center mt-1 ">
        {ktsConfig.navLinks.map((i, index) => {
          return (
            <Link
              className="px-12 py-3 uppercase inline-block text-white font-semibold hover:bg-green-700"
              to={i.path}
              key={index}
            >
              {i.title}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Navbar;
