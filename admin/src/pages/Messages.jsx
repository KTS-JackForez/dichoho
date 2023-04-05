import React, { useEffect, useState } from "react";
import ktsRequest from "../../ultis/ktsrequest";
import { useSelector } from "react-redux";
import Message from "./Message";
import io from "socket.io-client";
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
  const socket = io.connect(ktsSocket);
  socket.on("newNoti", () => {
    setRefresh(true);
  });
  useEffect(() => {
    socket.emit("newUser", {
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
        console.log(res.data);
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
    <div className="w-full h-[85vh] p-2 md:grid md:auto-cols-fr md:grid-flow-col gap-2">
      <div className="rounded space-y-3 w-full h-full overflow-auto">
        {data ? (
          data.map((c, i) => {
            return (
              <div
                key={i}
                className="flex w-full bg-white p-2 rounded gap-2 justify-between cursor-pointer"
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
          })
        ) : (
          <div>Bạn chưa có tin nhắn nào</div>
        )}
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
