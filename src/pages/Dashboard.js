import { Card, Col, Row, Table, Tag, Tooltip, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import {
  DollarOutlined,
  MedicineBoxOutlined,
  ShopOutlined,
  TeamOutlined
} from '@ant-design/icons'
import { useSelector } from 'react-redux'
import { displayDate } from '../util/funs'

const Dashboard = () => {
  const medicines = useSelector(state => state.medicines)
  const transactions = useSelector(state => state.transactions)
  const [sales, setSales] = useState(0)
  const dashboardCards = [
    {
      icon: <ShopOutlined />,
      title: 'Transactions',
      value: transactions.totalTransactions
    },
    {
      icon: <DollarOutlined />,
      title: 'Sales',
      value: 'Rs. ' + sales
    },
    {
      icon: <MedicineBoxOutlined />,
      title: 'Medicines',
      value: medicines.totalMedicines
    },
    {
      icon: <TeamOutlined />,
      title: 'Pharmacists',
      value: 87
    }
  ]

  useEffect(() => {
    let totalSales = 0
    transactions.list.map(a => {
      totalSales += a.total
    })
    setSales(totalSales)
  }, [])
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

      <Col xl={12} md={24} sm={24}>
        <Typography.Title level={2}>Transactions</Typography.Title>
        <Table
          columns={[
            {
              title: 'Customer',
              dataIndex: 'customerName',
              key: 'customerName'
            },
            {
              title: 'Medicines',
              dataIndex: ['medicines'],
              render: value => {
                return value.map(obj => (
                  <Tag color='blue' key={obj.name}>
                    {obj.name}
                  </Tag>
                ))
              }
            },
            {
              title: 'Total',
              dataIndex: 'total'
            }
          ]}
          dataSource={transactions.list}
        />
      </Col>

      <Col xl={12} md={24} sm={24}>
        <Typography.Title level={2}>Medicines</Typography.Title>
        <Table
          columns={[
            {
              title: 'Medicine name',
              dataIndex: 'name',
              key: 'customerName'
            },
            {
              title: 'Available',
              dataIndex: 'quantityAvailable',
              sortOrder: 'descend',
              defaultSortOrder: 'descend',
              render: (value, record) => {
                let message =
                  'Expiration date is yet to come, no need to worry.'
                let color = 'blue'

                if (record.quantityThreshhold > record.quantityAvailable) {
                  message = `Stock is running out, (It's less than ${record.quantityThreshhold})`
                  color = 'red'
                } else if (
                  record.quantityThreshhold > record.quantityAvailable
                ) {
                  message = `Stock has been expired, (Expiration date was ${displayDate(
                    new Date(record.expDate)
                  )})`
                } else if (
                  record.quantityThreshhold >
                  record.quantityAvailable + record.dateThreshhold
                ) {
                  message = `Stock has been expired, (Expiration date was ${displayDate(
                    new Date(record.expDate)
                  )})`
                }

                if (new Date().toISOString() > record.expDate) {
                  message = `Stock has been expired, (Expiration date was ${displayDate(
                    new Date(record.expDate)
                  )})`
                  color = 'red'
                }

                return (
                  <Tooltip title={message}>
                    <Tag color={color} key={value}>
                      {value}
                    </Tag>
                  </Tooltip>
                )
              }
            },
            {
              title: 'Imported',
              dataIndex: 'quantityImported'
            }
          ]}
          dataSource={medicines?.list}
        />
      </Col>
    </Row>
  )
}

export default Dashboard
