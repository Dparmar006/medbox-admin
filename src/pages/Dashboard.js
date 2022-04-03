import { Card, Col, Row } from 'antd'
import React from 'react'
import BasicLayout from '../Layout/BasicLayout'
import {
  DollarOutlined,
  MedicineBoxOutlined,
  ShopOutlined,
  TeamOutlined
} from '@ant-design/icons'

const Dashboard = () => {
  const dashboardCards = [
    {
      icon: <ShopOutlined />,
      title: 'Stores',
      value: 298
    },
    {
      icon: <MedicineBoxOutlined />,
      title: 'Medicines',
      value: 7987
    },
    {
      icon: <TeamOutlined />,
      title: 'Pharmacists',
      value: 87
    },
    {
      icon: <DollarOutlined />,
      title: 'Sales',
      value: '87 K'
    }
  ]
  return (
    <Row gutter={24} justify='space-between'>
      {dashboardCards.map(card => {
        return (
          <Col xl={6} md={12} xs={24} style={{ marginBottom: '1rem' }}>
            <Card style={{ width: '100%' }}>
              <Card.Meta
                title={card.title}
                avatar={<h2>{card.icon}</h2>}
                description={card.value}
              />
            </Card>
          </Col>
        )
      })}
    </Row>
  )
}

export default Dashboard
