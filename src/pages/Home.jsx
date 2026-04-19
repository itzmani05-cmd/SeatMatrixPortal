import React,{useState, useEffect} from 'react';
import {Alert, Typography,Drawer} from "antd";
import {useNavigate} from "react-router-dom";
import axios from "axios";

import Navbar from '../components/Navbar';
import DashboardTabs from '../components/DashboardTabs';
import Instruction from '../components/Instructions';
import DashboardSkeleton from '../components/DashboardSkeleton';
import { useAuth } from '../context/AuthContext';
import { backendURL } from '../../backendURL';

const Home = () => {
  const navigate= useNavigate();
  const { auth } = useAuth();
  
  const [collegeData, setCollegeData]= useState(null);
  const [loading, setLoading]= useState(true);
  const [showInstruction, setShowInstruction]= useState(false);

  const ccode= auth.college?.ccode;

  useEffect(()=>{
    if(!ccode){
      navigate("/login", {replace:true});
      return;
    }

    axios
      .get(`${backendURL}/api/college/${ccode}`)
      .then((res)=>{
        setCollegeData(res.data);
        setLoading(false);
        console.log(res.data);
      })
      .catch(()=>{
        // If there's an error fetching data, we might not want to log out immediately 
        // unless it's a 401. But keeping existing logic for now.
        setLoading(false);
      });
  },[ccode, navigate]);

  const [showBanner,setShowBanner]=useState(false);
  useEffect(()=>{
    const isLoggedIn = auth.isLoggedIn;
    const hasSeen = sessionStorage.getItem("infoModelShown");

    if (isLoggedIn && !hasSeen) {
      setShowBanner(true);
      sessionStorage.setItem("infoModelShown", "true");
    }
  },[]);

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
        {showBanner && (
          <Alert
            type="info"
            showIcon
            closable
            banner
            message="Declaration and document upload will be opened soon. Please complete all other steps within the deadline."
            onClose={() => setShowBanner(false)}
            style={{ marginBottom: 16 }}
          />
        )}
        {loading?(
          <DashboardSkeleton/>
        ):(
          <DashboardTabs collegeData={collegeData}/>
        )}
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
