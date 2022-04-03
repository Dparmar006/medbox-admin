import React, { useEffect, useState } from 'react'
import BasicLayout from '../../Layout/BasicLayout'
import { Card, message, Row, Col, Divider } from 'antd'
import api from '../../util/api'

const Medicines = () => {
  const [medicines, setMedicines] = useState([])
  const [isLoading, setLoading] = useState(true)

  const getMedicines = async () => {
    try {
      const res = await api.get('/medicines')
      setMedicines(res.data.medicines)
    } catch (err) {
      message.error(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => getMedicines(), [])

  return (
    <Row gutter={16}>
      {medicines.map(medicine => (
        <Col xl={6} key={medicine._id}>
          <Card style={{ marginTop: 16 }} loading={isLoading}>
            <h3>
              {medicine.name} - <small>{medicine.brandName}</small>
            </h3>
            <p>
              ₹ {medicine.price} / {medicine.unit}
            </p>
            <Divider />
            <h5>
              Quantity Available : {medicine.quantityAvailabe} {medicine.unit}
            </h5>
            <h5>
              Quantity Imported : {medicine.quantityImported} {medicine.unit}
            </h5>
          </Card>
        </Col>
      ))}
    </Row>
  )
}

export default Medicines
