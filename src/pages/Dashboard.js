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
import dayjs from 'dayjs'

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

  const medicineStatus = medicine => {
    if (medicine.quantityAvailable < 1) {
      return {
        message: 'We do not have this item.',
        color: 'red'
      }
    }

    if (dayjs().isAfter(dayjs(medicine.expDate))) {
      return {
        message: `Stock has been expired, (Expiration date was ${displayDate(
          medicine.expDate
        )})`,
        color: 'red'
      }
    }

    if (
      dayjs().isAfter(
        dayjs(medicine.expDate).subtract(medicine.dateThreshhold, 'day')
      )
    ) {
      return {
        message: `Stock is running out, (Expiration date was ${displayDate(
          medicine.expDate
        )})`,
        color: 'yellow'
      }
    }

    if (medicine.quantityAvailable <= medicine.quantityThreshhold) {
      return {
        message: `Stock is running out, (${medicine.quantityAvailable} ${medicine.unit} left) `,
        color:
          medicine.quantityAvailable <
          Math.floor(medicine.quantityThreshhold / 2)
            ? 'red'
            : 'yellow'
      }
    }

    return {
      message: 'Everything is good',
      color: 'green'
    }
  }
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
                  const { message, color } = medicineStatus(record)
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
    </Row>
  )
}

export default Dashboard
