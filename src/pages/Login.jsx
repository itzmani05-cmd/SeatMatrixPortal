import React, {useEffect, useState} from 'react'
import axios from 'axios'
import TneaLogo from '../assets/Tnea_logo.png'

import {useNavigate} from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {Card, Form, Input, Button, Alert, Typography} from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { backendURL } from "../../backendURL";
const {Title, Text}= Typography;

const Login = () => {
    const { login,auth } = useAuth();
    const [loading, setLoading]= useState(false);
    const [error, setError]= useState("");
    const [success, setSuccess]= useState("");

    const navigate= useNavigate();

    const onFinish= async(values)=>{
        setLoading(true);
        setError("");
        setSuccess("");
        try{
            const res= await axios.post(
                `${backendURL}/api/auth/login`,
                {
                    ccode: values.ccode?.trim(),
                    password: values.password?.trim()
                }
            );
            login(res.data);
        }
        catch(err){
            setError("Invalid college code or password"); 
        }
        finally{
            setLoading(false);
        }
    };

  return (
    <div style={{minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", backgroundColor:"#f5f7fa", flexDirection:"column"}}>
        <Title level={2} style={{marginBottom:"16px" }}>
             Directorate of Technical Education, Chennai
        </Title>
        <div className="" style={{display:"flex", alignItems:"center", justifyContent:"center", gap:10}}>
            <img src={TneaLogo} alt="TNEA-Logo" style={{height:"36px", marginBottom:"8px", borderRadius:"50%", objectFit: "cover"}} />
            <Text strong style={{fontSize:"20px"}}>TNEA - 2026</Text>
        </div>
      <Card style={{width:"480px", borderRadius:"14px", boxShadow:"0 4px 12px rgba(0,0,0,0.1)", padding:"20px", marginTop:"20px"} }>
        
        {error && 
            <Alert title={error} type="error" showIcon style={{marginBottom:16}}
        />}
        {success && 
            <Alert title={success} type="success" showIcon style={{marginBottom:16}} 
        />}

        <Form onFinish={onFinish} layout="vertical">
            <div className="" style={{display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column", marginBottom:"24px"}}>
                <Title level={3} style={{marginBottom:4}}>
                    Sign-In
                </Title>
                <Text type="secondary">
                    Sign in using your college code and password
                </Text>
            </div>
            

            <Form.Item name="ccode" label="College Code" 
                rules={[{
                    required:true, message:"Please enter College code"
                }]}
               style={{marginBottom:16}}
            >
                <Input placeholder="Enter college code" prefix={<UserOutlined/>} />
            </Form.Item> 

            <Form.Item name="password" label="Password" 
                rules={[
                    { required:true, message: "Please enter password" },
                ]}
            >
                <Input.Password placeholder="Enter password" prefix={<LockOutlined/>}/>
            </Form.Item>

            <Form.Item>
                <Button
                    type="primary"
                    htmlType="submit"
                    block
                    loading={loading}
                    size="large"
                    style={{fontSize:"16px", borderRadius:"8px", height:"48px"}}
                >
                    Login
                </Button>
            </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Login
