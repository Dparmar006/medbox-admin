import React, { useEffect, useState } from 'react'
import { Card, message, Row, Col, Divider } from 'antd'
import api from '../../util/api'
import { DEFAULT_GUTTER } from '../../util/constants'
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
  useEffect(() => {
    getMedicines()
  }, [])

  return (
    <Row gutter={DEFAULT_GUTTER}>
      {medicines.map(medicine => (
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
              Quantity Available : {medicine.quantityAvailable} {medicine.unit}
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
