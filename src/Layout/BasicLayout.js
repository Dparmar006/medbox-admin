import { Layout, Menu, Breadcrumb, Space, Typography } from 'antd'
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
  MedicineBoxOutlined
} from '@ant-design/icons'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const { Header, Content, Footer, Sider } = Layout
const { SubMenu } = Menu
const { Title } = Typography
const BasicLayout = props => {
  const [sidebrCollapsed, setSidebarCollapsed] = useState(false)

  const onCollapse = () => {
    setSidebarCollapsed(!sidebrCollapsed)
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={sidebrCollapsed} onCollapse={onCollapse}>
        <div className='logo'>
          <Title level={2} type='secondary'>
            Medbox
          </Title>
        </div>
        <Menu theme='dark' defaultSelectedKeys={['1']} mode='inline'>
          <Menu.Item key='1' icon={<PieChartOutlined />}>
            <Link to={'/'}>Dashboard</Link>
          </Menu.Item>
          <Menu.Item key='2' icon={<DesktopOutlined />}>
            <Link to={'/medicines'}>Medicines</Link>
          </Menu.Item>
          <SubMenu key='sub1' icon={<UserOutlined />} title='Stores'>
            <Menu.Item key='3'>
              <Link to={'/stores'}>View Stores</Link>
            </Menu.Item>
            <Menu.Item key='4'>
              <Link to={'/stores/register-store'}>Register Store</Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu key='sub2' icon={<TeamOutlined />} title='Team'>
            <Menu.Item key='6'>Team 1</Menu.Item>
            <Menu.Item key='8'>Team 2</Menu.Item>
          </SubMenu>
          <Menu.Item key='9' icon={<FileOutlined />}>
            My Store
          </Menu.Item>
          <Menu.Item key='10' icon={<MedicineBoxOutlined />}>
            <Link to='/my-medicines'>My Medicines</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className='site-layout'>
        <Header className='site-layout-background' style={{ padding: 0 }} />
        <Content style={{ margin: '0 16px' }}>{props.children}</Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  )
}

export default BasicLayout
