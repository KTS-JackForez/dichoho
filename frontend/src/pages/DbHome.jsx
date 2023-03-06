import React, { useState } from "react";

const Mybox = (props)=>{
  const [chieudai,setChieudai] = useState("")
  const [chieurong,setChieurong] = useState("")  
  const [mau,setMau] = useState("bg-green-500")  
  return <div className={`w-full h-screen bg-primary absolute top-0`}>
    <button className="bg-white">
      day la box
    </button>
  </div>
}

const DbHome = () => {
  const handleClick = (e) =>{
    e.preventDefault()
    setShowbox(!showbox)
  }
  const [tuthangcon,setTuthangcon]=useState("")
  const [showbox,setShowbox] = useState(false)
  return <div>
    <button className="bg-primary" onClick={handleClick} dongnovao={setShowbox}> hien thi box</button>
    {showbox && <Mybox rong={"full"}/>}
  </div>;
};

export default DbHome;
