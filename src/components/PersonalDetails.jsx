import React, { useState,useEffect } from "react";
import {
  Card,
  Descriptions,
  Space,
  Button,
  Input,
  message,
  Typography, Form
} from "antd";

const {Title, Text}= Typography;

import axios from "axios";

const PersonalDetails = ({ data, onPrev, onNext, onUpdate }) => {
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form]= Form.useForm();

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        PrincipalName: data.PrincipalName,
        Email: data.Email,
        PhoneNumber: data.PhoneNumber,
        District: data.District,
        Pincode: data.Pincode,
        Website: data.Website,
      });
    }
  }, [data, form]);


  const handleCancel = () => {
    form.resetFields();
    setEditing(false);
  };

  const handleSave = async () => {
    try {
      setLoading(true);

      const values= await form.validateFields();

      const res = await axios.put(
        `http://localhost:5000/api/college/${data.ccode}/personal`,
        values
      );

      message.success("Personal details updated");
      if(onUpdate){
        onUpdate(res.data);
      }
      setEditing(false);
    } catch (err) {
      message.error("Update failed in PersonalDetails page");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card >
      <Title level={3} style={{marginBottom:16, textAlign:"center"}}>Personal Details</Title>
      
      <Form
        form={form}
        layout="vertical"
      >

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 ">
          <Form.Item label="College Name" required>
            <Input value={data.can} disabled/>
          </Form.Item>
          <Form.Item label="College Code" required>
            <Input value={data.ccode} disabled/>
          </Form.Item>
          <Form.Item label="College Type" required>
            <Input value={data.Category} disabled/>
          </Form.Item>

          <Form.Item
            label="Principal Name"
            name="PrincipalName"
            rules={[{required: true}]}
          >
            <Input disabled={!editing}/>
          </Form.Item>
          <Form.Item
            label="Email Address"
            name="Email"
            rules={[{required: true, type: "email" }]}
          >
            <Input disabled={!editing}/>
          </Form.Item>

          <Form.Item
            label="Phone Number"
            name="PhoneNumber"
            rules={[
              {required: true, message:"Phone number is required"}, 
              {pattern:/^[0-9]{10}$/, message:"Enter valid phone number"}
            ]}
          >
            <Input disabled={!editing}
              maxLength={10}
              onChange={(e)=>{
                e.target.value= e.target.value.replace(/\D/g,"");
              }}
            />
          </Form.Item>

          <Form.Item
            label="District"
            name="District"
            rules={[{required: true}]}
          >
            <Input disabled={!editing}/>
          </Form.Item>

          <Form.Item
            label="Pincode"
            name="Pincode"
            rules={[{required: true, message: "Pincode is required"},
              {pattern:/^[0-9]{6}$/, message: "Enter a valid 6-digit pincode"}
            ]}
          >
            <Input disabled={!editing} maxLength={6}/>
          </Form.Item>

          <Form.Item
            label="Website"
            name="Website"
            rules={[{required: true, message:"Website is required"},
              {type:"url", message:"Enter a valid website URL"}
            ]}
          >
            <Input disabled={!editing} placeholder="https://example.com"/>
          </Form.Item>
        </div>
      </Form>

      {/* <Descriptions column={2} bordered layout="vertical" >

        <Descriptions.Item label={<span ClassName="font-medium text-gray-700">College Name</span>}>
          <div className="bg-gray-100 px-3 py-2 rounded ">
            {data.can}
          </div>
        </Descriptions.Item>

        <Descriptions.Item label={<span ClassName="font-medium text-gray-700">College Name</span>}>
          {data.ccode}
        </Descriptions.Item>

        <Descriptions.Item label={<span ClassName="font-medium text-gray-700">College Name</span>}>
          {data.Category}
        </Descriptions.Item>

        < Descriptions.Item label={<span ClassName="font-medium text-gray-700">College Name</span>}>
          {editing ? (
            <Input
              value={formData.PrincipalName}
              style={editInputStyle}
              onChange={(e) =>
                handleChange("PrincipalName", e.target.value)
              }
            />
          ) : (
            <span style={{ color: "#262626" }}>
              {data.PrincipalName}
            </span>
          )}
        </Descriptions.Item>

        <Descriptions.Item label={<span ClassName="font-medium text-gray-700">College Name</span>}>
          {editing ? (
            <Input
              value={formData.Email}
              style={editInputStyle}
              onChange={(e) =>
                handleChange("Email", e.target.value)
              }
            />
          ) : (
            <span style={{ color: "#262626" }}>
              {data.Email}
            </span>
          )}
        </Descriptions.Item>

        <Descriptions.Item label={<span ClassName="font-medium text-gray-700">College Name</span>}>
          {editing ? (
            <Input
              value={formData.PhoneNumber}
              style={editInputStyle}
              onChange={(e) =>
                handleChange("PhoneNumber", e.target.value)
              }
            />
          ) : (
            <span style={{ color: "#262626" }}>
              {data.PhoneNumber}
            </span>
          )}
        </Descriptions.Item>

        <Descriptions.Item label={<span ClassName="font-medium text-gray-700">College Name</span>}>
          {editing ? (
            <Input
              value={formData.District}
              style={editInputStyle}
              onChange={(e) =>
                handleChange("District", e.target.value)
              }
            />
          ) : (
            data.District
          )}
        </Descriptions.Item>

        <Descriptions.Item label={<span ClassName="font-medium text-gray-700">College Name</span>}>
          {editing ? (
            <Input
              value={formData.Pincode}
              style={editInputStyle}
              onChange={(e) =>
                handleChange("Pincode", e.target.value)
              }
            />
          ) : (
            data.Pincode
          )}
        </Descriptions.Item>

        <Descriptions.Item label={<span ClassName="font-medium text-gray-700">College Name</span>}>
          {editing ? (
            <Input
              value={formData.Website}
              style={editInputStyle}
              onChange={(e) =>
                handleChange("Website", e.target.value)
              }
            />
          ) : (
            data.Website
          )}
        </Descriptions.Item>
      </Descriptions> */}

      {/* ACTION BAR */}
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
            <Button type="primary" onClick={()=> setEditing(true)}>
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
  );
};

export default PersonalDetails;
