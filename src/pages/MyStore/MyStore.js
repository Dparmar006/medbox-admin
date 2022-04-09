import { Card, Col, Divider, message, Row, Typography } from 'antd'
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import api from '../../util/api'

const MyStore = () => {
  const [medicines, setMedicines] = useState([])
  const [isLoading, setLoading] = useState(true)
  const store = useSelector(state => state.store)
  const user = useSelector(state => state.auth)
  const getMedicines = async () => {
    try {
      const res = await api.get('/medicines', {
        storeId: store.id
      })
      setMedicines(res.data.medicines?.slice(0, 20))
    } catch (err) {
      message.error(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => getMedicines(), [])

  return (
    <React.Fragment>
      <Card>
        <Row>
          <Col xl={12} md={12} xs={24}>
            <Typography.Title>{store.name}</Typography.Title>
          </Col>
          <Col xl={12} md={12} xs={24}>
            <h3>{`${store.address.landmark}, ${store.address.addressLine1}, ${store.address.addressLine2}, ${store.address.city}`}</h3>

            <h4>
              {`${user.firstName} ${user.lastName}`} - <i> {user.email} </i>
            </h4>
          </Col>
        </Row>
        <Divider orientation='left'>Top 20 medicines</Divider>
        <Row gutter={16}>
          {medicines.map(medicine => (
            <Col xl={6} md={8} sm={12} xs={24} key={medicine._id}>
              <Card style={{ marginTop: 16 }} loading={isLoading}>
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
          ))}
        </Row>
      </Card>
    </React.Fragment>
  )
}

export default MyStore
