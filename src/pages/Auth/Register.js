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
import { UserOutlined, LockOutlined, PhoneOutlined } from '@ant-design/icons'
import api, { BASE_URL } from '../../util/api'
import { Link, useNavigate } from 'react-router-dom'
import { DEFAULT_GUTTER } from '../../util/constants'
import axios from 'axios'
import { setUser } from '../../redux/auth'
import { useDispatch } from 'react-redux'
import { setStore } from '../../redux/store/index'

const Register = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const onFinish = async values => {
    try {
      const res = await axios.post(BASE_URL + '/pharmacists', values)
      if (res.status === 201) {
        dispatch(setUser(res?.data?.pharmacist))
        dispatch(setStore(null))
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
      <Card>
        <Form
          // style={{ padding: '2rem' }}
          name='normal_login'
          className='login-form'
          initialValues={{
            remember: true
          }}
          onFinish={onFinish}
        >
          <Row gutter={DEFAULT_GUTTER}>
            <Col xl={12} xs={24}>
              <Form.Item
                name='firstName'
                rules={[
                  {
                    required: true,
                    message: 'Please enter your first name!'
                  }
                ]}
              >
                <Input
                  // prefix={<UserOutlined className='site-form-item-icon' />}
                  placeholder='First name'
                />
              </Form.Item>
            </Col>
            <Col xl={12} xs={24}>
              <Form.Item
                name='lastName'
                rules={[
                  {
                    required: true,
                    message: 'Please enter your last name!'
                  }
                ]}
              >
                <Input
                  // prefix={<UserOutlined className='site-form-item-icon' />}
                  placeholder='Last name'
                />
              </Form.Item>
            </Col>
            <Col xl={12} xs={24}>
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
            <Col xl={12} xs={24}>
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
            </Col>{' '}
            <Col xl={12} xs={24}>
              <Form.Item
                name='phoneNumber'
                rules={[
                  {
                    required: false,
                    message: 'Please enter your Phone!'
                  }
                ]}
              >
                <Input
                  prefix={<PhoneOutlined className='site-form-item-icon' />}
                  type='phone'
                  placeholder='Phone (Optional)'
                />
              </Form.Item>
            </Col>
            <Col xl={12} xs={24}>
              <Form.Item>
                <Form.Item name='remember' valuePropName='checked' noStyle>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>

                {/* <a className='login-form-forgot' href=''>
              Forgot password
            </a> */}
              </Form.Item>
            </Col>
            <Col xl={12} xs={24}>
              <Form.Item>
                <Space>
                  <Button
                    type='primary'
                    htmlType='submit'
                    className='login-form-button'
                  >
                    Register
                  </Button>
                  Or <Link to='/login'> Login!</Link>
                </Space>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
    </Row>
  )
}

export default Register
