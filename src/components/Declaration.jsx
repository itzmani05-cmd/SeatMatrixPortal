import React from 'react'
import {Typography, Card,Checkbox,Button, Row, Col, Divider, Tooltip} from 'antd'
import {EyeOutlined, DownloadOutlined} from '@ant-design/icons';
import {useNavigate} from 'react-router-dom';


const {Title, Text} = Typography;

const Declaration = ({collegeData, onPrev, onNext}) => {
  const [accepted, setAccepted]= React.useState(true);

  const navigate =useNavigate();

  const handlePreview=()=>{
    document.activeElement?.blur();
    navigate('/declaration-preview',{
      state: {collegeData},
    });
  };

  const downloadPDF=()=>{
    document.activeElement?.blur();
    navigate('/declaration-preview',{
      state:{collegeData, autoDownload:true},
    })
  }

  return (

    
    <Card>
      <Title level={3} style={{marginBottom:16, textAlign:"center"}}>Declaration</Title>
      <Card bordered style={{borderRadius: 8}}>
        <Row gutter={[16,16]}>
          <Col span={6}>
            <Text strong>College Name</Text>
          </Col>
          <Col span={18}>
            <Text>
              {collegeData?.can || "College Name "}
            </Text>
          </Col>
        </Row>
        <Divider/>

        <Row gutter={[16,16]}>
          <Col span={6}>
            <Text strong>Principal Name</Text>
          </Col>
          <Col span={18}>
            <Text>
              {collegeData?.PrincipalName || "Principal Name "}
            </Text>
          </Col>
        </Row>
        <Divider/>

        <Row>
          <Col span={24}>
            <Checkbox 
              checked={accepted}
              onChange={(e)=>setAccepted(e.target.checked)}
            >
               We declare that we have thoroughly reviewed and verified all seat
              allocation matrix for TNEA and take full responsibility for the
              correctness of the submitted data.
            </Checkbox>
          </Col>
        </Row>

        <Row>
          <Col>
            <Tooltip title="Preview declaration before final submission">
                <Button   
                  icon={<EyeOutlined/>} 
                  onClick={handlePreview}
                  disabled={!accepted}
                >
                  View PDF
                </Button>
              </Tooltip>
          </Col>
        </Row>

        <Row>
          <Col>
            <Tooltip title="Preview declaration before final submission">
                <Button
                  icon={<DownloadOutlined/>}
                  type="primary"
                  onClick={downloadPDF}
                
                >
                  Download / Save as PDF
                </Button>
              </Tooltip>
          </Col>
        </Row>

            
        

        <Row justify="space-between" style={{marginTop: 32}}>
          <Col>
            <Button onClick={onPrev}>
              &lt; Previous
            </Button>
          </Col>
          <Col>
            <Button type="primary" onClick={onNext} disabled={!accepted} style={{
                backgroundColor: "#52c41a",
                borderColor: "#52c41a",
                color: "#fff"}}>
              Next &gt;
            </Button>
          </Col>
        </Row>
      </Card>
    </Card>
  )
}

export default Declaration
