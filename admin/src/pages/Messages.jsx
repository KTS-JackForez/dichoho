import React, { useEffect, useState } from "react";
import ktsRequest from "../../ultis/ktsrequest";
import { useSelector } from "react-redux";
import Message from "./Message";
const Messages = () => {
  const [data, setData] = useState([]);
  const [chatId, setChatId] = useState("");
  const [showChat, setShowChat] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const { token } = currentUser;
  useEffect(() => {
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
  }, []);
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
    <div className="w-full p-2">
      <div className="rounded space-y-3">
        {data?.map((c, i) => {
          return (
            <div key={i} className="flex bg-white p-2 rounded gap-2">
              <div className="rounded-full h-12 w-12 bg-orange-500 flex justify-center items-center text-white font-bold overflow-hidden">
                {c.senderImg ? (
                  <img
                    src={c.senderImg}
                    alt=""
                    className="w-full h-full object-cover object-center"
                  />
                ) : (
                  textAvatar(c.senderName)
                )}
              </div>

              <button
                className={`space-y-1 text-start`}
                onClick={() => {
                  chatId;
                  setShowChat(true);
                }}
              >
                <div
                  className={`${
                    c.status === 0 ? "font-semibold" : "text-gray-700"
                  }`}
                >
                  {c.text}
                </div>
                <div className="text-xs">
                  {new Date(c.time).toLocaleString()}
                </div>
              </button>
            </div>
          );
        })}
      </div>
      {showChat && (
        <Message
          onClose={setShowChat}
          sender={"123123123"}
          me={currentUser._id}
        />
      )}
    </div>
  );
};

export default Messages;
