import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { dashboard } from "../../ultis/config";
import { logout } from "../redux/userSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const { currentUser } = useSelector((state) => state.user);
  const { role } = currentUser;
  const activeLink = `flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded  text-white  text-md m-2 font-semibold border hover:border-primary border-white`;
  const normalLink = `flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded text-xs text-gray-500 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2 font-semibold border border-white hover:border-primar`;
  return (
    <div
      className={`border border-r-gray-300 h-screen w-${
        open ? 72 : 24
      } px-3 hidden md:block relative bg-white/50 duration-300`}
    >
      <button
        className={`p-3 rounded-full bg-red-400 active:scale-105 ${
          open && "rotate-180"
        } duration-500 hover:bg-red-400 absolute top-7 -right-5`}
        onClick={() => setOpen(!open)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            // d={
            //   open ? "M8.25 4.5l7.5 7.5-7.5 7.5" : "M15.75 19.5L8.25 12l7.5-7.5"
            // }
            d={"M8.25 4.5l7.5 7.5-7.5 7.5"}
          />
        </svg>
      </button>
      <div className="py-6 h-20">
        <Link className="uppercase font-bold text-2xl" to="/admin">
          {open && <span>dashboard</span>}
        </Link>
      </div>
      <div className="flex flex-col gap-3 uppercase">
        {dashboard.navLinks.map((i, index) => {
          return (
            i.role.includes(role) && (
              <NavLink
                key={index}
                to={i.path}
                style={({ isActive }) => ({
                  backgroundColor: isActive ? "green" : "",
                })}
                className={({ isActive }) =>
                  isActive ? activeLink : normalLink
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
                  />
                </svg>

                {open && <span>{i.title}</span>}
              </NavLink>
            )
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
            />
          </svg>

          {open && <span>đăng xuất</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
