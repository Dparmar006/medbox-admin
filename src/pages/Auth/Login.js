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
      console.log(res)
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
    <Row align='middle' justify='space-between'>
      <Col span={6} offset={8} style={{ marginTop: '12rem' }}>
        <Card>
          <Form
            name='normal_login'
            className='login-form'
            initialValues={{
              remember: true
            }}
            onFinish={onFinish}
          >
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
            <Form.Item>
              <Form.Item name='remember' valuePropName='checked' noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              {/* <a className='login-form-forgot' href=''>
              Forgot password
            </a> */}
            </Form.Item>

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
          </Form>
        </Card>
      </Col>
    </Row>
  )
}

export default Login
