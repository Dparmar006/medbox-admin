import React from 'react'
import { Form, Input, InputNumber, Button, Row, Col } from 'antd'
import BasicLayout from '../../Layout/BasicLayout'

const RegisterStores = () => {
  const onFinish = values => {
    console.log(values)
  }
  const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not a valid email!',
      number: '${label} is not a valid number!'
    },
    number: {
      range: '${label} must be between ${min} and ${max}'
    }
  }

  return (
    <BasicLayout>
      <Form
        name='nest-messages'
        onFinish={onFinish}
        validateMessages={validateMessages}
      >
        <Row gutter={24}>
          <Col xl={6} md={12} sm={24}>
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
          <Col xl={6} md={12} sm={24}>
            <Form.Item
              name={['user', 'name']}
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
        </Row>

        <Form.Item
          name={['user', 'email']}
          label='Email'
          rules={[
            {
              type: 'email'
            }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={['user', 'age']}
          label='Age'
          rules={[
            {
              type: 'number',
              min: 0,
              max: 99
            }
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item name={['user', 'website']} label='Website'>
          <Input />
        </Form.Item>
        <Form.Item name={['user', 'introduction']} label='Introduction'>
          <Input.TextArea />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8 }}>
          <Button type='primary' htmlType='submit'>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </BasicLayout>
  )
}

export default RegisterStores
