import { UserState, userActions } from 'store/UserSlice'
import { selectUserProfile } from 'store/UserSlice/selector'

import React, { useState } from 'react'
import { useMutation } from 'react-query'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import { Avatar, ConfigProvider, Layout, Popover } from 'antd'

import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'

import AdminRoutes from 'routes/Admin'

import { logOut } from 'services/authServices'

import './Admin.scss'
import Footer from './Footer'
import SidebarContent from './SideBarContent'
import logo from '/assets/logo-1.png'

const { Header, Sider, Content } = Layout

ConfigProvider.config({
  theme: {
    primaryColor: '#f7963f',
  },
})

const getContent = (onLogoutHandler: () => void, userData: UserState): JSX.Element => {
  return (
    <div>
      <Link to='/management/edit-account-info/my-account'>
        <p className='my-account'>My Account</p>
      </Link>
      <Link to='/management/edit-account-info/my-profile'>
        <p className='my-account'>My Profile</p>
      </Link>

      {userData.portfolio && (
        <Link target='_blank' to={`/portfolios/${userData.uuid}`}>
          <p className='my-account'>View My Profile</p>
        </Link>
      )}

      <p className='logout' onClick={onLogoutHandler}>
        Logout
      </p>
    </div>
  )
}

const AdminPages: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false)
  const isAuth = localStorage.getItem('access_token')
  const navigate = useNavigate()
  const userData = useSelector(selectUserProfile)

  const logoutMutation = useMutation(logOut)

  if (!isAuth) {
    userActions.userLogOut()
    navigate('/management/login')
  }

  const onLogoutHandler = (): void => {
    logoutMutation.mutate()
    userActions.userLogOut()
    localStorage.clear()
    navigate('/management/login')
  }

  return (
    <Layout className='site-layout'>
      <Header className='site-layout-background'>
        <div className='header-left'>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed),
          })}
          <span className='logo'>
            <Link to='/'>
              <img className='logo-img' src={logo} alt='' srcSet='' />
            </Link>
          </span>
        </div>
        <div className='header-right'>
          <Popover
            placement='bottom'
            content={getContent(onLogoutHandler, userData)}
            trigger='click'
            className='header-avatar'>
            <Avatar size={46} className='avatar' src={userData.avatar}>
              {userData.name.length > 0 && userData.name.charAt(0)}
            </Avatar>
          </Popover>
        </div>
      </Header>
      <Layout style={{ height: '100%' }}>
        <Sider width={280} theme='light' trigger={null} collapsible collapsed={collapsed}>
          <SidebarContent />
        </Sider>
        <Content>
          <AdminRoutes />
        </Content>
      </Layout>
      <Footer />
    </Layout>
  )
}

export default AdminPages
