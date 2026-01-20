import React from 'react'
import {Space, Card, Button,Typography} from 'antd';

const {Title, Text}= Typography;

const Verify = ({CollegeData, onNext, onPrev}) => {
  return (
    <Card>
      <Title level={3} style={{marginBottom:16, textAlign:"center"}}>Verify Details</Title>
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
        
        <Button type="primary" onClick={onNext}>
          Next &gt;
        </Button>
      </div>
    </Card>
  )
}

export default Verify
