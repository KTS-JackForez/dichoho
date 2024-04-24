import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import ktsRequest from "../../ultis/ktsrequest";
import { Footer, Header, Navbar, Promotion } from "../components";
import "./post.css";
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
  }, [window.location.pathname]);
  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };
  return (
    <div>
      <Promotion />
      <Header />
      <Navbar />
      <div className="mb-12 max-w-screen-md mx-auto py-4 flex gap-3 flex-col px-3 md:px-0">
        <div>
          <h3 className="text-3xl font-bold text-justify">{post?.title}</h3>
          <div>
            <span className="text-red-500 font-semibold">
              {post?.author || "sale168.com"},
            </span>
            <span className="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-3.5 h-3.6 inline-block ml-2 "
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="italic text-xs">
                {new Date(post?.createdAt).toLocaleString()}
              </span>
            </span>
          </div>
        </div>
        <div className="w-full h-full object-contain object-center">
          <img
            src={post?.thumbnail}
            alt=""
            className="w-full h-full object-contain object-center"
          />
        </div>
        <div
          dangerouslySetInnerHTML={{ __html: post?.content }}
          className="text-justify baiviet"
        ></div>
      </div>
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default Post;
