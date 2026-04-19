import React from 'react'
import {Card,Skeleton} from 'antd';

const DashboardSkeleton = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <Card>
        <Skeleton active paragraph={{ rows: 3 }} />
      </Card>

      <Card>
        <Skeleton active paragraph={{ rows: 4 }} />
      </Card>

      <Card>
        <Skeleton active paragraph={{ rows: 2 }} />
      </Card>
    </div>
  )
}

export default DashboardSkeleton
