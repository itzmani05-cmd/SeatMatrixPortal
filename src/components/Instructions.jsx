import {
  Card,
  Typography,
  Button,
  Alert,
  Space,
  Steps,
  Row,
  Col
} from "antd";
import { useEffect } from "react";
import {
  InfoCircleOutlined,
  FileTextOutlined,
  CheckCircleOutlined,
  WarningOutlined,
  ArrowLeftOutlined,
  BankOutlined,
  SolutionOutlined,
  UploadOutlined
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Title, Text, Paragraph } = Typography;
const Instructions = ({onClose}) => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "TNEA | Instructions";
  }, []);

  return (
    <Card
      style={{
        maxWidth: 1100,
        margin: "24px auto",
        minHeight: "100vh",
        background: "#f5f7fa"
      }}
    >
      
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <Button icon={<ArrowLeftOutlined />} onClick={onClose}>
          Back
        </Button>

        <Title level={2} style={{ textAlign: "center" }}>
          Seat Matrix - Instructions
        </Title>

        <Alert
          type="info"
          showIcon
          icon={<InfoCircleOutlined />}
          message="Read Before You Proceed"
          description="Seat matrix details once submitted are subject to verification. Please ensure all information is accurate and supported by official documents."
        />

        <Card>
          <Title level={4}>Submission Flow</Title>
          <Steps
            direction="horizontal"
            labelPlacement="vertical"
            current={0}
            items={[
              {
                title: "Phase 1",
                status:"process",
                description:
                  "Personal, Bank, Course details and verification",
                icon: <SolutionOutlined />
              },
              {
                title: "Phase 2",
                status:"wait",
                description:
                  "Declaration download & document upload",
                icon: <UploadOutlined />
              }
            ]}
          />
        </Card>

        <div>
          <Title level={4}>What You Will Fill</Title>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <Card hoverable style={{height:"100%", background:"#fafafa"}}>
                <BankOutlined style={{ fontSize: 22,}} />
                <Title level={5}>Institution & Bank Details</Title>
                <Text type="secondary">
                  College profile and official bank account information.
                </Text>
              </Card>
            </Col>

            <Col xs={24} md={12}>
              <Card hoverable>
                <FileTextOutlined style={{ fontSize: 22 }} />
                <Title level={5}>Course & Seat Information</Title>
                <Text type="secondary">
                  Approved courses along with intake capacity.
                </Text>
              </Card>
            </Col>

            <Col xs={24} md={12}>
              <Card hoverable>
                <CheckCircleOutlined style={{ fontSize: 22 }} />
                <Title level={5}>Verification</Title>
                <Text type="secondary">
                  Review and confirm entered seat distribution.
                </Text>
              </Card>
            </Col>

            <Col xs={24} md={12}>
              <Card hoverable>
                <UploadOutlined style={{ fontSize: 22 }} />
                <Title level={5}>Declaration & Upload</Title>
                <Text type="secondary">
                  Signed declaration PDF and required documents upload.
                </Text>
              </Card>
            </Col>
          </Row>
        </div>

        <Alert
          type="warning"
          showIcon
          icon={<WarningOutlined />}
          message="Important Rules"
          description={
            <ul style={{ paddingLeft: 20, marginBottom: 0 }}>
              <li>Entered details must strictly match approval documents.</li>
              <li>Only PDF format is accepted for uploads.</li>
              <li>Once submitted, modification requires administrator approval.</li>
              <li>Incorrect data may result in rejection.</li>
            </ul>
          }
        />

        <Card>
          <Paragraph>
            If changes are not reflected immediately, please refresh the page.
          </Paragraph>
          <Paragraph>
            For technical issues, contact{" "}
            <Text strong>TNEA Seat Matrix Technical Support Team</Text>.
          </Paragraph>
        </Card>
        <div
  style={{
    position: "sticky",
    bottom: 0,
    background: "#ffffff",
    padding: "12px 16px",
    borderTop: "1px solid #eaeaea",
    textAlign: "right"
  }}
>
  <Button type="primary" onClick={onClose}>
    I’ve Read & Continue
  </Button>
</div>
      </Space>
    </Card>
  );
};

export default Instructions;
