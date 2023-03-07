import React from "react";

const Header = () => {
  return (
    <div className="w-full p-2">
      <div className="bg-white rounded px-2 py-4 flex justify-between items-center">
        <div> tiêu đề</div>
        <div className="flex gap-3 items-center">
          <div className="flex items-center gap-3 relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8 cursor-pointer"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
              />
            </svg>
            <div className="absolute -top-3 -right-2 rounded-full bg-red-500 w-5 h-5 flex justify-center items-center text-xs text-white">
              3
            </div>
          </div>
          <h3 className="font-bold"> JackForez</h3>
          <div className="rounded-full h-12 w-12 bg-orange-500">
            {/* <img src="" alt="" /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
