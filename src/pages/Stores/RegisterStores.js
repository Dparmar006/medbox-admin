import React from 'react'
import { Form, Input, Button, Row, Col, message, Card } from 'antd'
import api from '../../util/api'
import { DEFAULT_GUTTER } from '../../util/constants'

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
    <Card style={{ margin: 'auto' }}>
      <Form name='add-medicine-form' onFinish={onFinish} layout='vertical'>
        <Row
          gutter={DEFAULT_GUTTER}
          style={{ height: '100%' }}
          // justify='space-between'
          // align='middle'
        >
          <Col xl={12} md={24} xs={24}>
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
          <Col xl={12} md={12} xs={24}>
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
          <Col xl={12} md={12} xs={24}>
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
          <Col xl={12} md={12} xs={24}>
            <Form.Item name={['addressLine1']} label='Address Line 1'>
              <Input.TextArea />
            </Form.Item>
          </Col>
          <Col xl={12} md={24} xs={24}>
            <Form.Item name={['addressLine2']} label='Address Line 2'>
              <Input.TextArea />
            </Form.Item>
          </Col>
          <Col xl={12} md={24} xs={24}>
            <Form.Item>
              <Button type='primary' htmlType='submit'>
                Submit
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Card>
  )
}

export default RegisterStores
