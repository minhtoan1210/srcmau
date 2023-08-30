import { selectUserProfile } from 'store/UserSlice/selector'

import { useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { AutoComplete, Button, Card, Space, Table } from 'antd'
import Tooltip from 'antd/es/tooltip'
import Search from 'antd/lib/input/Search'
import { ColumnsType } from 'antd/lib/table'

import { debounce } from 'lodash'

import { PackageType, QueryParamsType } from 'types'

import { ArrowLeftOutlined, PlusOutlined } from '@ant-design/icons'

import { createOrders } from 'services/orderServices'
import { getPackages } from 'services/packageServices'
import { getUsers } from 'services/userServices'

export default function OrderAddPage(): JSX.Element {
  const navigate = useNavigate()
  const { uuid, roles } = useSelector(selectUserProfile)

  const isAdmin = roles.findIndex(x => x.name === 'Super Administrator')

  const [selectedUser, setSelectedUser] = useState('')
  const [paramQueryModel, setParamQueryModel] = useState<QueryParamsType>({
    page: 1,
    per_page: 20,
    orderBy: undefined,
    orderDirection: 'desc',
    search: '',
    'searchIn[]': ['name'],
  })
  const [userQueryParams, setUserQueryParams] = useState({
    'searchIn[]': ['name'],
    search: '',
  })

  const columns: ColumnsType<PackageType> = [
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: true,
      width: 300,
    },
    {
      title: 'Description',
      dataIndex: 'description',
    },
    {
      title: 'Action',
      dataIndex: '',
      width: 180,
      fixed: 'right',
      align: 'center',
      render: (_value, record) => {
        return (
          <Button
            loading={addOrderMutate.isLoading}
            type='primary'
            onClick={() =>
              addOrderMutate.mutate({
                user_uuid: selectedUser || uuid,
                package_uuid: record.uuid,
              })
            }
            icon={<PlusOutlined />}
          />
        )
      },
    },
  ]

  const { data, isLoading } = useQuery(['getPackages', paramQueryModel], () =>
    getPackages(paramQueryModel)
  )

  const { data: usersData } = useQuery(['getListUsers', userQueryParams], () =>
    getUsers(userQueryParams)
  )

  const addOrderMutate = useMutation(createOrders, {
    onSuccess() {
      toast.success('Created order!')
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data.messages.length
          ? error.response?.data.messages[0]
          : 'There are some errors. Please contact Administrator for detail'
      )
    },
  })

  const searchUserDebounce = debounce((value: string) => {
    setUserQueryParams(values => ({ ...values, search: value }))
  }, 300)

  const onSearch = (value: string): void => {
    setParamQueryModel({ ...paramQueryModel, search: value })
  }

  return (
    <Card
      title={
        <>
          <Space>
            <Tooltip title='Go Back'>
              <Button
                style={{ color: 'black' }}
                onClick={() => navigate(-1)}
                type='link'
                icon={<ArrowLeftOutlined />}
              />
            </Tooltip>
          </Space>
          &nbsp; Add Order
        </>
      }
      extra={
        <>
          <Search
            placeholder='input search text'
            allowClear
            enterButton='Search'
            onSearch={onSearch}
          />
        </>
      }>
      {isAdmin >= 0 && (
        <div style={{ display: 'flex', marginBottom: 16 }}>
          <span style={{ display: 'flex', alignItems: 'center', paddingRight: 8 }}>
            Select User:{' '}
          </span>
          <AutoComplete
            onSelect={(_, option) => {
              setSelectedUser(option.userId)
            }}
            placeholder='<< Me >>'
            onSearch={(value: string) => searchUserDebounce(value)}
            options={usersData?.data.items.map((item: any) => ({
              value: item.name,
              label: item.name,
              userId: item.uuid,
            }))}
            style={{ width: 250 }}
          />
        </div>
      )}
      <Table
        loading={isLoading}
        rowKey={record => record.uuid}
        columns={columns}
        dataSource={data?.data.items || []}
        pagination={{
          showSizeChanger: true,
          current: paramQueryModel.page,
          pageSize: paramQueryModel.per_page,
          total: data?.total || 0,
          showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
        }}
      />
    </Card>
  )
}
