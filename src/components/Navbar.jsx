import React from 'react'
import { useNavigate,Link } from 'react-router-dom';
import {Button, } from 'antd';
import tneaLogo from '../assets/Tnea_logo.png';

import {
    LogoutOutlined
} from '@ant-design/icons';

const Navbar = ({onInstructionClick}) => {
    const navigate= useNavigate();

    const handleLogout=()=>{
      try{
        localStorage.removeItem("college");
        navigate('/login', {replace: true});
      }
      catch(err){
        console.error("Logout error:",err);
        navigate('/login', {replace: true});
      }
    };

  return (
    <div style={{height:"62px", padding:"0 24px", backgroundColor:"#fff", display:"flex", alignItems: "center", 
      justifyContent: "space-between", borderBottom:"1px solid #eaeaea", 
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)", position:"sticky",top:0, zIndex:1000}}
    >
      <div style={{display:"flex", alignItems:"center", gap:"10px"}}>
        <img src={tneaLogo} alt="TNEA Logo" style={{height:"40px", width: "auto", cursor:"pointer"}} onClick={()=> navigate('/home')} />
        <span className="text-2xl font-bold text-green-500" style={{fontWeight:600}}>
          TNEA-2026
        </span>
      </div>
      <div style={{display:"flex", alignItems:"center", gap:5}}>
        <Button onClick={onInstructionClick}>
          Instruction
        </Button>
        <Button danger 
          type="primary" 
          icon={<LogoutOutlined/>} 
          onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </div>
  )
}

export default Navbar
