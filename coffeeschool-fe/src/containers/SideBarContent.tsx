import { UserState } from 'store/UserSlice'
import { selectUserProfile } from 'store/UserSlice/selector'

import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'

import { Menu } from 'antd'
import type { MenuProps } from 'antd'

import { DashboardOutlined, FileOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons'

type MenuItem = Required<MenuProps>['items'][number]

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group'
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem
}

const getMenuItems = (userData: UserState): MenuProps['items'] => {
  const items: MenuProps['items'] = []
  items.push(
    getItem(
      <Link to='/management'>
        <span>Dashboard</span>
      </Link>,
      '/',
      <DashboardOutlined />
    )
  )

  if (userData.roles.find((x: any) => x.name === 'Super Administrator')) {
    items.push(
      getItem(<span>System</span>, 'system', <UserOutlined />, [
        getItem(
          <Link to='/management/system/roles'>
            <span>Roles</span>
          </Link>,
          'roles'
        ),
        getItem(
          <Link to='/management/system/permissions'>
            <span>Permissions</span>
          </Link>,
          'permissions'
        ),
      ])
    )

    items.push(
      getItem(
        <Link to='/management/users-management'>
          <span>Users Management</span>
        </Link>,
        'users-management',
        <TeamOutlined />
      )
    )

    items.push(
      getItem(<span>User</span>, 'user', <UserOutlined />, [
        getItem(
          <Link to='/management/user/titles'>
            <span>Titles</span>
          </Link>,
          'titles'
        ),
        getItem(
          <Link to='/management/user/categories'>
            <span>Categories</span>
          </Link>,
          'categories'
        ),
        getItem(
          <Link to='/management/user/properties'>
            <span>Properties</span>
          </Link>,
          'properties'
        ),
        getItem(
          <Link to='/management/user/skills'>
            <span>Skills</span>
          </Link>,
          'skills'
        ),
        getItem(
          <Link to='/management/user/hobbies'>
            <span>Hobbies</span>
          </Link>,
          'hobbies'
        ),
        getItem(
          <Link to='/management/user/events'>
            <span>Events</span>
          </Link>,
          'events'
        ),
      ])
    )

    items.push(
      getItem(<span>Files Management</span>, 'files-management', <FileOutlined />, [
        getItem(
          <Link to='/management/files-management/file-collections'>
            <span>File Collections</span>
          </Link>,
          'file-collections'
        ),
        getItem(
          <Link to='/management/files-management/files'>
            <span>Files</span>
          </Link>,
          'files'
        ),
        getItem(
          <Link to='/management/files-management/my-files'>
            <span>My Files</span>
          </Link>,
          'my-files'
        ),
      ])
    )

    items.push(
      getItem(<span>Assignments Management</span>, 'assignments-management', <UserOutlined />, [
        getItem(
          <Link to='/management/assignments-management/assignments'>
            <span>Assignments</span>
          </Link>,
          'assignments'
        ),
        getItem(
          <Link to='/management/assignments-management/assignment-items'>
            <span>Assignment Items</span>
          </Link>,
          'assignment-items'
        ),
        // getItem(
        //   <Link to='/management/assignments-management/courses'>
        //     <span>Courses</span>
        //   </Link>,
        //   'courses'
        // ),
      ])
    )

    items.push(
      getItem(
        <Link to='/management/packages'>
          <span>Packages</span>
        </Link>,
        'packages',
        <UserOutlined />
      )
    )

    items.push(
      getItem(
        <Link to='/management/orders'>
          <span>Orders</span>
        </Link>,
        'orders',
        <UserOutlined />
      )
    )

    items.push(
      getItem(
        <Link to='/management/payment'>
          <span>Payment</span>
        </Link>,
        'Payment',
        <UserOutlined />
      )
    )

    // items.push(
    //   getItem(
    //     <Link to='/management/courses'>
    //       <span>Courses</span>
    //     </Link>,
    //     'courses'
    //   )
    // )
  } else {
    items.push(
      getItem(
        <Link to='/management/edit-account-info/my-profile'>My profile</Link>,
        'my-profile',
        <UserOutlined />
      )
    )

    items.push(
      getItem(
        <Link to='/management/files-management/my-files'>My files</Link>,
        'my-files',
        <FileOutlined />
      )
    )
  }

  return items
}

const listOpenKeys = [
  'users-management',
  'system',
  'user',
  'files-management',
  'assignments-management',
]

function SidebarContent(): JSX.Element {
  const location = useLocation()
  const userData = useSelector(selectUserProfile)

  const selectedKeys = location.pathname.split('/').filter(item => item)

  return (
    <div style={{ height: '100%', overflow: 'hidden', overflowY: 'auto' }}>
      <Menu
        theme='light'
        style={{
          fontStyle: 'normal',
          fontWeight: 400,
          fontSize: '14px',
          lineHeight: '22px',
        }}
        defaultSelectedKeys={selectedKeys}
        selectedKeys={selectedKeys.length > 1 ? selectedKeys : ['/']}
        defaultOpenKeys={listOpenKeys}
        mode='inline'
        items={getMenuItems(userData)}
      />
    </div>
  )
}

export default SidebarContent
