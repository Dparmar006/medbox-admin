import { MinusCircleOutlined } from '@ant-design/icons'
import { Button, Card, Col, Form, Input, Row, Select, Typography } from 'antd'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'

const Billing = () => {
  const [billingInformation, setBillingInfomartion] = useState([])
  const [form] = Form.useForm()
  const { list } = useSelector(state => state.medicines)

  return (
    <Row gutter={24}>
      <Col xl={12} md={12} xs={24}>
        <Form
          form={form}
          layout='vertical'
          autoComplete='off'
          onFieldsChange={(e, b) => {
            setBillingInfomartion(form.getFieldsValue().medicines)
          }}
        >
          <Card>
            <Row gutter={12}>
              <Col xl={12} xs={12}>
                <Form.Item
                  name='name'
                  label='Customer name'
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col xl={12} xs={12}>
                <Form.Item
                  name='email'
                  label='Customer email'
                  help='Invoice will be sent here'
                >
                  <Input type='email' />
                </Form.Item>
              </Col>
              {/* <Col xl={12} xs={12}>
                <Form.Item name='phone' label='Customer phone'>
                  <Input type='tel' />
                </Form.Item>
              </Col> */}
            </Row>
          </Card>
          <Card style={{ marginTop: '1rem' }}>
            <Form.List name={'medicines'}>
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Row gutter={12} key={key}>
                      <Col xl={13} xs={8}>
                        <Form.Item
                          {...restField}
                          name={[name, 'medicine']}
                          label='Medicine'
                          rules={[{ required: true }]}
                        >
                          <Select showSearch>
                            {list?.map(medicine => (
                              <Select.Option
                                key={medicine._id}
                                value={medicine._id}
                              >
                                {medicine.name}
                              </Select.Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col xl={5} xs={8}>
                        <Form.Item
                          {...restField}
                          name={[name, 'quantity']}
                          label='Quantity'
                          initialValue={1}
                          rules={[{ required: true }]}
                        >
                          <Input type='number' />
                        </Form.Item>
                      </Col>
                      <Col xl={5} xs={8}>
                        <Form.Item
                          {...restField}
                          name={[name, 'price']}
                          label='Price'
                          rules={[
                            { required: true, message: 'Price is required' }
                          ]}
                        >
                          <Input type='number' />
                        </Form.Item>
                      </Col>
                      <Col xl={1} xs={1}>
                        <Form.Item style={{ marginTop: '1.8rem' }}>
                          <MinusCircleOutlined onClick={() => remove(name)} />
                        </Form.Item>
                      </Col>
                    </Row>
                  ))}
                  <Row gutter={24}>
                    <Col xl={12} xs={12}>
                      <Form.Item>
                        <Button block type='primary' onClick={() => add()}>
                          Add Item
                        </Button>
                      </Form.Item>
                    </Col>
                    <Col xl={12} xs={12}>
                      <Form.Item>
                        <Button block onClick={() => form.resetFields()}>
                          Clear
                        </Button>
                      </Form.Item>
                    </Col>
                  </Row>
                </>
              )}
            </Form.List>
          </Card>
        </Form>
      </Col>
      <Col xl={12} md={12} xs={24}>
        <Card>
          <Typography.Title>
            Total :{' '}
            {billingInformation
              ?.map(m => m?.price)
              .reduce((a, b) => Number(a) + Number(b), 0) ?? ''}
          </Typography.Title>
        </Card>
      </Col>
    </Row>
  )
}

export default Billing
