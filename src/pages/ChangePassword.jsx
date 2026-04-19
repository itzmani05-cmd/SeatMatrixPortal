import React, { useState } from "react";
import axios from "axios";
import { Card, Form, Input, Button, Alert, Typography } from "antd";
import { LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { backendURL } from "../../backendURL";

const { Title } = Typography;

const ChangePassword = () => {
  const { auth, markPasswordChanged } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const ccode = auth.college?.ccode;
      if(!ccode){
        setError("Session expired. Please login again.");
        setLoading(false);
        return;
      }
      const res = await axios.post(
        `${backendURL}/api/auth/change-password`,
        {
          ccode,
          oldPassword: values.oldPassword?.trim(),
          newPassword: values.newPassword?.trim(),
        }
      );

      setSuccess(res.data.message);
      markPasswordChanged();
    } catch (err) {
      setError(err.response?.data?.message || "Error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f5f7fa",
      }}
    >
      <Card style={{ width: 400, borderRadius: 12 }}>
        <Title level={3}>Change Password</Title>

        {error && <Alert message={error} type="error" showIcon />}
        {success && <Alert message={success} type="success" showIcon />}

        <Form onFinish={onFinish} layout="vertical">
          <Form.Item
            name="oldPassword"
            label="Old Password"
            rules={[{ required: true, message: "Enter old password" }]}
          >
            <Input.Password prefix={<LockOutlined />} />
          </Form.Item>

          <Form.Item
            name="newPassword"
            label="New Password"
            rules={[
              { required: true, message: "Enter new password" },
              { min: 6, message: "Minimum 6 characters" },
            ]}
          >
            <Input.Password prefix={<LockOutlined />} />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            block
            style={{ marginTop: 10 }}
          >
            Change Password
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default ChangePassword;