import { Layout, Row, Menu, Avatar, Divider, Dropdown } from 'antd'
import {
  PieChartOutlined,
  MedicineBoxOutlined,
  ShopOutlined,
  ShoppingCartOutlined
} from '@ant-design/icons'
import { useSelector } from 'react-redux'
import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './BasicLayout.css'
import { logout } from '../util/funs'

const { Header, Content, Footer, Sider } = Layout
const { SubMenu } = Menu
const BasicLayout = props => {
  const [sidebrCollapsed, setSidebarCollapsed] = useState(true)
  const user = useSelector(state => state.auth)
  const onCollapse = () => {
    setSidebarCollapsed(!sidebrCollapsed)
  }

  const avatarMenu = useMemo(() => {
    return (
      <>
        <Menu>
          <Menu.Item onClick={logout}>Logout</Menu.Item>
        </Menu>
        <Menu
          items={[
            {
              label: (
                <a
                  target='_blank'
                  rel='noopener noreferrer'
                  href='https://www.antgroup.com'
                >
                  1st menu item
                </a>
              )
            },
            {
              label: (
                <a
                  target='_blank'
                  rel='noopener noreferrer'
                  href='https://www.aliyun.com'
                >
                  2nd menu item
                </a>
              )
            },
            {
              label: (
                <a
                  target='_blank'
                  rel='noopener noreferrer'
                  href='https://www.luohanacademy.com'
                >
                  3rd menu item
                </a>
              )
            }
          ]}
        />
      </>
    )
  }, [])

  useEffect(() => {
    document.title = props.title + ' | Medbox' || 'Medbox'
    return () => (document.title = 'Loading')
  }, [props.title])
  const location = useLocation()
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={sidebrCollapsed} onCollapse={onCollapse}>
        <div className='logo'>
          {sidebrCollapsed ? <h2>MB</h2> : <h2>Medbox</h2>}
        </div>
        <Menu theme='dark' selectedKeys={[location.pathname]} mode='inline'>
          <Menu.Item key='/' icon={<PieChartOutlined />}>
            <Link to={'/'}>Dashboard</Link>
          </Menu.Item>
          <Menu.Item key='/my-store' icon={<ShopOutlined />}>
            <Link to='/my-store'>My Store</Link>
          </Menu.Item>
          {/* <SubMenu key='sub1' icon={<ShopOutlined />} title='Stores'>
            <Menu.Item key={'/register-store'}>
              <Link to={'/register-store'}>Register Store</Link>
            </Menu.Item>
          </SubMenu> */}
          <SubMenu key='sub2' icon={<MedicineBoxOutlined />} title='Medicines'>        
            <Menu.Item key='/my-medicines'>
            <Link to='/my-medicines'>My Medicines</Link>
          </Menu.Item>
          <Menu.Item key={'/add-medicines'}>
              <Link to={'/add-medicines'}>Add Medicines</Link>
            </Menu.Item>
          </SubMenu>

          <Menu.Item key='/billing' icon={<ShoppingCartOutlined />}>
            <Link to='/billing'>Billing</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className='site-layout'>
        <Header
          className='site-layout-background'
          style={{ padding: '0 1rem' }}
        >
          <Row justify='end' align='middle' style={{ height: '100%' }}>
            <Dropdown overlay={avatarMenu} placement='bottomLeft' arrow>
              <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>
                {user ? user?.firstName?.[0] : 'U'}
              </Avatar>
            </Dropdown>
          </Row>
        </Header>
        <Content
          style={{
            margin: '.5rem',
            height: 'calc(100vh - 6rem)',
            overflowY: 'auto',
            overflowX: 'hidden'
          }}
        >
          {props.children}
        </Content>
        {/* <Footer style={{ textAlign: 'center' }}>
          Medbox ©{new Date().getFullYear()} Created by Dixit
        </Footer> */}
      </Layout>
    </Layout>
  )
}

export default BasicLayout
