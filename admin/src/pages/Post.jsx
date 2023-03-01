import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ktsRequest from "../../ultis/ktsrequest";
import { vnd } from "../../ultis/ktsFunc";
const Post = () => {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const keys = ["title"];
  const status = [
    {
      id: 0,
      bgColor: "bg-blue-300",
      name: "đang kiểm duyệt",
      textColor: "text-blue-700",
    },
    {
      id: 1,
      bgColor: "bg-green-300",
      name: "đã xuất bản",
      textColor: "text-gree-700",
    },
    { id: 2, bgColor: "bg-red-300", name: "đã hủy", textColor: "text-red-700" },
  ];
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await ktsRequest.get("/posts");
        setData(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
    console.log(data);
  }, []);
  const search = (data) => {
    return data.filter((item) =>
      keys.some((key) => item[key].toLowerCase().includes(query))
    );
  };
  return (
    <div className="p-3 text-xs md:text-base">
      <div className="flex justify-between">
        <div className="flex">
          <input
            type="text"
            name="name"
            className="block w-full rounded-l-lg border border-gray-300 bg-gray-50 p-2 text-gray-900 focus:border-primary focus:outline-none focus:ring-primary-600 sm:text-sm"
            placeholder="Tìm kiếm bài viết"
            required="a-z"
            onChange={(e) => {
              setQuery(e.target.value);
            }}
          />
          <button className="border-primary border rounded-r-lg p-2 text-gray-900 focus:border-primary focus:outline-none focus:ring-primary sm:text-sm hover:bg-primary hover:text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </button>
        </div>
        <Link
          to="new"
          className="py-2 px-4 hover:bg-primary rounded font-bold border border-primary text-primary bg-white hover:text-white"
        >
          Tạo mới bài viết
        </Link>
      </div>
      <div className="w-full mt-4 border border-dashed border-primary rounded divide-y divide-primary divide-dashed bg-white shadow-lg">
        <div className=" flex p-3 font-semibold items-center bg-primary text-white">
          <div className="w-1/12">#</div>
          <div className="w-5/12">Tiêu đề</div>
          <div className="w-3/12">ID</div>
          <div className="w-2/12">Trạng thái</div>
          <div className="w-1/12">Thao tác</div>
        </div>
        {search.length > 0 ? (
          search(data).map((p, i) => {
            const st = status.find((s) => s.id === p.status);
            return (
              <div className="w-full flex p-1 gap-1 items-center" key={i}>
                <div className="w-1/12">
                  <span>#{i}</span>
                </div>
                <div className="w-5/12 flex items-center gap-3">
                  <img
                    src={
                      p.thumbnail ||
                      "https://via.placeholder.com/300.png/09f/fff"
                    }
                    alt=""
                    className="w-16 h-16 object-contain rounded-md"
                  />
                  <span>{p.title}</span>
                </div>
                <div className="w-3/12">{p._id}</div>
                <div className={`w-2/12  rounded-md justify-center `}>
                  <span
                    className={`${st.bgColor} ${st.textColor} px-2 py-1 font-semibold rounded`}
                  >
                    {st.name}
                  </span>
                </div>
                <div className="w-1/12 flex gap-2">
                  <button className="p-1.5 bg-white rounded border border-orange-400 text-orange-400 hover:border-orange-400 hover:bg-orange-400 hover:text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                      />
                    </svg>
                  </button>
                  <button className="p-1.5 bg-white rounded border border-red-600 text-red-600 hover:border-red-600 hover:bg-red-600 hover:text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div>Không có dữ liệu</div>
        )}
      </div>
    </div>
  );
};

export default Post;
