import React from 'react'
import { Form, Input, Button, Row, Col, message, Card } from 'antd'
import api from '../../util/api'

const RegisterStores = () => {
  const [form] = Form.useForm()

  const onFinish = async values => {
    try {
      const res = await api.post('/stores', values)
      if (res.status === 201) {
        message.success(res?.data?.message)
        form.resetFields()
      } else {
        message.success(res?.response?.data?.message)
      }
    } catch (err) {
      message.error(err?.response.message)
    }
  }

  return (
    <Card style={{ width: '80%', margin: 'auto' }}>
      <Form name='add-medicine-form' onFinish={onFinish} layout='vertical'>
        <Row
          gutter={'12'}
          style={{ height: '100%', padding: '2rem' }}
          justify='start'
          align='middle'
        >
          <Col xl={12} md={12} sm={24}>
            <Form.Item
              name={['name']}
              label='Name'
              rules={[
                {
                  required: true
                }
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xl={12} md={12} sm={24}>
            <Form.Item
              name={['city']}
              label='City'
              rules={[
                {
                  required: true
                }
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xl={12} md={12} sm={24}>
            <Form.Item
              name={['landmark']}
              label='Landmark'
              rules={[
                {
                  required: true
                }
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xl={12} md={12} sm={24}>
            <Form.Item name={['addressLine1']} label='Address Line 1'>
              <Input.TextArea />
            </Form.Item>
          </Col>
          <Col xl={12} md={12} sm={24}>
            <Form.Item name={['addressLine2']} label='Address Line 2'>
              <Input.TextArea />
            </Form.Item>
          </Col>
          <Form.Item wrapperCol={{ offset: 8 }}>
            <Button type='primary' htmlType='submit'>
              Submit
            </Button>
          </Form.Item>
        </Row>
      </Form>
    </Card>
  )
}

export default RegisterStores
