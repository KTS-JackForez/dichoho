import { validateArgCount } from "@firebase/util";
import React, { useState, useEffect } from "react";
import { storage } from "../../ultis/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useSelector } from "react-redux";
const Post = () => {
  const [value, setValue] = useState("");
  const [file, setFile] = useState();
  const [url, setUrl] = useState();
  const [percs, setPercs] = useState(0);
  const { currentUser } = useSelector((state) => state.user);
  useEffect(() => {
    const uploadFile = async () => {
      setUrl("");

      const name = new Date().getTime() + currentUser._id + "_" + file.name;
      const storageRef = ref(
        storage,
        `images/posts/${currentUser._id}/${name}`
      );
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {},
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setUrl(downloadURL);
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);
  console.log(url);
  return (
    <div className="bg-white p-3">
      <div className="flex w-full items-center mb-2">
        <label htmlFor="title" className="w-1/6 hidden md:block">
          Tiêu đề bài viết
        </label>
        <input
          type="text"
          name="title"
          id="title"
          className="md:w-5/6 w-full rounded border border-gray-300 bg-gray-50 p-2 text-gray-900 focus:border-primary focus:outline-none focus:ring-primary-600 sm:text-sm"
          placeholder="Tiêu đề bài viết"
          // onChange={handleChange}
        />
      </div>
      <div className="flex w-full items-center mb-2">
        <label htmlFor="title" className="w-1/6 hidden md:block">
          Mô tả ngắn gọn
        </label>
        <input
          type="text"
          name="title"
          id="title"
          className="md:w-5/6 w-full rounded border border-gray-300 bg-gray-50 p-2 text-gray-900 focus:border-primary focus:outline-none focus:ring-primary-600 sm:text-sm"
          placeholder="Mô tả ngắn gọn, mục này sẽ được hiển thị kèm tiêu đề bài viết"
          // onChange={handleChange}
        />
      </div>

      <div className="flex w-full items-center mb-2">
        <label htmlFor="title" className="w-1/6 hidden md:block">
          Ảnh bìa sản phẩm
        </label>
        <div className="md:w-5/6 w-full">
          <input
            type="file"
            name="img"
            id="img"
            className="rounded border border-gray-300 bg-gray-50 p-2 text-gray-900 focus:border-primary focus:outline-none focus:ring-primary-600 sm:text-sm"
            placeholder="Tiêu đề bài viết"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <div className="w-full">
            <img src={url} alt="" className="w-32" />
          </div>
        </div>
      </div>

      <div className="my-2 h-[80vh]">
        <ReactQuill
          theme="snow"
          value={value}
          onChange={setValue}
          id="content"
          className="h-full"
        />
      </div>
      <div className="mt-12 text-end">
        <button className="bg-primary text-white px-4 py-2 rounded-sm hover:bg-green-700">
          đăng ký bài viết
        </button>
      </div>
    </div>
  );
};

export default Post;
