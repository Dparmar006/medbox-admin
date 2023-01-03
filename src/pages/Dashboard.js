import { Card, Col, Row, Table, Tag, Tooltip, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import {
  DollarOutlined,
  MedicineBoxOutlined,
  ShopOutlined,
  TeamOutlined
} from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { displayDate } from '../util/funs'
import { DEFAULT_GUTTER } from '../util/constants'
import { getMedicines } from '../redux/medicines'
import { getTransactions } from '../redux/transactions'
import { Link } from 'react-router-dom'

const Dashboard = () => {
  const medicines = useSelector(state => state.medicines)
  const transactions = useSelector(state => state.transactions)
  const dispatch = useDispatch()
  const [sales, setSales] = useState(0)
  const dashboardCards = [
    {
      icon: <ShopOutlined />,
      title: 'Transactions',
      value: transactions.totalTransactions,
      url: '/billing'
    },
    {
      icon: <DollarOutlined />,
      title: 'Sales',
      value: 'Rs. ' + sales,
      url: '/billing'
    },
    {
      icon: <MedicineBoxOutlined />,
      title: 'Medicines',
      value: medicines.totalMedicines,
      url: '/my-medicines'
    },
    {
      icon: <TeamOutlined />,
      title: 'Pharmacists',
      value: 87,
      url: '/my-medicines'
    }
  ]

  useEffect(() => {
    dispatch(getMedicines())
    dispatch(getTransactions())
  }, [])

  useEffect(() => {
    let totalSales = 0
    transactions.list.map(a => {
      totalSales += a.total
    })
    setSales(totalSales)
  }, [transactions])
  return (
    <Row gutter={DEFAULT_GUTTER} justify='space-between'>
      {dashboardCards.map((card, i) => {
        return (
          <Col xl={6} md={12} xs={12} key={i}>
            <Link to={card.url}>
              <Card style={{ width: '100%' }}>
                <Card.Meta
                  title={card.title}
                  avatar={<h2>{card.icon}</h2>}
                  description={card.value || '0'}
                />
              </Card>
            </Link>
          </Col>
        )
      })}

      <Col xl={12} md={24} sm={24} xs={24}>
        <Card>
          <Typography.Title level={3}>Last transactions</Typography.Title>
          <Table
          loading={transactions.isLoading}
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
        </Card>
      </Col>

      <Col xl={12} md={24} sm={24} xs={24}>
        <Card>
          <Typography.Title level={3}>Medicines</Typography.Title>
          <Table
            loading={medicines.isLoading}
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
        </Card>
      </Col>
    </Row>
  )
}

export default Dashboard
