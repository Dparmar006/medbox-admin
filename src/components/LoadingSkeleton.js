import { Card, Col, Row, Skeleton } from 'antd'
import React, { useEffect, useMemo } from 'react'

const LoadingSkeleton = (numberOfCards = 8) => {
  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8]

  return (
    <React.Fragment>
      {/* <Row gutter={24}> */}
      {skeletons.map(skeleton => {
        return (
          <Col xl={6} md={12} xs={24} style={{ marginBottom: '24px' }}>
            <Card style={{ width: '100%' }} loading={true}></Card>
          </Col>
        )
      })}
      {/* </Row> */}
    </React.Fragment>
  )
}

export default LoadingSkeleton
