import React, { useState, useEffect } from "react";

const Chat = (props) => {
  const [chat, setChat] = useState({});
  const [message, setMessage] = useState("");
  useEffect(() => {}, []);

  const handleClick = (text) => {
    console.log(text);
  };
  return (
    <div className="bg-white max-w-md w-full shadow-md rounded fixed bottom-0 right-0 overflow-hidden z-30">
      <section className="">
        <div className="flex justify-between">
          <span className="px-3 py-3">Sale168.com</span>
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
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </section>
      <div className="h-96 py-2 px-2.5 bg-gray-100 my-auto">
        Không có tin nhắn. Khi bạn nhắn tin, tin nhắn sẽ hiển thị tại đây.
      </div>
      <div className="flex justify-between px-4 gap-2 py-4">
        <input
          onChange={(e) => {
            setMessage(e.target.value);
          }}
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
