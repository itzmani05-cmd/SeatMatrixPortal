import React,{useState} from 'react'
import {Tabs, Badge, Typography, Button, Space, Alert} from 'antd';

import {
    UserOutlined,
    BankOutlined,
    BookOutlined,
    CheckCircleOutlined,
    FileDoneOutlined,
    UploadOutlined,
    LogoutOutlined
} from '@ant-design/icons';

import PersonalDetails from './PersonalDetails';
import BankDetails from './BankDetails';
import CourseDetails from './CourseDetails';
import Verify from './Verify';
import Declaration from './Declaration';
import DocumentsUpload from './DocumentsUpload';

import {useNavigate} from 'react-router-dom';

const {Title} = Typography;

const DashboardTabs = ({collegeData}) => {
    const navigate= useNavigate();
    const [activeKey, setActiveKey]= useState("1");

    const goToTab=(key)=>{
        setActiveKey(key);
        window.scrollTo(
            {
                top:0,
                behavior:"smooth",
            }
        );
    };

  return (
    <div
        style={{padding:"20px", borderRadius: "8px", }}
    >
        <Title level={3} style={{ margin: "0 16px 16px 0", color:"#002766" }}>
           Seat Matrix Form
        </Title>
        <Alert
            showIcon
            warning
            description="The Declaration and Document Upload sections will be available soon. Please make sure to complete the form on or before the due date."
            type="info"
            style={{margin:"0 16px 16px 0", padding:"8px 16px"}}
        />
            
        <Tabs 
            type="card"
            activeKey={activeKey}
            onChange={setActiveKey}
            style={{marginTop: "16px", marginBottom: "32px"}}
            items={[
                {
                    key:"1",
                    label:(
                        <span style={{display: "flex", alignItems: "center", gap:"8px"}}>
                            <UserOutlined/> Personal Details{" "}
                            {collegeData.PersonalDetailFlag && <Badge status="success"/>}
                        </span>
                    ),
                    children:<PersonalDetails 
                        data={collegeData} 
                        onPrev={null} 
                        onNext={()=> goToTab("2")}
                    />,
                },
                {
                    key: "2",
                    label:(
                        <>
                            <BankOutlined/> Bank Details{" "}
                            {collegeData.BankDetailFlag && <Badge status="success"/>}
                        </>
                    ),
                    children: <BankDetails 
                        bankDetails={collegeData.BankDetails} 
                        ccode={collegeData.ccode}
                        onPrev={()=> goToTab("1")}
                        onNext={()=> goToTab("3")}
                    />,
                },
                {
                    key: "3",
                    label:(
                        <>
                            <BookOutlined /> Course Details
                        </>
                    ),
                    children: <CourseDetails 
                        courses={collegeData.CourseDetails} 
                        onPrev={() => goToTab("2")}
                        onNext={() => goToTab("4")}
                    />,
                },
                {
                    key:"4",
                    label:(
                        <>
                            <CheckCircleOutlined /> Verify
                        </>
                    ),
                    children: <Verify
                        collegeData={collegeData}
                        onPrev={() => goToTab("3")}
                        onNext={() => goToTab("5")}
                    />,
                },
                {
                    key:"5",
                    label:(
                        <>
                            <FileDoneOutlined /> Declaration
                        </>
                    ),
                    children: <Declaration
                        collegeData={collegeData}
                        onPrev={() => goToTab("4")}
                        onNext={() => goToTab("6")}
                    />,
                },
                {
                    key:"6",
                    label:(
                        <>
                            <UploadOutlined /> Documents Upload
                        </>
                    ),
                    children: <DocumentsUpload
                        onPrev={() => goToTab("5")}
                        onNext={null}
                    />
                },
            ]}
        />
    </div>
  );
};

export default DashboardTabs;
