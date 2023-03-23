import React, { useEffect, useState } from "react";
import ktsRequest from "../../ultis/ktsrequest";
import { useSelector } from "react-redux";
const Messages = () => {
  const [data, setData] = useState([]);
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
        toast.error(
          `${error.response ? error.response.data : "Network Error!"}`
        );
      }
    };
    fetchData();
  }, []);
  console.log(data);
  return (
    <div className="w-full p-2">
      <div className="rounded p-2 bg-white">
        {data?.map((c, i) => {
          return <div key={i}>{c._id}</div>;
        })}
      </div>
    </div>
  );
};

export default Messages;
