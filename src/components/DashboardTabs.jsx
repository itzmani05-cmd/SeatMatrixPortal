import React,{useState, useEffect,lazy,Suspense} from 'react'
import {Tabs, Typography,Steps,Card, Alert} from 'antd';

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
import Verify from './Verify';
import Declaration from './Declaration';
import phaseData from "./phaseData";

const CourseDetails = lazy(() => import('./CourseDetails'));
const DocumentsUpload = lazy(() => import('./DocumentsUpload'));

const {Title} = Typography;

const DashboardTabs = ({collegeData}) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const isPhase2Started= new Date()>=phaseData.phase2Start;
    const [activeKey, setActiveKey]= useState("1");

    useEffect(()=>{
        const handleResize=()=>{
            setIsMobile(window.innerWidth<768);
        };
        window.addEventListener("resize", handleResize);    
        return()=>{
            window.removeEventListener("resize", handleResize);
        };  
    },[])

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
        {key: "1",title: "Personal Details", icon: <UserOutlined /> },
        {key: "2",title: "Bank Details", icon: <BankOutlined /> },
        {key: "3",title: "Course Details", icon: <BookOutlined /> },
        {key: "4", title: "Verify", icon: <CheckCircleOutlined /> },
        {key: "5", title: "Declaration", icon: <FileDoneOutlined /> },
        {key: "6", title: "Upload Docs", icon: <UploadOutlined /> }
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
        style={{padding:isMobile?"12px":"24px", borderRadius: "10px"}}
    >
        <Title level={3} style={{ fontSize:isMobile?20:24, color:"#002766", marginBottom:16 }}>
           Seat Matrix Form
        </Title>
        <Alert
            showIcon
            description="The Declaration and Document Upload sections will be available soon. Please make sure to complete the form on or before the due date."
            type="info"
            style={{marginBottom:16, padding:isMobile?"8px":"12px 16px"}}
        />
        <Card
            bodyStyle={{
                overflowX:"auto",
                padding:isMobile?"12px":"16px"
            }}
        >
            <div className="" style={{minWidth: isMobile?600:"auto"}}>
                <Steps 
                    size="small"
                    direction="horizontal"
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
            </div>
            
        </Card>
            
        <Tabs 
            activeKey={activeKey}
            renderTabBar={() => null}
            
            // items={[
            //     {
            //         key:"1",
            //         children:<PersonalDetails 
            //             data={collegeData} 
            //             onPrev={null} 
            //             onNext={()=> goToTab("2")}
            //         />,
            //     },
            //     {
            //         key: "2",
            //         children: <BankDetails 
            //             bankDetails={collegeData.BankDetails} 
            //             ccode={collegeData.ccode}
            //             onPrev={()=> goToTab("1")}
            //             onNext={()=> goToTab("3")}
            //         />,
            //     },
            //     {
            //         key: "3",
            //         children: <CourseDetails 
            //             data={collegeData} 
            //             onPrev={() => goToTab("2")}
            //             onNext={() => goToTab("4")}
            //         />,
            //     },
            //     {
            //         key:"4",
            //         children: isPhase2Started?(<Verify
            //             collegeData={collegeData}
            //             onPrev={() => goToTab("2")}
            //             onNext={() => {
            //                 if(isPhase2Started){
            //                     goToTab("5")
            //                 }
            //                 else{
            //                     message.warning("Verify will be available from Phase 2")
            //                 }
            //             }}
            //         />):(
            //             <PhaseLocked/>  
            //         ),
            //     },
            //     {
            //         key:"5",
            //         children: isPhase2Started?(<Declaration
            //             collegeData={collegeData}
            //             onPrev={() => goToTab("4")}
            //             onNext={() => {
            //                 if(isPhase2Started){
            //                     goToTab("6")
            //                 }
            //                 else{
            //                     message.warning("Declaration will be available from Phase 2")
            //                 }
            //             }}
            //         />):(
            //             <PhaseLocked/>
            //         ),
            //     },
            //     {
            //         key:"6",
            //         children: isPhase2Started?(<DocumentsUpload
            //             onPrev={() => goToTab("5")}
            //             onNext={null}
            //             collegeCode={collegeData.ccode}
            //         />):(
            //             <PhaseLocked/>
            //         )
            //     },
            // ]}
        />
        <div style={{marginTop: "16px", marginBottom: "32px"}}>
            {activeKey === "1" && (
                <PersonalDetails
                    data={collegeData}
                    onNext={() => goToTab("2")}
                />
            )}

            {activeKey === "2" && (
                <BankDetails
                    bankDetails={collegeData.BankDetails}
                    ccode={collegeData.ccode}
                    onPrev={() => goToTab("1")}
                    onNext={() => goToTab("3")}
                />
            )}

            {activeKey === "3" && (
                <Suspense fallback={<div>Loading Course...</div>}>
                    <CourseDetails
                        data={collegeData}
                        onPrev={() => goToTab("2")}
                        onNext={() => goToTab("4")}
                    />
                </Suspense>
            )}

            {activeKey === "4" && (
                isPhase2Started ? (
                    <Verify
                        collegeData={collegeData}
                        onPrev={() => goToTab("3")}
                        onNext={() => goToTab("5")}
                    />
                ) : <PhaseLocked />
            )}

            {activeKey === "5" && (
                isPhase2Started ? (
                    <Declaration
                        collegeData={collegeData}
                        onPrev={() => goToTab("4")}
                        onNext={() => goToTab("6")}
                    />
                ) : <PhaseLocked />
            )}

            {activeKey === "6" && (
                isPhase2Started ? (
                    <Suspense fallback={<div>Loading Document Upload...</div>}>
                        <DocumentsUpload
                            collegeCode={collegeData.ccode}
                            onPrev={() => goToTab("5")}
                        />
                    </Suspense>
                ) : <PhaseLocked />
            )}
        </div>
    </div>
  );
};

export default DashboardTabs;
