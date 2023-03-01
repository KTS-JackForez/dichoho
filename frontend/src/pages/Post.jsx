import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import ktsRequest from "../../ultis/ktsrequest";
import { Footer, Header, Navbar, Promotion } from "../components";

const Post = () => {
  const navigate = useNavigate();
  const { postId } = useParams();
  const [post, setPost] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await ktsRequest.get(`/posts/${postId}`);
        setPost(res.data);
      } catch (err) {
        err.response ? navigate("/notfound") : toast.error("Network Error!");
      }
    };
    fetchData();
  }, []);
  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };
  return (
    <div>
      <Promotion />
      <Header />
      <Navbar />
      <div className="mb-12 max-w-screen-md mx-auto py-4 flex gap-3 flex-col">
        <h3 className="text-3xl font-bold">{post?.title}</h3>
        <div className="w-full h-96">
          <img
            src={post?.thumbnail}
            alt=""
            className="w-full h-full object-cover object-center"
          />
        </div>
        {getText(post?.content)}
      </div>
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default Post;
