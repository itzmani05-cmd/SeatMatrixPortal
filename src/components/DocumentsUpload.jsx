import React,{useState} from 'react'
import {Card, Typography,Table,Button,Upload,message,Space, Progress, Alert} from 'antd'
import{
  UploadOutlined,
  EyeOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

const {Title,Text} =Typography;

const DocumentUpload = ({onPrev,onNext,collegeCode}) => {
  console.log("college code",collegeCode);

  const beforeUpload=(file)=>{
    const isFileLT1MB=file.size/1024/1024<10;
    if(!isFileLT1MB){
      message.error("File must be smaller than 10MB!");
      return Upload.LIST_IGNORE;
    }
    return true;
  }

  const handleUpload=(file, record)=>{
    const updated=documents.map((doc)=>
      doc.key===record.key?{...doc,file}:doc
    );
    setDocuments(updated);
    message.success(`${file.name} selected`);
    return false;
  };

  const handleDelete=(record) => {
    const updated=documents.map((doc) =>
      doc.key=== record.key?{...doc, file:null}: doc
    );
    setDocuments(updated);
    message.info("Document removed");
  };

  const [documents, setDocuments]=useState([
    {key:1, name:"Seat Matrix Form", file:null},
    {key:2, name:"AICTE Approval", file:null},
    {key:3, name: "Anna University Affiliation", file: null },
    {key:4, name: "Accreditation", file: null},
    {key:5, name: "Autonomous Certification", file: null },
  ])

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
          <Button
            type="link"
            icon={<EyeOutlined/>}
            onClick={() =>
              window.open(URL.createObjectURL(record?.file), "_blank")
            }
          >
            View
          </Button>
        ):(
          <Text type="secondary">No document. Upload First</Text>
        )
    },
    {
      title:"Upload / Update",
      render:(_,record)=>(
        record?(
          <Upload
            showUploadList={false}
            beforeUpload={beforeUpload}
            customRequest={async({file,onSuccess, onError}) =>{ 
              try{
                const formData= new FormData();
                formData.append("file",file);
                formData.append("collegeCode", collegeCode);
                formData.append("documentType", record.name);

                const res= await fetch('http://localhost:5000/api/upload',{
                  method:"POST",
                  body:formData,
                });
                if(!res.ok)
                  throw new Error("Upload failed");

                handleUpload(file,record);
                onSuccess("ok");
              }catch(err){
                message.error("Upload failed");
                onError(err);
              }
            }}
          >
            <Button>
              Select File
            </Button>
          </Upload>
        ):null
      )
    },
    {
      title:'Delete',
      render:(_,record)=>
        record?.file && (
          <Button 
            icon={<DeleteOutlined/>}
            onClick={()=>handleDelete(record)}
          />
        )
    }
  ]

  const allFilesUploaded= documents.every(doc=>doc.file);
  const uploadedCount = documents.filter(doc => doc.file).length;

  const progressPercent=Math.round(
    (uploadedCount / documents.length)*100
  );
  

  return (
    <Card>
      <Title level={3} style={{marginBottom:16, textAlign:"center"}}>Documents Upload</Title>
      <Text type="secondary">
        Click on Select File and upload documents (Max size: 1MB)
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
        <Button type="primary" disabled={!allFilesUploaded}>
          Submit changes
        </Button>
      </Space>
    </Card>
  )
}

export default DocumentUpload
