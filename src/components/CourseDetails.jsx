import React, {useState,useMemo ,useEffect} from 'react'
import {Form,Button, Card, Table,Grid, Space, InputNumber, Typography, Select, Empty, Spin} from 'antd';
import {DeleteOutlined} from '@ant-design/icons';
import {toast} from 'react-toastify';
import {CourseList, SSCourse} from './CourseConstants';
import { backendURL } from '../../backendURL';

const {Title}=Typography;
const {useBreakpoint}= Grid;

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

const onSubmit=()=>{};
const computeSeats= ({intake, surrender, courseCode, clgCAT})=>{
  if(!intake){
    return {
      Govt:"",
      Management:"",
      SWS:"",
      Quota:0,
      Pending:0
    };
  }
  const quota= courseCode?.includes("SS")?0.7:GOVTSeats[clgCAT] || 0;
  const govt= Math.floor(intake*quota);
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

const CourseDetails = ({data, onPrev, onNext}) => {
  const [loading, setLoading]= useState(true);
  const [dirty, setDirty]= useState(false);
  const [clgCAT, setClgCAT]= useState("NM");
  const [courseRows, setCourseRows]= useState([]);
  const [editing, setEditing] = useState(false);

  const handleEdit = () => setEditing(true);

  const handleCancel = () => {
    setEditing(false);
    toast.info("Edit cancelled");
  };

  const handleSave = async() => {
    if (!isValid()) 
      return;
    try{
      setLoading(true);
      const updatedCourses=courseRows.map((course)=>{
        const result=computeSeats({
          intake:course.intake,
          surrender:course.surrender,
          courseCode:course.courseCode,
          clgCAT,
        });
        return {
          ...course,
          Govt:result.Govt,
          Management:result.Management,
          SWS:result.SWS,
          Pending:Number(result.Pending.toFixed(2)),
        };
      });
      const res= await fetch(`${backendURL}/api/college/${data.ccode}/courses`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({CourseDetails:updatedCourses})
      });

      if(!res.ok){
        throw new Error("Failed to save");
      }
      setEditing(false);
      setDirty(false);
      toast.success("Saved successfully");
    }
    catch(err){
      toast.error("Failed to save course details");
      return;
    }
    finally{
      setLoading(false);
    }
  };

  const baseCourseList= useMemo(()=>{
    if(data?.Category==="GOVT AIDED"){
      return [...SSCourse, ...CourseList];
    }
    return CourseList;
  },[data]);

  const availableCourses=useMemo(()=>{
    const usedCodes=courseRows.map((c)=>
      c.courseCode).filter(Boolean);
    return baseCourseList.filter((c)=>!usedCodes.includes(c.value));
  },[courseRows, baseCourseList]);

  useEffect(()=>{
    console.log("CourseDetails data", data);
    if(!data){
      setCourseRows([{...EMPTY_COURSE}]);
      setLoading(false);
      return;
    }
    setClgCAT(data.Category||"NM");
    const courses =
      Array.isArray(data.CourseDetails) && data.CourseDetails.length > 0
        ? data.CourseDetails.map(c => ({
            courseName: c.courseName || "",
            courseCode: c.courseCode || "",
            accredation: c.accredation || "",
            intake: c.intake || "",
            surrender: c.surrender || 0
          }))
        : [{ ...EMPTY_COURSE }];
    
    setCourseRows(courses); 
    setLoading(false);
  },[data]);

  const updateRow = (index, changes) => { 
    setCourseRows((prev) => 
      prev.map((row, i) => (i===index 
        ? { ...row, ...changes } 
        : row
      )) 
    );
    setDirty(true); 
  };

  const isValid=()=>{
    for(let c of courseRows){
      if(!c.courseName || !c.accredation|| !c.intake){
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
    const intake=Math.abs(Number(value)||0);
    updateRow(index,{intake, surrender:0});
  };

  const onSurrenderChange=(value, index)=>{
    const surrender=Math.abs(Number(value)||0);
    updateRow(index, {surrender})
  }

  const addCourse=()=>{
    setCourseRows(prev=>[...prev,{...EMPTY_COURSE}]);
    setDirty(true);
  }

  const removeCourse=(index)=>{
    setCourseRows(prev=>prev.filter((_,i)=>i!==index));
  }

  const columns = [
  {
    title: "Course",
    width:280,
    ellipsis:true,
    render: (_, record, index) => {
      const currentOption= baseCourseList.find(
        c=>c.value===record.courseCode
      );

      const options= currentOption?[currentOption, ...availableCourses]:availableCourses;
      return (
        <Select
          value={record.courseCode}
          placeholder="Select Course"
          options={options}
          disabled={!editing}
          onChange={(value, option) =>
            onCourseChange(value, option, index)
          }
          style={{ width: "100%" }}
          showSearch
          optionFilterProp="label"
          dropdownMatchSelectWidth={false}
        />
      )
     }
  },
  {
    title: "Course Code",
    dataIndex: "courseCode",
    align: "center",
    width:100,
    render: (text) => text || "-",
  },
  {
    title: "Intake",
    width:100,
    render: (_, record, index) => (
      <InputNumber
        min={0}
        disabled={!editing}
        value={record.intake}
        onChange={(v) => onIntakeChange(v, index)}
        style={{width:"100%"}}
      />
    ),
  },
  {
    title: "Surrender",
    width:100,
    render: (_, record, index) => (
      <InputNumber
        min={0}
        disabled={!editing}
        value={record.surrender}
        onChange={(v) => onSurrenderChange(v, index)}
        style={{width:"100%"}}
      />
    ),
  },

  {
    title: "Accreditation",
    width:180,
    render: (_, record, index) => (
      <Select
        value={record.accredation}
        options={AccredationOptions}
        disabled={!editing}
        onChange={(v) =>
          updateRow(index, { accredation: v })
        }
      />
    ),
  },
  {
    title: "Govt",
    width:100,
    align: "center",
    render: (_, record) => {
      const { Govt } = computeSeats({
        intake: record.intake,
        surrender: record.surrender,
        courseCode: record.courseCode,
        clgCAT,
      });
      return Govt;
    },
  },

  {
    title: "Management",
    width:130,
    align: "center",
    render: (_, record) => {
      const { Management } = computeSeats({
        intake: record.intake,
        surrender: record.surrender,
        courseCode: record.courseCode,
        clgCAT,
      });
      return Management;
    },
  },

  {
    title: "SWS",
    width:100,
    align: "center",
    render: (_, record) => {
      const { SWS } = computeSeats({
        intake: record.intake,
        surrender: record.surrender,
        courseCode: record.courseCode,
        clgCAT,
      });
      return SWS;
    },
  },
  {
    title: "Pending",
    width:100,
    align: "center",
    render: (_, record) => {
      const { Pending } = computeSeats({
        intake: record.intake,
        surrender: record.surrender,
        courseCode: record.courseCode,
        clgCAT,
      });

      return Pending ? Pending.toFixed(2) : "-";
    },
  },
  {
    title: "Action",
    width:80,
    render: (_, __, index) =>
      editing ? (
        <Button danger onClick={() => removeCourse(index)}>
          <DeleteOutlined />
        </Button>
      ) : null,
  },
  ];

  const screens= useBreakpoint();
  const isMobile= !screens.md;

  return (
    <Card>
      <Title level={3} style={{marginBottom:16, textAlign:"center"}}>Course Details</Title>
      
      {loading?(
        <div className="flex justify-center">
          <Spin size="large"/>
        </div>
      ):(
        <>
          <Form onFinish={onSubmit}>
            <Table
              loading={loading}
              dataSource= {courseRows}
              columns={columns}
              rowKey={(record, index)=>`${record.courseCode}-${index}`}
              pagination={false}
              size={isMobile?"small":"middle"}
              scroll={isMobile?{x: "900"}:undefined}
            />
          </Form>

        <div
          style={{
            marginTop: 24,
            display: "flex",
            justifyContent: "space-between",
            gap: 12,
            flexDirection: isMobile?"column":"row",
            alignItems:isMobile?"stretch":"center"}}
        >
          <Button onClick={onPrev} disabled={!onPrev}>
            &lt; Previous
          </Button>

          {editing &&(
            <Button onClick={addCourse}>
              Add Course+
            </Button>
          )}
            
        <Space
          direction={isMobile?"vertical":"horizontal"}
          size="middle"
          style={{width:isMobile?"100%":undefined, display:"flex", justifyContent:"center"}}
        >
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
    </>
  )}  
    </Card>
  )
}

export default CourseDetails;
