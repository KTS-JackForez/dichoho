import { NavLink } from "react-router-dom";
import { dashboard } from "../../ultis/config";

const BottomMenu = () => {
  const activeLink =
    "w-full flex flex-col  gap-3 py-2 justify-center  items-center text-white  text-xs";
  const normalLink =
    "w-full  flex flex-col gap-3 py-2 justify-center items-center text-xs text-gray-500 dark:text-gray-200 text-xs dark:hover:text-black hover:bg-light-gray";
  return (
    <div className="md:hidden w-full fixed bottom-0 z-40">
      <div className="bg-white rounded-t-lg overflow-hidden">
        <div className="grid auto-cols-fr grid-flow-col">
          {dashboard.navLinks.map((i, index) => {
            return (
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

                <span className="uppercase">{i.title}</span>
              </NavLink>
            );
          })}
          {/* <button
            className="flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded  border-primary border text-md m-2 font-semibold mt-12 hover:bg-primary hover:text-white uppercase "
            onClick={(e) => {
              e.preventDefault();
              dispatch(logout());
              navigate("/");
            }}
          >
            đăng xuất
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default BottomMenu;
