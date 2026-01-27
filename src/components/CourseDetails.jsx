import React, {useState, useEffect} from 'react'
import {Button, Card, Table, Space, Input, InputNumber, Typography} from 'antd';

import {CourseList, SSCourse} from './courseConstants';


const {Title}=Typography;

const CourseDetails = ({courses, onPrev, onNext}) => {

  const [editing, setEditing] = useState(false);
  const [editableCourses, setEditableCourses]= useState(courses);
  const [loading, setLoading]= useState(false);

  useEffect(()=>{
    setEditableCourses(courses);
  },[courses]);

  const handleEdit=()=>{
    setEditableCourses(courses);
    setEditing(true);
  };

  const handleCancel=()=>{
    setEditableCourses(courses);
    setEditing(false);
  };

  const handleSave=()=>{
    setLoading(true);

    setTimeout(()=>{
      console.log("Saved data:", editableCourses);
      setLoading(false);
      setEditing(false);
    },1000);
  };

  const updateField = (index, field, value) => {
    const newData = [...editableCourses];
    newData[index][field] = value;
    setEditableCourses(newData);
  };

  const columns= [
    {
      title: "Course Name",
      dataIndex: "courseName",
      render: (text, record, index) =>
        editing ? (
          <Input
            value={record.courseName}
            onChange={(e) =>
              updateField(index, "courseName", e.target.value)
            }
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
              updateField(index, "intake", value)
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
      
      <Table
        loading={loading}
        dataSource= {editing? editableCourses :courses}
        columns={columns}
        rowKey="courseCode"
        pagination={false}
      />
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
