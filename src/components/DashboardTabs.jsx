import React,{useState} from 'react'
import {Tabs, Badge, Typography,Steps,Card, Alert, message} from 'antd';

import {
    UserOutlined,
    BankOutlined,
    BookOutlined,
    CheckCircleOutlined,
    FileDoneOutlined,
    UploadOutlined,
} from '@ant-design/icons';

import PersonalDetails from './PersonalDetails';
import BankDetails from './BankDetails';
import CourseDetails from './CourseDetails';
import Verify from './Verify';
import Declaration from './Declaration';
import DocumentsUpload from './DocumentsUpload';
import phaseData from "./phaseData";


const {Title} = Typography;

const DashboardTabs = ({collegeData}) => {
    const isPhase2Started= new Date()>=phaseData.phase2Start;
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

    const steps = [
        { key: "1", title: "Personal Details", icon: <UserOutlined /> },
        { key: "2", title: "Bank Details", icon: <BankOutlined /> },
        { key: "3", title: "Course Details", icon: <BookOutlined /> },
        { key: "4", title: "Verify", icon: <CheckCircleOutlined /> },
        { key: "5", title: "Declaration", icon: <FileDoneOutlined /> },
        { key: "6", title: "Upload Docs", icon: <UploadOutlined /> }
    ];

    const getStepSuccess=(key)=>{
        if(Number(key)<Number(activeKey))
            return 'finish';
        if(key===activeKey)
            return 'process';
        return "wait";
    }

    const PhaseLocked = () => (
        <Alert
            showIcon
            type="warning"
            message="Phase 2 Not Started"
            description="Verify, Declaration and Document Upload will be enabled once Phase 2 begins."
        />
    );


  return (
    <div
        style={{padding:"24px", borderRadius: "10px"}}
    >
        <Title level={3} style={{ margin: "0 16px 16px 0", color:"#002766" }}>
           Seat Matrix Form
        </Title>
        <Alert
            showIcon
            description="The Declaration and Document Upload sections will be available soon. Please make sure to complete the form on or before the due date."
            type="info"
            style={{margin:"0 16px 16px 0", padding:"8px 16px"}}
        />
        <Card>
            <Steps 
                size="small"
                current={Number(activeKey)-1}
                items={steps.map((step)=>({
                    title:step.title,
                    icon:step.icon,
                    status:getStepSuccess(step.key),
                    onClick:()=>{
                        if(
                            Number(step.key)<=Number(activeKey)&&(Number(step.key)<=3||isPhase2Started)
                        )
                        {
                            goToTab(step.key);
                        }
                    }
                }))}
            />
        </Card>
            
        <Tabs 
            activeKey={activeKey}
            renderTabBar={() => null}
            style={{marginTop: "16px", marginBottom: "32px"}}
            items={[
                {
                    key:"1",
                    children:<PersonalDetails 
                        data={collegeData} 
                        onPrev={null} 
                        onNext={()=> goToTab("2")}
                    />,
                },
                {
                    key: "2",
                    children: <BankDetails 
                        bankDetails={collegeData.BankDetails} 
                        ccode={collegeData.ccode}
                        onPrev={()=> goToTab("1")}
                        onNext={()=> goToTab("3")}
                    />,
                },
                {
                    key: "3",
                    children: <CourseDetails 
                        courses={collegeData.CourseDetails} 
                        onPrev={() => goToTab("2")}
                        onNext={() => goToTab("4")}
                    />,
                },
                {
                    key:"4",
                    children: isPhase2Started?(<Verify
                        collegeData={collegeData}
                        onPrev={() => goToTab("3")}
                        onNext={() => {
                            if(isPhase2Started){
                                goToTab("5")
                            }
                            else{
                                message.warning("Verify will be available from Phase 2")
                            }
                        }}
                    />):(
                        <PhaseLocked/>
                        
                    ),
                },
                {
                    key:"5",
                    children: isPhase2Started?(<Declaration
                        collegeData={collegeData}
                        onPrev={() => goToTab("4")}
                        onNext={() => {
                            if(isPhase2Started){
                                goToTab("6")
                            }
                            else{
                                message.warning("Declaration will be available from Phase 2")
                            }
                        }}
                    />):(
                        <PhaseLocked/>
                    ),
                },
                {
                    key:"6",
                    children: isPhase2Started?(<DocumentsUpload
                        onPrev={() => goToTab("5")}
                        onNext={null}
                        collegeCode={collegeData.ccode}
                    />):(
                        <PhaseLocked/>
                    )
                },
            ]}
        />
    </div>
  );
};

export default DashboardTabs;
