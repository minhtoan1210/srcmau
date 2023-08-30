import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

import { Button, Card, Space, Table, TableColumnsType, TablePaginationConfig } from 'antd'
import Search from 'antd/lib/input/Search'
import { SorterResult } from 'antd/lib/table/interface'

import { CheckCircleTwoTone, EditFilled, PlusOutlined } from '@ant-design/icons'

import ConfirmDelete from 'components/ConfirmDeleteButton'

type CoursesTableType = {
  uuid: string
  userName: string
  email: string
  roles: string[]
  extraPermissions: string[]
  isMoodle: boolean
}

const fakeData: CoursesTableType[] = [
  {
    uuid: '1',
    userName: 'userName1',
    email: 'testmail@example.com',
    roles: ['Admin', 'Pro Vip'],
    extraPermissions: ['1', '2'],
    isMoodle: true,
  },
  {
    uuid: '2',
    userName: 'userName2',
    email: 'testmail@example.com',
    roles: [],
    extraPermissions: ['1'],
    isMoodle: true,
  },
  {
    uuid: '3',
    userName: 'userName3',
    email: 'testmail@example.com',
    roles: ['Admin'],
    extraPermissions: [],
    isMoodle: false,
  },
]

const getColumns = (): TableColumnsType<CoursesTableType> => [
  {
    title: 'Name',
    dataIndex: 'userName',
    // sorter: true,
    width: 300,
  },
  {
    title: 'Email',
    dataIndex: 'email',
    // sorter: true,
    render: value => {
      return <a href={`mailto:${value}`}>{value}</a>
    },
  },
  {
    title: 'Roles',
    dataIndex: 'roles',
    // sorter: true,
    render: value => {
      return <>{value.join(', ')}</>
    },
  },
  {
    title: 'Extra Permissions',
    dataIndex: 'extraPermissions',
    render: value => {
      return <>{value.join(', ')}</>
    },
  },
  {
    title: 'Is Moodle',
    dataIndex: 'isMoodle',
    render: value => {
      if (value) {
        return <CheckCircleTwoTone twoToneColor='#52c41a' />
      }
      return <></>
    },
  },
  {
    title: 'Action',
    dataIndex: '',
    width: 180,
    fixed: 'right',
    align: 'center',
    render: (_value, record) => {
      const confirmDelete = 'Are you sure you want to delete this user '
      return (
        <>
          <Link to={`edit/${record.uuid}`}>
            <Button type='primary' icon={<EditFilled />} />
          </Link>
          <ConfirmDelete
            style={{ marginLeft: 8 }}
            title='Delete'
            message={`${confirmDelete} ${record.userName}`}
            onClick={() => toast.success('Deleted')}
            useTitle={false}
            isLoading={false}
          />
        </>
      )
    },
  },
]

export default function UserListPage(): JSX.Element {
  const [paramQueryModel, setParamQueryModel] = useState({
    merchantId: '',
    page: 1,
    limit: 20,
    orderBy: '',
    keyword: '',
  })

  useEffect(() => {
    console.log('paramQueryModel', paramQueryModel)
  }, [paramQueryModel])

  const handleTableChange = (
    pagination: TablePaginationConfig,
    _filters: any,
    sorter: SorterResult<CoursesTableType> | SorterResult<CoursesTableType>[]
  ): void => {
    if (!Array.isArray(sorter)) {
      setParamQueryModel({
        ...paramQueryModel,
        page: pagination.current || 1,
        limit: pagination.pageSize || 25,
        orderBy: sorter.order
          ? `${sorter?.field} ${sorter.order === 'ascend' ? 'asc' : 'desc'}`
          : '',
      })
    }
  }

  const onSearch = (value: string): void => {
    setParamQueryModel({ ...paramQueryModel, keyword: value })
  }

  return (
    <Card
      title='Courses'
      extra={
        <Space align='center'>
          <Search
            placeholder='input search text'
            allowClear
            enterButton='Search'
            onSearch={onSearch}
          />
          <Link to='add'>
            <Button icon={<PlusOutlined />}>Add Course</Button>
          </Link>
        </Space>
      }>
      <Table
        rowKey='uuid'
        scroll={{ x: 'max-content' }}
        className='table-striped-rows'
        columns={getColumns()}
        dataSource={fakeData}
        onChange={handleTableChange}
        pagination={{
          showSizeChanger: true,
          current: paramQueryModel.page,
          pageSize: paramQueryModel.limit,
          total: fakeData.length,
          showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
        }}
      />
    </Card>
  )
}
