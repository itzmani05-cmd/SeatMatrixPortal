import React,{useState, useEffect} from 'react'
import {Card, Typography,Table,Button,Upload,message,Space, Progress, Alert} from 'antd'
import{
  UploadOutlined,
  EyeOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

const {Title,Text} =Typography;

const DocumentUpload = ({onPrev,onNext,collegeCode}) => {
  console.log("college code",collegeCode);
  const [documents, setDocuments]=useState([
    {key:1, name:"Seat Matrix Form", file:null},
    {key:2, name:"AICTE Approval", file:null},
    {key:3, name: "Anna University Affiliation", file: null },
    {key:4, name: "accrediation", file: null},
    {key:5, name: "Autonomous Certification", file: null },
  ])

  const [locked, setLocked]= useState(false);

  useEffect(()=>{
    fetch(`http://localhost:5000/api/upload/upload-status/${collegeCode}`)
      .then(res=>res.json())
      .then(data=>{
        if(!data)
          return;
        if(data.status==="LOCKED"){
          setLocked(true);
        }
        const map={
          seatMatrix:"Seat Matrix Form",
          aicte:"AICTE Approval",
          anna:"Anna University Affiliation",
          accrediation:"Accrediation",
          autonomous:"Autonomous Certification"
        };

        setDocuments(prev=>
          prev.map(doc=>{
            const backendKey=Object.keys(map).find(
              k=>map[k]===doc.name
            );

            return data.documents?.[backendKey]?.uploaded
              ? {...doc, file:{name:"Uploaded"}}
              : doc;
          })
        )
      })
  },[collegeCode]);

  const beforeUpload=(file)=>{
    const isFileLT10MB=file.size/1024/1024<10;
    if(!isFileLT10MB){
      message.error("File must be smaller than 10MB!");
      return Upload.LIST_IGNORE;
    }
    return true;
  }

  const handleUpload=async(file, record)=>{
    try{
      const formData= new FormData();
      formData.append("file", file);
      formData.append("collegeCode", collegeCode);
      formData.append("documentType", record.name);

      const res= await fetch("http://localhost:5000/api/upload",{
        method:"POST",
        body:formData
      });

      if(!res.ok){
        throw new Error();
      }
      setDocuments(prev=>
        prev.map(doc=>
          doc.key===record.key? {...doc, file}:doc
        )
      );
      message.success(`${record.name} uploaded`);
    }catch(err){
      message.error("Upload failed");
    }

  }

  const handleDelete=(record) => {
    const updated=documents.map((doc) =>
      doc.key=== record.key?{...doc, file:null}: doc
    );
    setDocuments(updated);
    message.info("Document removed");
  };

  const handleSubmit=async()=>{
    const res=await fetch(
      `http://localhost:5000/api/submit/${collegeCode}`,
        {method:"POST"}
    );
    if(!res.ok){
      message.error("Please upload all documents");
      return;
    }
    message.success("Documents submitted successfully");
    setLocked(true);
    onNext();
  }
  

  const columns=[
    {
      title:"SNo",
      dataIndex: "key",
      width:60
    },
    {
      title:"Details",
      dataIndex: "name",
    },
    {
      title:"View the Document",
      render:(_,record)=>
        record?.file?(
          <Text type="success">Uploaded</Text>
        ):(
          <Text type="secondary">Not uploaded</Text>
        )
    },
    {
      title:"Upload / Edit",
      render:(_,record)=>
        !locked&&(
          <Upload
            showUploadList={false}
            beforeUpload={beforeUpload}
            customRequest={({file}) =>{ 
              handleUpload(file, record)}}
          >
            <Button icon={<UploadOutlined/>}>
              {record.file?"Replace":"Upload"}
            </Button>
          </Upload>
        
      )
    },
    {
      title:'Delete',
      render:(_,record)=>
        record?.file && !locked &&(
          <Button 
            icon={<DeleteOutlined/>}
            onClick={()=>handleDelete(record)}
          />
        )
    }
  ];

  const allFilesUploaded= documents.every(doc=>doc.file);
  const uploadedCount = documents.filter(doc => doc.file).length;

  const progressPercent=Math.round(
    (uploadedCount / documents.length)*100
  );
  

  return (
    <Card>
      <Title level={3} style={{marginBottom:16, textAlign:"center"}}>
        Documents Upload
      </Title>
      <Text type="secondary">
        Click on Select File and upload documents (Max size: 10MB)
      </Text>

      <Card bordered style={{marginTop:20}}>
        <Space 
          style={{width:"100%", display:"flex", justifyContent:"space-between"}}
          align="center"
        >
          <Space direction="vertical">
            {!allFilesUploaded?(
              <Alert
                type="warning"
                message="Submit will be enabled only after all documents are uploaded."
                showIcon
              />
            ):(
              <Alert
                type="success"
                message="All documents uploaded. You can submit now."
                showIcon
              />
            )}
            <Text type="secondary">
              Uploaded {uploadedCount} / {documents.length} documents
            </Text>
          </Space>  
          <Progress 
            type="circle" 
            width={40} 
            percent={progressPercent}
            status={allFilesUploaded? "success":"active"}
          />
        </Space> 
      </Card>

      <Table
        rowKey="key"
        columns={columns}
        pagination={false}
        dataSource={documents}
        style={{marginTop:20}}
        bordered
      />
      <Space style={{width:"100%", display:"flex",justifyContent:"space-between",marginTop:16}}>
        <Button onClick={onPrev}>
          &lt; Previous
        </Button>
        <Button type="primary" disabled={!allFilesUploaded||locked} onClick={handleSubmit}>
          Submit changes
        </Button>
      </Space>
    </Card>
  )
}

export default DocumentUpload
