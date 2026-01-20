import { Card, Divider, List, Typography } from "antd";
import { useEffect } from "react";

const { Title, Text, Paragraph } = Typography;

const Instructions = () => {
  useEffect(() => {
    document.title = "TNEA | Instructions";
  }, []);

  const seatMatrix = [
    "Personal Details – To enter basic details of college",
    "Bank Details – To enter the bank account information",
    "Course Details – To enter offered courses by the college and total number of seats",
    "Verify Details – To verify the seat distribution",
    "Declaration Section – Download the PDF of entered courses, get it signed by the principal and upload in next section",
    "Document Upload Section – Upload all applicable documents in PDF format",
  ];

  const phases = [
    "Phase 1 – Personal Details, Bank Details, Course Details and Verify section will be enabled",
    "Phase 2 – Declaration and Document Upload section will be enabled",
  ];

  return (
    <div style={{ maxWidth: 1000, margin: "20px auto" }}>
      <Title level={2} style={{ textAlign: "center" }}>
        Instructions
      </Title>

      <Divider />

      {/* Seat Matrix Section */}
      <Card title="Seat Matrix Sections" style={{ marginBottom: 24 }}>
        <Paragraph>
          Seat matrix contains the following <Text strong>6 sections</Text>:
        </Paragraph>

        <List
          dataSource={seatMatrix}
          renderItem={(item) => (
            <List.Item>{item}</List.Item>
          )}
        />
      </Card>

      {/* Phase Distribution */}
      <Card title="Phase Distribution">
        <List
          dataSource={phases}
          renderItem={(item) => (
            <List.Item>{item}</List.Item>
          )}
        />

        <Divider />

        <Paragraph>
          If any issue persists in data updating, please refresh once to view the
          latest changes.
        </Paragraph>

        <Paragraph>
          For any issues, please contact the{" "}
          <Text strong>TNEA Seat Matrix Technical Team</Text>.
        </Paragraph>
      </Card>
    </div>
  );
};

export default Instructions;
