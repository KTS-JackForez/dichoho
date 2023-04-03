import React, { useEffect, useState } from "react";

function Messages() {
  const [showChat, setShowChat] = useState(false);
  return (
    <div className="w-full p-2 md:grid md:auto-cols-fr md:grid-flow-col gap-2 h-full mb-[4.75rem]">
      <div class="rounded space-y-3 w-full">
        <div class="flex bg-white p-2 rounded gap-2">
          <div class="rounded-full h-12 w-12 bg-orange-500 flex justify-center items-center text-white font-bold overflow-hidden">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/dichoho-4e879.appspot.com/o/images%2Fproducts%2F63be4d1b244204a0cd899658%2F167739519587663be4d1b244204a0cd899658_2.jpg?alt=media&amp;token=8edb8ff5-26c6-4d86-9f88-fb4481be2056"
              alt=""
              class="w-full h-full object-cover object-center"
            />
          </div>
          <button class="space-y-1 text-start">
            <div
              class="font-semibold"
              onClick={() => {
                setShowChat(true);
              }}
            >
              ádasd
            </div>
            <div class="text-xs">11:43:44 24/3/2023</div>
          </button>
        </div>
      </div>
      {showChat && (
        <div class="bg-white w-full h-full">
          <div class="font-semibold p-3">Admin hệ thống</div>
          <div class="h-96 py-2 px-2.5 bg-gray-100 my-auto shadow-inner overflow-y-auto"></div>
          <div class="flex justify-between px-4 gap-2 py-4">
            <input
              id="myInput"
              type="text"
              placeholder="Nhập nội dung tại đây..."
              class="block w-full rounded border border-gray-300 bg-gray-50 p-3 text-gray-900 focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
              value=""
            />
            <button
              id="myBtn"
              class="w-14 outline-0 text-base bg-primary text-white rounded"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6 mx-auto"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Messages;
