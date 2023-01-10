import React from "react";
import { ktsConfig } from "../../ultis/config";
const Navbar = () => {
  return (
    <div>
      {ktsConfig.navLinks.map((i) => {
        return <span key={i.title}>{i.title}</span>;
      })}
    </div>
  );
};

export default Navbar;
