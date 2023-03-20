import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ktsRequest from "../../ultis/ktsrequest";
import { vnd } from "../../ultis/ktsFunc";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";

const Categories = () => {
  return (
    <div className='w-full p-3 text-xs md:text-base'>
       <Link
          to="new"
          className="py-2 px-4 hover:bg-primary rounded font-bold border border-primary text-primary bg-white hover:text-white"
        >
          Tạo mới danh mục
        </Link>
      {/* <div className='bg-white rounded'>danh sách</div> */}
    </div>
  )
}

export default Categories