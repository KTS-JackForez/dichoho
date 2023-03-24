import React from "react";
import { useDispatch } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { dashboard } from "../../ultis/config";
import logo from "../assets/imgs/logo.png";
import { logout } from "../redux/userSlice";

const DbSidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const activeLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded  text-white  text-md m-2 font-semibold";
  const normalLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded text-xs text-gray-500 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2 font-semibold";
  return (
    <div className="border border-r-gray-300 h-screen w-72 px-3 hidden md:block">
      <Link className="w-full h-28 block" to="/">
        <img src={logo} alt="" className="w-full h-full object-cover" />
      </Link>
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
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d={i.d} />
                </svg>

                {open && (
                  <span className={`whitespace-pre absolute left-20`}>
                    {i.title}
                  </span>
                )}
            </NavLink>
          );
        })}
        <button
          className="flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded  border-primary border text-md m-2 font-semibold mt-12 hover:bg-primary hover:text-white uppercase "
          onClick={(e) => {
            e.preventDefault();
            dispatch(logout());
            navigate("/");
          }}
        >
          đăng xuất
        </button>
      </div>
    </div>
  );
};

export default DbSidebar;
