import { useEffect, useState, useRef } from "react";
import ktsRequest from "../../ultis/ktsrequest";
import { useSelector } from "react-redux";
import Message from "../components/Message";
import { io } from "socket.io-client";
import { ktsSocket } from "../../ultis/config";
import TimeAgo from "timeago-react";

import vi from "timeago.js/lib/lang/vi";
import * as timeago from "timeago.js";
timeago.register("vi", vi);

const Messages = () => {
  const [data, setData] = useState([]);
  const [msg, setMsg] = useState({});
  const [showChat, setShowChat] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const { token } = currentUser;
  const socket = useRef();
  // socket.on("newNoti", () => {
  //   setRefresh(true);
  // });
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
    setRefresh(false);
    const fetchData = async () => {
      try {
        const res = await ktsRequest.get("/chat", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        setData(res.data);
      } catch (error) {
        console.log(error);
        // toast.error(
        //   `${error.response ? error.response.data : "Network Error!"}`
        // );
      }
    };
    fetchData();
  }, [refresh]);
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
    <div className="w-full h-full bg-red-500 p-2 md:grid md:auto-cols-fr md:grid-flow-col gap-2">
      <div className="rounded w-full max-h-full overflow-auto divide-y divide-primary divide-dashed">
        {data?.map((c, i) => {
          return (
            <div
              key={i}
              className="flex w-full bg-white p-2 gap-2 justify-between cursor-pointer hover:bg-slate-300"
              onClick={() => {
                setMsg(c);
                setShowChat(true);
              }}
            >
              <div className="flex gap-3">
                <div className="rounded-full h-12 w-12 bg-orange-500 flex justify-center items-center text-white font-bold overflow-hidden">
                  {c.otherImg ? (
                    <img
                      src={c.otherImg}
                      alt=""
                      className="w-full h-full object-cover object-center"
                    />
                  ) : (
                    textAvatar(c.title)
                  )}
                </div>
                <div
                  className={`${
                    c.status === 0 ? "font-semibold" : "text-gray-700"
                  } text-start`}
                >
                  <div>{c.title}</div>
                  <div className="text-xs">
                    {currentUser._id === c.senderId && <span>Bạn: </span>}{" "}
                    <span>{c.text}</span>
                  </div>
                </div>
              </div>
              <div className="text-xs text-gray-800">
                <TimeAgo datetime={c.time} locale="vi" />
              </div>
            </div>
          );
        })}
      </div>

      {showChat && (
        <Message
          onClose={setShowChat}
          msg={msg}
          me={currentUser}
          onRefresh={setRefresh}
        />
      )}
    </div>
  );
};

export default Messages;
