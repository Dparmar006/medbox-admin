import React from 'react'
import { Card, Row, Col, Divider, Pagination, Empty } from 'antd'
import { useSelector } from 'react-redux'
import { DEFAULT_GUTTER } from '../../util/constants'
const UsersMedicines = () => {
  const { list, totalMedicines } = useSelector(state => state.medicines)

  return (
    <React.Fragment>
      <Card>
        <Row gutter={DEFAULT_GUTTER} align='stretch'>
          {list.length === 0 ? (
            <Col xl={24} xs={24} style={{ margin: '27vh 0px' }}>
              <Empty />
            </Col>
          ) : (
            list?.map(medicine => (
              <Col xl={6} md={8} sm={12} xs={24} key={medicine._id}>
                <Card>
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
      </Card>
      <br />
      {list.length !== 0 && (
        <Pagination pageSize={20} total={totalMedicines} defaultCurrent={1} />
      )}
    </React.Fragment>
  )
}

export default UsersMedicines
