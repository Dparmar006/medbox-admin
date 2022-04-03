import React from 'react'
import {
  Form,
  Input,
  InputNumber,
  Button,
  Row,
  Col,
  Space,
  message,
  Card,
  Select,
  DatePicker,
  Divider
} from 'antd'
import BasicLayout from '../../Layout/BasicLayout'
import api from '../../util/api'
import {
  DeleteOutlined,
  MinusCircleOutlined,
  PlusOutlined
} from '@ant-design/icons'

const AddMedicines = () => {
  const [form] = Form.useForm()

  const onFinish = async values => {
    const { medicines } = values

    console.log(values.medicines)
    if (medicines && medicines.length > 0) {
      try {
        const res = await api.post('/medicines', medicines)
        if (res.status === 201) {
          message.success(res?.data?.message)
          form.resetFields()
        } else {
          message.success(res?.response?.data?.message)
        }
      } catch (err) {
        message.error(err?.response.message)
      }
    } else {
      message.error('Please add atleast one medicine.')
    }
  }

  return (
    <Card style={{ margin: 'auto' }}>
      <Form
        name='nest-messages'
        initialValues={{ quantityThreshhold: 20 }}
        onFinish={onFinish}
        layout='vertical'
      >
        <Form.List
          name={'medicines'}
          rules={[
            {
              validator: async (_, medicines) => {
                if (!medicines || medicines.length < 1) {
                  return Promise.reject(
                    new Error('Atlease 1 medicine lot should be added.')
                  )
                }
              }
            }
          ]}
        >
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...rest }) => (
                <>
                  <Divider orientation='left'>
                    {key + 1}
                    {'  '}
                    <DeleteOutlined color='red' onClick={() => remove(name)} />
                  </Divider>
                  <Row gutter={24}>
                    <Col md={12} xs={24} xl={12}>
                      <Form.Item
                        {...rest}
                        name={[name, 'name']}
                        rules={[
                          {
                            required: true,
                            message: 'Missing the name of the medicine'
                          }
                        ]}
                      >
                        <Input placeholder='Medicine name' />
                      </Form.Item>
                    </Col>
                    <Col md={12} xs={24} xl={12}>
                      <Form.Item
                        {...rest}
                        name={[name, 'brandName']}
                        rules={[
                          {
                            required: true,
                            message: 'Missing the brand name'
                          }
                        ]}
                      >
                        <Input placeholder='Brand name' />
                      </Form.Item>
                    </Col>
                    <Col md={12} xs={24} xl={12}>
                      <Form.Item
                        {...rest}
                        name={[name, 'price']}
                        rules={[
                          {
                            required: true,
                            message: 'Missing the price (single unit)'
                          }
                          // {
                          //   type: 'integer',
                          //   message: 'Please enter valid price.'
                          // }
                        ]}
                      >
                        <Input
                          placeholder='Price'
                          type='number'
                          suffix=' Rs. Per unit'
                          min={1}
                        />
                      </Form.Item>
                    </Col>
                    <Col md={12} xs={24} xl={12}>
                      <Form.Item
                        {...rest}
                        name={[name, 'unit']}
                        rules={[
                          {
                            required: true,
                            message: 'Missing the unit of the medicine'
                          }
                        ]}
                      >
                        <Select placeholder='The unit in which you imported'>
                          <Select.Option value='boxes'>Boxes</Select.Option>
                          <Select.Option value='bottles'>Bottles</Select.Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col md={12} xs={24} xl={8}>
                      <Form.Item
                        {...rest}
                        rules={[
                          {
                            required: true,
                            message: 'Enter the number of quantities imported.'
                          }
                        ]}
                        name={[name, 'quantityImported']}
                      >
                        <Input type='number' placeholder='Quantity imported' />
                      </Form.Item>
                    </Col>
                    <Col md={12} xs={24} xl={8}>
                      <Form.Item {...rest} name={[name, 'quantityAvailable']}>
                        <Input type='number' placeholder='Quantity available' />
                      </Form.Item>
                    </Col>
                    <Col md={12} xs={24} xl={8}>
                      <Form.Item {...rest} name={[name, 'quantityThreshhold']}>
                        <Input
                          type='number'
                          addonBefore='alert me before'
                          addonAfter='units left'
                          placeholder='Quantity'
                        />
                      </Form.Item>
                    </Col>
                    <Col md={12} xs={24} xl={8}>
                      <Form.Item {...rest} name={[name, 'mfgDate']}>
                        <DatePicker
                          style={{ width: '100%' }}
                          placeholder='Manufacturing Date'
                        />
                      </Form.Item>
                    </Col>
                    <Col md={12} xs={24} xl={8}>
                      <Form.Item
                        rules={[
                          {
                            required: true,
                            message: 'Please enter expiration date.'
                          }
                        ]}
                        {...rest}
                        name={[name, 'expDate']}
                      >
                        <DatePicker
                          style={{ width: '100%' }}
                          placeholder='Expiration date'
                        />
                      </Form.Item>
                    </Col>
                    <Col md={12} xs={24} xl={8}>
                      <Form.Item
                        {...rest}
                        help='Days before our system will remind you about stock.'
                        rules={[
                          {
                            required: true,
                            message: 'Please enter expiration date.'
                          }
                        ]}
                        name={[name, 'dateThreshhold']}
                      >
                        <Input
                          type='number'
                          placeholder='Enter number of days'
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </>
              ))}
              <Row gutter={24} style={{ marginTop: '1rem' }}>
                <Col xl={12} md={24} xs={24}>
                  <Form.Item>
                    <Button
                      type='dashed'
                      onClick={() => add()}
                      block
                      icon={<PlusOutlined />}
                    >
                      Add medicine
                    </Button>
                  </Form.Item>
                </Col>

                <Col xl={12} md={24} xs={24}>
                  <Form.Item>
                    <Button block type='primary' htmlType='submit'>
                      Submit
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </>
          )}
        </Form.List>
      </Form>
    </Card>
  )
}

export default AddMedicines