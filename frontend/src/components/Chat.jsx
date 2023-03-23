import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import ktsRequest from "../../ultis/ktsrequest";
const Chat = (props) => {
  const [chat, setChat] = useState({});
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [shop, setShop] = useState({});
  const [resfresh, setRefresh] = useState(false);
  const scrollRef = useRef();
  useEffect(() => {
    setRefresh(false);
    const fetchData = async () => {
      try {
        const res = await ktsRequest.get(
          `/chat/find/${props.me}/${props.product.shopID}`
        );
        setChat(res.data);
        setShop(res.data.shop);
        setMessages(res.data.messages);
      } catch (error) {
        toast.error(
          `${error.response ? error.response.data : "Network Error!"}`
        );
      }
    };
    fetchData();
  }, [resfresh, window.location.pathname]);

  const handleClick = async (text) => {
    try {
      const res = await ktsRequest.post(`/messages`, {
        chatId: chat.chatId,
        sender: props.me,
        text: text,
      });
      setRefresh(true);
      setMessage("");
    } catch (error) {
      toast.error(`${error.response ? error.response.data : "Network Error!"}`);
    }
  };
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="bg-white max-w-md w-full shadow-md rounded fixed bottom-0 right-0 overflow-hidden z-30">
      <section className="">
        <div className="flex justify-between">
          <span className="px-3 py-3 text-primary font-semibold">
            {shop.displayName}
          </span>
          <button
            className="p-3 border-l bg-primary text-white"
            onClick={() => {
              props.onClose(false);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </section>
      <div className="h-96 py-2 px-2.5 bg-gray-100 my-auto shadow-inner overflow-y-auto">
        {messages?.length > 0 ? (
          <ul className="space-y-2">
            {messages?.map((m, i) => {
              return (
                <li className="px-3 text-end">
                  <div className="bg-green-500 inline-block text-start px-3 py-1 rounded-md">
                    <div className="text-white">{m.text}</div>
                    <div className="text-xs text-gray-800">
                      {new Date(m.createdAt).toLocaleString()}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          "Bạn chưa có tin nhắn nào."
        )}
      </div>
      <div className="flex justify-between px-4 gap-2 py-4">
        <input
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          value={message}
          type="text"
          placeholder="Nhập nội dung tại đây..."
          className="block w-full rounded border border-gray-300 bg-gray-50 p-3 text-gray-900 focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
        />
        <button
          className="w-14 outline-0 text-base bg-primary text-white rounded"
          onClick={() => handleClick(message)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 mx-auto"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Chat;
