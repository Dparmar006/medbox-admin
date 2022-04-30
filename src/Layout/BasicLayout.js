import { Layout, Row, Menu, Avatar } from 'antd'
import {
  PieChartOutlined,
  MedicineBoxOutlined,
  ShopOutlined,
  ShoppingCartOutlined
} from '@ant-design/icons'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './BasicLayout.css'

const { Header, Content, Footer, Sider } = Layout
const { SubMenu } = Menu
const BasicLayout = props => {
  const [sidebrCollapsed, setSidebarCollapsed] = useState(false)
  const user = useSelector(state => state.auth)
  const onCollapse = () => {
    setSidebarCollapsed(!sidebrCollapsed)
  }

  useEffect(() => {
    document.title = props.title + ' | Medbox' || 'Medbox'
    return () => (document.title = 'Loading')
  }, [props.title])

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={sidebrCollapsed} onCollapse={onCollapse}>
        <div className='logo'>
          {sidebrCollapsed ? <h2>MB</h2> : <h2>Medbox</h2>}
        </div>
        <Menu theme='dark' mode='inline'>
          <Menu.Item key='1' icon={<PieChartOutlined />}>
            <Link to={'/'}>Dashboard</Link>
          </Menu.Item>
          <SubMenu key='sub1' icon={<ShopOutlined />} title='Stores'>
            <Menu.Item key='3'>
              <Link to={'/stores'}>View Stores</Link>
            </Menu.Item>
            <Menu.Item key='4'>
              <Link to={'/register-store'}>Register Store</Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu key='sub2' icon={<MedicineBoxOutlined />} title='Medicines'>
            <Menu.Item key='6'>
              <Link to={'/medicines'}>Medicines</Link>
            </Menu.Item>
            <Menu.Item key='8'>
              <Link to={'/add-medicines'}>Add Medicines</Link>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key='9' icon={<ShopOutlined />}>
            <Link to='/my-store'>My Store</Link>
          </Menu.Item>
          <Menu.Item key='10' icon={<MedicineBoxOutlined />}>
            <Link to='/my-medicines'>My Medicines</Link>
          </Menu.Item>
          <Menu.Item key='11' icon={<ShoppingCartOutlined />}>
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
        <Content style={{ margin: '16px 16px' }}>{props.children}</Content>
        <Footer style={{ textAlign: 'center' }}>
          Medbox ©{new Date().getFullYear()} Created by Dixit
        </Footer>
      </Layout>
    </Layout>
  )
}

export default BasicLayout
