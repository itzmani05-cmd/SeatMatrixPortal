import React from "react";
import {useLocation} from 'react-router-dom';
import { Table, Typography, Divider } from "antd";

const { Title, Text } = Typography;

const DeclarationPDFPreview = () => {
  const {state}= useLocation();

  const collegeData=state?.collegeData;
  const courses=state?.collegeData?.CourseDetails || [];
  console.log("collegeData:",collegeData);
  console.log("Courses:",courses);


  React.useEffect(()=>{
    if(state?.autoDownload){
      const timer= setTimeout(()=>{
        window.print();
      },500);
      return ()=>clearTimeout(timer);
    }
  },[state]);


  if(!collegeData){
    return <div className="">No declaration data available</div>;
  }

  const columns = [
    { title: "Sl", render: (_, __, index) => index + 1 },
    { title: "Course Name", dataIndex: "courseName" },
    { title: "Course Code", dataIndex: "courseCode" },
    { title: "Accreditation", dataIndex: "accredation" },
    { title: "Intake", dataIndex: "intake" },
    { title: "Govt", dataIndex: "Govt" },
    { title: "Surrender", dataIndex: "Surrender" },
    { title: "Management", dataIndex: "Management" },
    { title: "SWS", dataIndex: "SWS" },
  ];

  return (
    <div className="bg-gray-300 flex justify-center p-6 print-area">
      <div
        className="bg-white shadow-lg relative"
        style={{ width: "794px", minHeight: "1123px", padding: "32px" }}
      >
        <div className="border-b pb-4 mb-6">
          <div className="grid grid-cols-[80px_1fr] items-start">
            <img
              src="/Tnea_logo.png"
              alt="TNEA Logo"
              className="h-[64px]"
            />

            <div className="text-center">
              <Title level={4} className="!mb-0">
                Directorate of Technical Education - Chennai
              </Title>
              <Text className="block text-sm">
                Tamil Nadu Engineering Admissions - 2025
              </Text>
            </div>
          </div>

          <div className="text-center mt-4">
            <span className="inline-block px-6 py-1 border-2 border-[#5f8f6a] bg-[#eef7f1] font-semibold tracking-wide mb-10">
              DECLARATION FORM
            </span>
          </div>
        </div>

        <div className="border-2 border-[#5f8f6a] mb-6 ">
          <div className="grid grid-cols-[180px_1fr] border-b-2 border-[#5f8f6a]">
            <div className="bg-[#e6f6ec] px-3 py-2 font-semibold">
              College Code
            </div>
            <div className="px-3 py-2">{collegeData.ccode}</div>
          </div>

          <div className="grid grid-cols-[180px_1fr]">
            <div className="bg-[#e6f6ec] px-3 py-2 font-semibold">
              College Name
            </div>
            <div className="px-3 py-2">{collegeData.can}</div>
          </div>
        </div>

        <div className="text-center font-semibold mb-4 mt-10">
          Course Details
        </div>

        <Table
          columns={columns}
          dataSource={courses}
          pagination={false}
          bordered
          size="small"
        />

        <div className="mt-8 text-sm leading-relaxed text-justify">
          <Text>
            We declare that we have thoroughly reviewed and verified all seat
            allocation matrix for TNEA Admissions. We have ensured that all seats
            have been allocated appropriately and that no further changes will
            be made to the allocation matrix without proper authorization from
            the relevant authorities. We take full responsibility for any errors
            or omissions that may have occurred during the verification process
            and certify that all changes made to the matrix were necessary and
            within the scope.
          </Text>
        </div>

        <div className="flex justify-between mt-20 text-sm">
          <div>Chairman’s Signature</div>
          <div>Principal’s Signature</div>
        </div>

        <div className="absolute bottom-4 left-0 right-0 text-xs text-gray-500 flex justify-between px-8">
          <span>
            Printed on: {new Date().toLocaleString("en-IN")}
          </span>
          <span>Page 1 / 1</span>
        </div>
      </div>
    </div>
  );
};

export default DeclarationPDFPreview;
