import { Card, Col, Divider, Empty, Row, Table, Tag, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { getMedicines } from '../../redux/medicines'
import { getTransactions } from '../../redux/transactions'
import { DEFAULT_GUTTER } from '../../util/constants'

const MyStore = () => {
  const dispatch = useDispatch()
  const store = useSelector(state => state.store)
  const medicines = useSelector(state => state.medicines)
  const user = useSelector(state => state.auth)
  const transactions = useSelector(state => state.transactions)

  useEffect(() => {
    dispatch(getMedicines())
    dispatch(getTransactions())
  }, [])

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
          {!medicines.isLoading && medicines.list.length === 0 ? (
            <Col xl={24} xs={24}>
              <Empty  />
            </Col>
          ) : (
            medicines.list.map(medicine => (
              <Col xl={6} md={8} sm={12} xs={24} key={medicine._id}>
                <Card loading={medicines.isLoading}>
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
          expandable={{ expandedMedicines }}
        />
      </Card>
    </React.Fragment>
  )
}

export default MyStore
