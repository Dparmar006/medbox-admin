import { Layout, Row, Menu, Avatar, Divider } from 'antd'
import {
  PieChartOutlined,
  MedicineBoxOutlined,
  ShopOutlined,
  ShoppingCartOutlined
} from '@ant-design/icons'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './BasicLayout.css'

const { Header, Content, Footer, Sider } = Layout
const { SubMenu } = Menu
const BasicLayout = props => {
  const [sidebrCollapsed, setSidebarCollapsed] = useState(true)
  const user = useSelector(state => state.auth)
  const onCollapse = () => {
    setSidebarCollapsed(!sidebrCollapsed)
  }

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
          <Menu.Item key='/my-medicines' icon={<MedicineBoxOutlined />}>
            <Link to='/my-medicines'>My Medicines</Link>
          </Menu.Item>
          <SubMenu key='sub1' icon={<ShopOutlined />} title='Stores'>
            {/* <Menu.Item key={'/stores'}>
              <Link to={'/stores'}>View Stores</Link>
            </Menu.Item> */}
            <Menu.Item key={'/register-store'}>
              <Link to={'/register-store'}>Register Store</Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu key='sub2' icon={<MedicineBoxOutlined />} title='Medicines'>
            {/* <Menu.Item key={'/medicines'}>
              <Link to={'/medicines'}>Medicines</Link>
            </Menu.Item> */}
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
            <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>
              {user?.firstName[0] || 'U'}
            </Avatar>
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
