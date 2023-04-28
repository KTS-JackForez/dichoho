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
  const activeLink = `flex items-center gap-5 pl-4 py-2 mx-2 rounded  text-white`;
  const normalLink = `flex items-center gap-5 pl-4 py-2 mx-2 rounded text-sm text-gray-800 hover:bg-light-gray border border-white hover:border-primary`;
  return (
    <div
      className={`h-screen ${
        open ? "w-64" : "w-24"
      } px-3 hidden md:block relative duration-300`}
    >
      <button
        className={`p-3 rounded-full border border-primary bg-white ${
          open && "rotate-180"
        } duration-500 absolute top-5 -right-5`}
        onClick={() => setOpen(!open)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="green"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d={"M8.25 4.5l7.5 7.5-7.5 7.5"}
          />
        </svg>
      </button>
      <div className="py-6 h-16 text-center">
        <Link className="uppercase font-bold text-2xl" to="/admin">
          {open && <span>dashboard</span>}
        </Link>
      </div>
      <div className="flex flex-col gap-1.5 capitalize">
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
                  <path strokeLinecap="round" strokeLinejoin="round" d={i.d} />
                </svg>

                {open && (
                  <span className={`whitespace-pre absolute left-20`}>
                    {i.title}
                  </span>
                )}
              </NavLink>
            )
          );
        })}
        <button
          className="flex items-center gap-5 pl-4 py-2 rounded  border-primary border text-sm m-2 font-semibold hover:bg-primary hover:text-white uppercase "
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
            className="w-6 h-6 rotate-180"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
            />
          </svg>

          {open && (
            <span className="whitespace-pre absolute left-20">đăng xuất</span>
          )}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
