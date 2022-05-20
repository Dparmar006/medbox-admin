import { Card, Col, Divider, message, Row } from 'antd'
import React, { useEffect, useState } from 'react'
import LoadingSkeleton from '../../components/LoadingSkeleton'
import api from '../../util/api'
import { DEFAULT_GUTTER } from '../../util/constants'

const Stores = () => {
  const [stores, setStores] = useState([])
  const [isLoading, setLoading] = useState(true)

  const getStores = async () => {
    try {
      const res = await api.get('/stores')
      setStores(res.data.stores)
    } catch (err) {
      message.error(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => getStores(), [])

  return (
    <Row gutter={DEFAULT_GUTTER}>
      {isLoading ? (
        <LoadingSkeleton />
      ) : (
        stores.map(store => (
          <Col xl={6} md={8} sm={12} xs={24} key={store._id}>
            <Card style={{ marginTop: 16 }} loading={isLoading}>
              <h3>
                {store.name} - {store.address.city}
              </h3>
              <Divider />
              <h4>
                {`${store.address.landmark}, ${store.address.addressLine1}, ${store.address.addressLine2}, ${store.address.city}`}
              </h4>
            </Card>
          </Col>
        ))
      )}
    </Row>
  )
}

export default Stores
