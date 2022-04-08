import React from 'react'

const Bill = () => {
  return (
    <Card style={{ height: '69vh' }}>
      <Row>
        <Col xl={12}>
          <Typography.Title level={2}>{store.name}</Typography.Title>
        </Col>
        <Col xl={12}>
          <Typography.Text strong>21/04/2001</Typography.Text> <br />
          <Typography.Text strong>
            {store.address.landmark}
          </Typography.Text>,{' '}
          <Typography.Text strong>{store.address.addressLine1}</Typography.Text>
          ,{' '}
          <Typography.Text strong>{store.address.addressLine2}</Typography.Text>
          , <Typography.Text strong>{store.address.city}</Typography.Text>
        </Col>
      </Row>
      <Divider />
      <Table
        pagination={false}
        columns={[
          {
            title: 'Item',
            dataIndex: 'medicine',
            render: value => {
              return list.find(med => med._id === value)?.name
            }
          },
          { title: 'Quantity', dataIndex: 'quantity' },
          { title: 'Price', dataIndex: 'price' }
        ]}
        dataSource={medicines}
      />
    </Card>
  )
}

export default Bill
