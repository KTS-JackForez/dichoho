import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { dashboard } from "../../ultis/config";
import { logout } from "../redux/userSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const { role } = currentUser;
  const activeLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded  text-white  text-md m-2 font-semibold border hover:border-primary border-white";
  const normalLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded text-xs text-gray-500 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2 font-semibold border border-white hover:border-primary";
  return (
    <div className="border border-r-gray-300 h-screen w-72 px-3 hidden md:block">
      <div className="py-6">
        <Link className="uppercase font-bold text-2xl" to="/admin">
          dashboard
        </Link>
      </div>
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
              {i.role.includes(role) && i.title}
            </NavLink>
          );
        })}
        <button
          className="flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded  border-primary border text-md m-2 font-semibold mt-12 hover:bg-primary hover:text-white uppercase "
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
