import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ktsRequest from "../../ultis/ktsrequest";
import { toast, ToastContainer } from "react-toastify";

const Notification = () => {
  const [data, setData] = useState({});
  const { notificationId } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await ktsRequest.get(`/notifications/${notificationId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        setData(res.data);
        console.log(res.data);
      } catch (err) {
        err.response ? navigate("/notfound") : toast.error("Network Error!");
      }
    };
    fetchData();
  }, []);
  return <div>abc</div>;
};

export default Notification;
