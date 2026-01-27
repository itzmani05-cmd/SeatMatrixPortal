import React,{useState, useEffect} from 'react';
import {Card, Typography, Button, Spin, Drawer} from "antd";
import {useNavigate} from "react-router-dom";
import axios from "axios";

import Navbar from '../components/Navbar';
import DashboardTabs from '../components/DashboardTabs';
import Instruction from '../components/Instructions';

const {Title, Text}= Typography;

const Home = () => {
  const navigate= useNavigate();
  
  const [collegeData, setCollegeData]= useState(null);
  const [loading, setLoading]= useState(true);
  const [showInstruction, setShowInstruction]= useState(false);

  const ccode= localStorage.getItem("college");

  useEffect(()=>{
    if(!ccode){
      navigate("/login", {replace:true});
      return;
    }

    axios
      .get(`http://localhost:5000/api/college/${ccode}`)
      .then((res)=>{
        setCollegeData(res.data);
        setLoading(false);
        console.log(res.data);
      })
      .catch(()=>{
        localStorage.removeItem("college");
        navigate("/login",{replace:true});
        setLoading(false);
      });
  },[ccode, navigate]);

  if(loading){
    return <Spin fullscreen/>;
  }


  return (
    <div className="" style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#f5f7fa"
      }}>
      <Navbar onInstructionClick={()=>setShowInstruction(true)}/>
      <div style={{
        flex:1,
        padding:"24px",
        maxWidth:"1400px",
        margin:"0 auto",
        width:"100%"
      }}>
        <DashboardTabs collegeData={collegeData}/>
      </div>
      <Drawer
        title={null}
        onClose={()=>setShowInstruction(false)}
        placement="right"
        width="100%"
        open={showInstruction}
        bodyStyle={{padding:0}}
      >
        <Instruction onClose={()=>setShowInstruction(false)}/>
      </Drawer>
    </div>
    
  )
}

export default Home;
