import React from 'react'
import {
  Form,
  Input,
  Button,
  Checkbox,
  Card,
  Space,
  Row,
  Col,
  message
} from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import api from '../../util/api'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setUser } from '../../redux/auth'
import { setStore } from '../../redux/store/index'

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const onFinish = async values => {
    try {
      const res = await api.post('/pharmacists/login', values)
      if (res.status === 200) {
        dispatch(setUser(res?.data?.pharmacist))
        dispatch(setStore(res?.data?.store))
        localStorage.setItem('medbox-token', res.data.pharmacist.token)
        return navigate('/')
      }
      message.error(res.data.msg)
    } catch (err) {
      message.error('Email or Password is wrong, Please try again.')
    }
  }

  return (
    <Row justify='center' align='middle' className='full-height'>
      <Form
        name='normal_login'
        className='login-form half-width'
        style={{ padding: '2rem' }}
        initialValues={{
          remember: true
        }}
        onFinish={onFinish}
      >
        <Row>
          <Col xs={24}>
            <Form.Item
              name='email'
              rules={[
                {
                  required: true,
                  message: 'Please enter your email!'
                }
              ]}
            >
              <Input
                prefix={<UserOutlined className='site-form-item-icon' />}
                placeholder='Email'
              />
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item
              name='password'
              rules={[
                {
                  required: true,
                  message: 'Please enter your Password!'
                }
              ]}
            >
              <Input
                prefix={<LockOutlined className='site-form-item-icon' />}
                type='password'
                placeholder='Password'
              />
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item>
              <Form.Item name='remember' valuePropName='checked' noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item>
              <Space>
                <Button
                  type='primary'
                  htmlType='submit'
                  className='login-form-button'
                >
                  Log in
                </Button>
                Or <Link to='/register'> register now!</Link>
              </Space>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Row>
  )
}

export default Login
