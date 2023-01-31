import { MinusCircleOutlined } from '@ant-design/icons'
import {
  Button,
  Card,
  Col,
  Divider,
  Form,
  Input,
  message,
  Row,
  Select,
  Table,
  Typography
} from 'antd'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import api from '../../util/api'
import { DEFAULT_GUTTER } from '../../util/constants'
import { displayDate } from '../../util/funs'

const Billing = () => {
  const [billingInformation, setBillingInfomartion] = useState([])
  const [form] = Form.useForm()
  const { list } = useSelector(state => state.medicines)
  const store = useSelector(state => state.store)

  const handleMedicineChange = (_id, key) => {
    let medicine = list?.find(med => med._id === _id)
    const oldMeds = form.getFieldValue('medicines')
    form.setFields({ medicines: (oldMeds[key].price = medicine.price) })
  }
  const handleQuantityChange = (quantity = 1, key) => {
    const oldMeds = form.getFieldValue('medicines')
    const med = oldMeds?.find(med => med?._id === oldMeds[key].name)
    form.setFields({
      medicines: (oldMeds[key].price = med?.price * quantity)
    })
  }
  const handleSubmit = async formData => {
    try {
      let cookedData = []
      if (!formData?.medicines?.length) {
        return message.error('Please add medicines to generate bill.')
      }
      formData?.medicines?.map(med => {
        let medicine = list.find(l => l._id === med.medicine)
        cookedData.push({
          quantity: med.quantity,
          price: med.price,
          medicineId: med.medicine,
          name: medicine.name
        })
      })
      formData.medicines = cookedData
      formData.storeId = store._id

      const res = await api.post('/transactions', formData)
      if (res.status === 201) {
        form.resetFields()
        setBillingInfomartion([])
        return message.info(res.data.message)
      }
      message.error(res.data.message)
    } catch (error) {
      console.log(error)
      return message.error(error?.response?.data?.message || error?.message)
    }
  }

  return (
    <Row gutter={DEFAULT_GUTTER} align='stretch'>
      <Col xl={12} md={12} xs={24}>
        <Form
          form={form}
          layout='vertical'
          autoComplete='off'
          initialValues={{medicines: [{}]}}
          onFinish={handleSubmit}
          onFieldsChange={(e, b) => {
            setBillingInfomartion(form.getFieldsValue())
          }}
        >
          <Card>
            <Row gutter={DEFAULT_GUTTER}>
              <Col xl={12} xs={12}>
                <Form.Item
                  name='name'
                  label='Customer name'
                  rules={[{ required: true }]}
                  help='Full name of the customer'
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
                    <Row gutter={DEFAULT_GUTTER} key={key}>
                      <Col xl={13} xs={8}>
                        <Form.Item
                          {...restField}
                          name={[name, 'medicine']}
                          label='Medicine'
                          rules={[{ required: true }]}
                        >
                          <Select
                            onChange={val => handleMedicineChange(val, key)}
                            showSearch
                          >
                            {list?.map(medicine => (
                              <Select.Option
                                key={medicine._id}
                                value={medicine._id}
                                medicine={medicine}
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
                          validateFirst={true}
                        >
                          <Input
                            type='number'
                            onChange={e =>
                              handleQuantityChange(
                                Number(e?.target?.value),
                                key
                              )
                            }
                          />
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
                  <Row gutter={DEFAULT_GUTTER}>
                    <Col xl={12} xs={12}>
                      <Form.Item>
                        <Button type='dashed' block onClick={() => add()}>
                          Add Item
                        </Button>
                      </Form.Item>
                    </Col>
                    <Col xl={12} xs={12}>
                      <Form.Item>
                        <Button
                          type='dashed'
                          block
                          onClick={() => form.resetFields()}
                        >
                          Clear
                        </Button>
                      </Form.Item>
                    </Col>
                  </Row>
                </>
              )}
            </Form.List>
            <Form.Item>
              <Button block type='primary' htmlType='submit'>
                Generate bill
              </Button>
            </Form.Item>
          </Card>
        </Form>
      </Col>
      <Col xl={12} md={12} xs={24} id='invoice'>
        <Card>
          <Row>
            <Col xl={12} md={12} xs={12}>
              <Typography.Title level={5}>
                {billingInformation.name || 'Customer name'} <br />
                {billingInformation.email || 'Customer email'} <br />
                {displayDate()}
              </Typography.Title>
            </Col>
            <Col xl={12} md={12} xs={12}>
              <Typography.Title level={5}>
                {store.name} <br />
                {`${store.address.landmark}, ${store.address.addressLine1}, ${store.address.addressLine2}, ${store.address.city}`}
              </Typography.Title>
            </Col>
          </Row>
          <Divider />
          <Table
            dataSource={billingInformation.medicines}
            pagination={false}
            columns={[
              {
                title: 'Item',
                dataIndex: 'medicine',
                render: (value) => {
                  let medicine = list?.find(med => med._id === value)
                  return medicine?.name || ''
                },
                width: '50%'
              },
              {
                title: 'Quantity',
                dataIndex: 'quantity'
              },
              {
                title: 'Price',
                dataIndex: 'price',
                render: (value) => {
                  return value || '-'
                },
              }
            ]}
          />
          <div style={{ padding: '.4rem' }} />
          <Typography.Title level={4}>
            Total :{' '}
            {billingInformation?.medicines
              ?.map(m => m?.price)
              .reduce((a, b) => Number(a) + Number(b), 0) || ''}
          </Typography.Title>
        </Card>
      </Col>
    </Row>
  )
}

export default Billing
