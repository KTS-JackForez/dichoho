import React,{useState,useEffect} from 'react'
import { vnd } from '../../ultis/ktsFunc'
import { useSelector } from "react-redux";
import {useNavigate} from "react-router-dom"


const Cart = (props)=>{
    return <div className='w-full bg-white rounded-md p-3 h-32 flex justify-center items-center flex-col gap-2'>
        <div className='font-semibold'>{props?.title}</div>
        <div className='text-3xl font-semibold'>{props?.vnd ? vnd(props?.data):props?.data}</div>
    </div>
}

const Report = () => {
    const [repostData,setReportData]= useState({})
    const navigate = useNavigate()
    const { currentUser } = useSelector((state) => state.user);   
    const {token} = currentUser
    useEffect(()=>{
        if(!["admin","special"].includes(currentUser.role)){
            return navigate("/login")
        }
        const fetchData = async ()=>{

        }
        fetchData()
    },[])
  return (
    <div className='w-full grid grid-cols-3 p-2 gap-3'>
        <Cart title={"Tổng lượng truy cập"} data={2000}/>
        <Cart title={"Tổng số sản phẩm"} data={100}/>
        <Cart title={"Số sản phẩm mới"} data={50}/>
        <Cart title={"Số người bán"} data={100}/>
        <Cart title={"Số người bán mới"} data={90}/>
        <Cart title={"Tổng số đơn hàng"} data={3000}/>
        <Cart title={"Tổng số đơn hàng thành công"} data={2900}/>
        <Cart title={"Tổng số đơn hàng không thành công"} data={100}/>
        <Cart title={"Tổng giá trị giao dịch thành công"} data={5800000} vnd={true}/>
    </div>
  )
}

export default Report