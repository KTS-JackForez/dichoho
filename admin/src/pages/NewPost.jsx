import { validateArgCount } from "@firebase/util";
import React, { useState, useEffect } from "react";
import { storage } from "../../ultis/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useSelector } from "react-redux";
import ktsRequest from "../../ultis/ktsrequest";
const NewPost = () => {
  const [value, setValue] = useState("");
  const [file, setFile] = useState();
  const [url, setUrl] = useState();
  const [type, setType] = useState(true);
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);
  const [productId, setProductId] = useState("");
  const { currentUser } = useSelector((state) => state.user);
  const keys = ["productName"];
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
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await ktsRequest.get("/products");
        setData(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);
  const search = (data) => {
    return data.filter((item) =>
      keys.some((key) => item[key].toLowerCase().includes(query))
    );
  };
  const handleClick = () => {
    console.log();
  };
  return (
    <div className="bg-white p-3">
      <div className="flex w-full items-center mb-2">
        <label htmlFor="type" className="w-1/6 hidden md:block">
          Loại bài viết
        </label>
        <select
          id="type"
          className="md:w-2/6 w-full rounded border border-gray-300 bg-gray-50 p-2 text-gray-900 focus:border-primary focus:outline-none focus:ring-primary-600 sm:text-sm"
          onChange={(e) => setType(!type)}
        >
          <option selected>Bài viết</option>
          <option>Mô tả sản phẩm</option>
        </select>
      </div>
      {!type && (
        <div className="flex w-full items-center mb-2">
          <label htmlFor="product" className="w-1/6 hidden md:block">
            Sản phẩm áp dụng
          </label>
          <div className="md:w-5/6 w-full relative">
            <input
              type="text"
              name="product"
              id="product"
              className="w-full  rounded border border-gray-300 bg-gray-50 p-2 text-gray-900 focus:border-primary focus:outline-none focus:ring-primary-600 sm:text-sm"
              placeholder="Sản phẩm áp dụng"
              onChange={(e) => setQuery(e.target.value)}
            />
            {query.length > 0 && (
              <div className="absolute top-12 bg-white border border-primary p-3 rounded-md flex flex-col gap-1">
                {search(data).map((p, i) => {
                  return (
                    <div
                      className="flex gap-1 items-center hover:bg-green-200 cursor-pointer"
                      key={i}
                    >
                      <img src={p.imgs[0]} alt="" className="w-8 h-8" />
                      <span>{p.productName}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
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

export default NewPost;
