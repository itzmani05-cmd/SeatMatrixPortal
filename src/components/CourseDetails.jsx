import React, {useState,useMemo ,useEffect} from 'react'
import {Form,Row,Col,Button, Card, Table, Space, Input, InputNumber, Typography, Select, Empty} from 'antd';
import {DeleteOutlined} from '@ant-design/icons';
import {toast} from 'react-toastify';
import {backendURL} from '../Backendurl';
import {CourseList, SSCourse} from './courseConstants';


const {Title}=Typography;

const GOVTSeats = {
    "CENTRAL GOVT": 0.5,
    CHRISTIAN: 0.5,
    GOVT: 1,
    "GOVT AIDED": 1,
    HINDI: 0.5,
    JAIN: 0.5,
    MALAYALAM: 0.5,
    "MALAYALAM LINGUISTIC": 0.5,
    MIN: 0.5,
    MUSLIM: 0.5,
    NM: 0.65,
    SOWRASHTRA: 0.5,
    TELUGU: 0.5,
    UNIV: 1,
    IRTT: 0.65,
    SS: 0.7,
  };

  const AccredationOptions=[
    {
      value:"ACC",
      label:"Accredited"
    },
    {
      value:"NACC",
      label:"Non - Accredited"
    },
  ];

  const EMPTY_COURSE={
    courseName:"",
    courseCode:"",
    accredation:"",
    intake:"",
    surrender:0,
  };

  const computeSeats= ({intake, surrender, courseName, clgCAT})=>{
    if(!intake){
      return {
        Govt:"",
        Management:"",
        SWS:"",
        Quota:0,
        Pending:0
      };
    }
    const quota= courseName.include("(SS)")?0.7:GOVTSeats[clgCAT];
    const management= Math.max(intake-govt-surrender,0);
    const sws= govt+surrender;

    return{
      Govt: govt,
      Management:management,
      SWS:sws,
      Quota:quota,
      Pending:(intake*quota)%1,
    };
  };

const CourseDetails = ({courses, onPrev, onNext}) => {
  const [loading, setLoading]= useState(true);
  const [dirty, setDirty]= useState(false);
  const [clgCAT, setClgCAT]= useState("NM");
  const [courses, setCourses]= useState([EMPTY_COURSE]);

  const baseCourseList= useMemo(()=>{
    if(data?.Category==="GOVT AIDED"){
      return [...SSCourse, ...CourseList];
    }
    return CourseList;
  },[data]);

  const availableCourses=useMemo(()=>{
    const usedCodes=courses.map((c)=>
      c.courseCode).filter(Boolean);
    return baseCourseList.filter((c)=>!usedCodes.includes(c.value));
  },[courses, baseCourseList]);

  useEffect(()=>{
    if(courses){
      setClgCAT(data.Category||"NM");
      setCourses(
        Array.isArray(data.CourseDetails)&&data.CourseDetails.length?data.CourseDetails: [EMPTY_COURSE]
      );
    }
    setLoading(false);
  },[courses]);

  const updateRow = (index, changes) => { setCourses((prev) => prev.map((row, i) => (i === index ? { ...row, ...changes } : row)) ); setDirty(true); };

  const isValid=()=>{
    for(let c of courses){
      if(!c.courseName || !c.accredation||c.intake){
        toast.error("Please fill all required fields");
        return false;
      }
    }
    return true;
  };

  const onCourseChange=(value, option, index)=>{
    updateRow(index, {
      courseName: option.label,
      courseCode:value,
      accredation:"",
      intake:"",
      surrender:0,
    });
  };

  const onIntakeChange=(value, index)=>{
    const intake=Math.abs(Number(value)||"");
    updateRow(index,{intake, surrender:0});
  };

  const onSurrenderChange=(value, index)=>{
    const surrender=Math.abs(Number(value)||"");
    updateRow(index, {surrender})
  }

  const addCourse=()=>{
    setCourses(prev=>[...prev, EMPTY_COURSE]);
    setDirty(true);
  }

  const removeCourse=()=>{
    setCourses(prev=>prev.filter((_,i)=>i!==index));
  }

  const onSubmit=async()=>{
    if(!isValid())
      return;
    const payload={

    }
  }

  const columns= [
    {
      title: "Course Name",
      dataIndex: "courseName",
      render: (text, record, index) =>
        editing ? (
          <Select
            value={record.courseName}
            options={ALL_COURSE.map(c=>({
              label:c.label,
              value:c.label
            }))}
            onChange={(value) =>
              updateCourseName(index,value)
            }
            showSearch
            optionFilterProp="label"
          />
        ) : (
          text
        )
    },
    {
      title: "Code", 
      dataIndex:"courseCode",
      render: (text)=> text
    },
    {
      title: "Intake",
      dataIndex: "intake",
      render: (text, record, index) =>
        editing ? (
          <InputNumber
            min={0}
            value={record.intake}
            onChange={(value) =>
              updateWithSeats(index, {intake:value, Surrender:0})
            }
          />
        ) : (
          text
        )
    },
    {
      title: "Govt",
      dataIndex: "Govt",
      render: (text, record, index) =>
        editing ? (
          <InputNumber
            min={0}
            value={record.Govt}
            onChange={(value) =>
              updateField(index, "Govt", value)
            }
          />
        ): (
          text
        )
    },
    {
      title: "Surrender",
      dataIndex: "Surrender",
      render: (text, record, index) =>
        editing ? (
          <InputNumber
            min={0}
            value={record.Surrender}
            onChange={(value) =>
              updateField(index, "Surrender", value)
            }
          />
        ) : (
          text
        )
    },
    {
      title: "Management",
      dataIndex: "Management",
      render: (text, record, index) =>
        editing ? (
          <InputNumber
            min={0}
            value={record.Management}
            onChange={(value) =>
              updateField(index, "Management", value)
            }
          />
        ) : (
          text
        )
    },
    {
      title: "Accrediation",
      dataIndex: "accredation",
      render: (text, record, index) =>
        editing ? (
          <Input
            value={record.accredation}
            onChange={(e) =>
              updateField(index, "accredation", e.target.value)
            }
          />
        ) : (
          text
        )
    },
  ];

  

  return (
    <Card>
      <Title level={3} style={{marginBottom:16, textAlign:"center"}}>Course Details</Title>
      
      {loading?(
        <div className="flex justify-center">
          <Spin size="large"/>
        </div>
      ):(
        <Form onFinish={onSubmit}>
          <Table
            loading={loading}
            dataSource= {courses}
            columns={columns}
            rowKey="courseCode"
            pagination={false}
          />
        </Form>
        
      )}

      <div
        style={{
          marginTop: 24,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Button onClick={onPrev} disabled={!onPrev}>
          &lt; Previous
        </Button>

        <Button onClick={addCourse}>
          Add Course+
        </Button>
          
       <Space>
        {!editing ? (
          <Button type="primary" onClick={handleEdit}>
            Edit
         </Button>
        ):(
        <>
          <Button onClick={handleCancel}>
            Cancel
          </Button>
          <Button
            type="primary"
            onClick={handleSave}
            loading={loading}
          >
            Save
          </Button>
        </>
      )}
      <Button type="primary" onClick={onNext} disabled={editing}>
       Next &gt;
      </Button>
     </Space>
      </div>
      
    </Card>

  )
}

export default CourseDetails;
