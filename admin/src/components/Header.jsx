import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { io } from "socket.io-client";
import ktsRequest from "../../ultis/ktsrequest";
import { dashboard } from "../../ultis/config";
import { ktsSocket } from "../../ultis/config";
const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { token } = currentUser;
  const [refresh, setRefresh] = useState(false);
  const [data, setData] = useState([]);
  const [header, setHeader] = useState("");
  const { pathname } = useLocation();
  const socket = useRef();

  useEffect(() => {
    socket.current = io(ktsSocket);
    socket.current.on("welcome", (data) => {
      console.log(data);
    });
    socket.current.on("newNoti", () => {
      setRefresh(true);
    });
  }, []);
  useEffect(() => {
    socket.current.emit("newUser", {
      uid: currentUser._id,
      uname: currentUser.username,
    });
  }, []);
  useEffect(() => {
    setHeader(dashboard.navLinks.find((i) => i.path === pathname)?.title);
  }, [window.location.pathname]);
  useEffect(() => {
    setRefresh(false);
    const fetchData = async () => {
      const res = await ktsRequest.get("/notifications", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setData(res.data);
    };
    fetchData();
  }, [refresh]);
  const unSeen = (listOfNotifications) => {
    return listOfNotifications?.filter(
      (notification) => notification.status === 0
    );
  };
  const textAvatar = (text) => {
    let name = text.split(" ");
    if (name.length === 1) {
      return name[0].charAt().toUpperCase();
    } else {
      return (
        name[0].charAt(0).toUpperCase() +
        name[name.length - 1].charAt(0).toUpperCase()
      );
    }
  };
  return (
    <div className="w-ful">
      <div className="bg-white rounded px-2 h-[12vh] flex justify-between items-center">
        <h3 className="uppercase font-bold pl-4">{header}</h3>
        <div className="flex gap-3 items-center">
          <div className="flex items-center gap-3 relative group">
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
            {unSeen(data).length > 0 && (
              <div className="absolute -top-3 -right-2 rounded-full bg-red-500 w-6 h-6 p-0.5 flex justify-center items-center text-xs text-white">
                {unSeen(data).length > 99 ? "99+" : unSeen(data).length}
              </div>
            )}
            {/* showNotify */}
            <div className="group-hover:block w-96 right-0 bg-white absolute top-full border rounded-sm border-gray-400 hidden">
              <div className="h-10 bg-white">
                <h3 className="ml-3 leading-10 font-semibold text-gray-600">
                  Thông Báo Mới Nhận
                </h3>
              </div>
              <ul className="h-64 overflow-scroll">
                {data?.map((n, i) => {
                  return (
                    <Link
                      to={`/admin/thong-bao/${n._id}`}
                      key={i}
                      className={`block text-base font-semibold ${
                        n.status === 0 ? "text-black" : "text-slate-500"
                      }  hover:bg-orange-200 border-b rounded-sm border-gray-300 bg-orange-100`}
                    >
                      <a href="" className="p-3 block">
                        <span className="text-base">
                          {/* {!n.read && <i className="text-rose-500">*</i>} */}
                          {n.title}
                        </span>
                        <i
                          className={`block mt-1 text-xs ${
                            n.status === 0 ? "text-black" : "text-slate-500"
                          } truncate`}
                        >
                          {n.short}
                        </i>
                      </a>
                    </Link>
                  );
                })}
              </ul>
              <div className="flex justify-center">
                <Link
                  to="/admin/thong-bao"
                  className="no-underline py-2.5 px-12 text-current font-semibold"
                >
                  Xem tất cả
                </Link>
              </div>
            </div>
          </div>
          <h3 className="font-bold hidden md:block">
            {" "}
            {currentUser.displayName}
          </h3>
          <img src="" alt="" />
          <div className="rounded-full h-12 w-12 bg-orange-500 flex justify-center items-center text-white font-bold overflow-hidden border-2 border-primary">
            {currentUser.img ? (
              <img
                src={currentUser.img}
                alt=""
                className="w-full h-full object-cover object-center"
              />
            ) : (
              textAvatar(currentUser.username)
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
