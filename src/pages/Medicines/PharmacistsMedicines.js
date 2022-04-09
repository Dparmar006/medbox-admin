import React, { useState } from 'react'
import { Card, Row, Col, Divider, Pagination } from 'antd'
import { useSelector } from 'react-redux'
const UsersMedicines = () => {
  const { list, totalMedicines } = useSelector(state => state.medicines)

  return (
    <React.Fragment>
      <Row gutter={16}>
        {list?.map(medicine => (
          <Col xl={6} md={8} sm={12} xs={24} key={medicine._id}>
            <Card style={{ marginTop: 16 }}>
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
      <br />
      <Pagination pageSize={20} total={totalMedicines} defaultCurrent={1} />
    </React.Fragment>
  )
}

export default UsersMedicines
