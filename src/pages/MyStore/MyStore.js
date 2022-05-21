import {
  Card,
  Col,
  Divider,
  Empty,
  message,
  Row,
  Table,
  Tag,
  Typography
} from 'antd'
import { render } from 'less'
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import api from '../../util/api'
import { DEFAULT_GUTTER } from '../../util/constants'

const MyStore = () => {
  // const [medicines, setMedicines] = useState([])
  // const [transactions, setTransactions] = useState([])
  const [isLoading, setLoading] = useState(false)
  const store = useSelector(state => state.store)
  const medicines = useSelector(state => state.medicines)
  const user = useSelector(state => state.auth)
  const transactions = useSelector(state => state.transactions)

  // const getMedicines = async () => {
  //   try {
  //     const res = await api.get('/medicines', {
  //       storeId: store.id
  //     })
  //     setMedicines(res.data?.medicines?.slice(0, 8))
  //   } catch (err) {
  //     message.error(err.message)
  //   } finally {
  //     setLoading(false)
  //   }
  // }

  // const getTransactions = async () => {
  //   try {
  //     const res = await api.get('/transactions', {
  //       storeId: store.id
  //     })
  //     setTransactions(res.data?.transactions)
  //   } catch (err) {
  //     message.error(err.message)
  //   } finally {
  //     setLoading(false)
  //   }
  // }

  // useEffect(() => getMedicines(), [])

  // useEffect(() => getTransactions(), [])

  const expandedMedicines = data => {
    const columns = [{ title: 'Name', dataIndex: 'name', key: 'name' }]

    return (
      <Table
        columns={columns}
        dataSource={[{ name: 'Hello' }]}
        pagination={false}
      />
    )
  }

  return (
    <React.Fragment>
      <Card>
        <Row>
          <Col xl={12} md={12} xs={24}>
            <Typography.Title>{store.name}</Typography.Title>
          </Col>
          <Col xl={12} md={12} xs={24}>
            <h3>{`${store?.address?.landmark || 'Your'}, ${store.address
              .addressLine1 || 'Address'}, ${store.address.addressLine2 ||
              'Will be'}, ${store.address.city || 'Here'}`}</h3>

            <h4>
              {`${user.firstName} ${user.lastName}`} - <i> {user.email} </i>
            </h4>
          </Col>
        </Row>
        <Divider orientation='left'>Top 8 medicines</Divider>
        <Row gutter={DEFAULT_GUTTER}>
          {medicines.list.length === 0 ? (
            <Col xl={24} xs={24}>
              <Empty />
            </Col>
          ) : (
            medicines.list.map(medicine => (
              <Col xl={6} md={8} sm={12} xs={24} key={medicine._id}>
                <Card loading={isLoading}>
                  <h3>
                    {medicine.name} - <small>{medicine.brandName}</small>
                  </h3>
                  <p>
                    ₹ {medicine.price} / {medicine.unit}
                  </p>
                  <Divider />
                  <h5>
                    Quantity Available : {medicine.quantityAvailabe}{' '}
                    {medicine.unit}
                  </h5>
                  <h5>
                    Quantity Imported : {medicine.quantityImported}{' '}
                    {medicine.unit}
                  </h5>
                </Card>
              </Col>
            ))
          )}
        </Row>
        <Divider orientation='left'>Transactions</Divider>
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
          expandable={{ expandedMedicines }}
        />
      </Card>
    </React.Fragment>
  )
}

export default MyStore
