import React from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { dashboard } from "../../ultis/config";
import { logout } from "../redux/userSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const activeLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded  text-white  text-md m-2 font-semibold";
  const normalLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded text-xs text-gray-500 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2 font-semibold";
  return (
    <div className="border border-r-gray-300 h-screen w-72 px-3">
      <h3 className="uppercase font-bold py-5 text-2xl">dashboard</h3>
      <div className="flex flex-col gap-3 uppercase">
        {dashboard.navLinks.map((i, index) => {
          return (
            <NavLink
              key={index}
              to={i.path}
              style={({ isActive }) => ({
                backgroundColor: isActive ? "green" : "",
              })}
              className={({ isActive }) => (isActive ? activeLink : normalLink)}
            >
              {i.title}
            </NavLink>
          );
        })}
        <button
          onClick={(e) => {
            e.preventDefault();
            dispatch(logout());
            navigate("/login");
          }}
        >
          đăng xuất
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
