import { useState } from 'react'
import { UseMutationResult, useMutation, useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

import {
  Button,
  Card,
  Checkbox,
  Space,
  Table,
  TableColumnsType,
  TablePaginationConfig,
  Tooltip,
} from 'antd'
import { CheckboxChangeEvent } from 'antd/es/checkbox/Checkbox'
import Search from 'antd/lib/input/Search'
import { SorterResult } from 'antd/lib/table/interface'

import { FilterType, QueryParamsType, RoleType, SkillType, TitleType } from 'types'

import {
  CheckCircleTwoTone,
  EditFilled,
  EyeOutlined,
  HistoryOutlined,
  PlusOutlined,
} from '@ant-design/icons'

import ConfirmDelete from 'components/ConfirmDeleteButton'

import { deleteUser, updatePassword } from 'services/authServices'
import { getRoles } from 'services/systemServices'
import { getUsers } from 'services/userServices'

type UserTableType = {
  uuid: string
  name: string
  email: string
  roles: RoleType[]
  skills: SkillType[]
  portfolio: boolean
  title: string | null
}

const getColumns = (
  publishUser: (value: boolean, uuid: string) => void,
  deleteUserMutation: UseMutationResult<any, unknown, string, unknown>,
  filterRoles: FilterType[]
): TableColumnsType<UserTableType> => [
  {
    title: 'Name',
    dataIndex: 'name',
    sorter: true,
    width: 300,
  },
  {
    title: 'Email',
    dataIndex: 'email',
    width: 400,
    sorter: true,
    render: value => {
      return <a href={`mailto:${value}`}>{value}</a>
    },
  },
  {
    title: 'Title',
    dataIndex: 'title',
    width: 300,
    render(value: TitleType) {
      return value?.name
    },
  },
  {
    title: 'Portfolio',
    dataIndex: 'portfolio',
    width: 80,
    sorter: true,
    align: 'center',
    render: (value, record) => {
      return (
        <CheckCircleTwoTone
          onClick={() => publishUser(!value, record.uuid)}
          style={{ cursor: 'pointer' }}
          twoToneColor={value ? '#52c41a' : 'red'}
        />
      )
    },
  },
  {
    title: 'Roles',
    dataIndex: 'roles',
    width: 280,
    filters: filterRoles,
    filterMultiple: true,
    render: (value: RoleType[]) => {
      const roleNames = value.map(x => x.name)

      return roleNames.join(', ')
    },
  },
  {
    title: 'Action',
    dataIndex: '',
    width: 200,
    fixed: 'right',
    align: 'center',
    render: (_value, record) => {
      const confirmDelete = 'Are you sure you want to delete this user '
      return (
        <>
          <Space>
            <Tooltip title='Marking'>
              <Link to={`grade/${record.uuid}`}>
                <Button type='primary' icon={<img src='/assets/exam.png' alt='' width={16} />} />
              </Link>
            </Tooltip>
            <Tooltip title='Events history'>
              <Link to={`view/${record.uuid}`}>
                <Button type='primary' icon={<HistoryOutlined />} />
              </Link>
            </Tooltip>
            <Tooltip title='View portfolios'>
              <Link target='_blank' to={`/portfolios/${record.uuid}`}>
                <Button type='primary' icon={<EyeOutlined />} />
              </Link>
            </Tooltip>
            <Tooltip title='Edit'>
              <Link to={`edit/${record.uuid}`}>
                <Button type='primary' icon={<EditFilled />} />
              </Link>
            </Tooltip>
            <ConfirmDelete
              title='Delete'
              message={`${confirmDelete} ${record.name}`}
              loading={deleteUserMutation.isLoading}
              onClick={() => deleteUserMutation.mutate(record.uuid)}
              useTitle={false}
              isLoading={false}
            />
          </Space>
        </>
      )
    },
  },
]

export default function UserListPage(): JSX.Element {
  const [filterRoles, setFilterRoles] = useState<FilterType[]>([])
  const [paramQueryModel, setParamQueryModel] = useState<QueryParamsType>({
    page: 1,
    per_page: 20,
    orderBy: undefined,
    orderDirection: 'desc',
    search: '',
    'searchIn[]': ['name', 'email'],
    whereNotNull: undefined,
  })

  const { data, isLoading, refetch } = useQuery(['getUsers', paramQueryModel], () =>
    getUsers(paramQueryModel)
  )

  useQuery(['getRoles'], getRoles, {
    onSettled({ data }) {
      if (data) {
        const newFilter: FilterType[] = data.items.map((x: RoleType) => {
          return {
            text: x.name,
            value: x.uuid,
          }
        })

        setFilterRoles(newFilter)
      }
    },
  })

  const updateUserMutation = useMutation(updatePassword, {
    onSuccess: () => {
      toast.success('Updated')
      refetch()
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data.messages.length
          ? error.response?.data.messages[0]
          : 'There are some errors. Please contact Administrator for detail'
      )
    },
  })

  const deleteUserMutation = useMutation(deleteUser, {
    onSuccess() {
      toast.success('Deleted')
      refetch()
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data.messages.length
          ? error.response?.data.messages[0]
          : 'There are some errors. Please contact Administrator for detail'
      )
    },
  })

  const onPublishUserHandler = (value: boolean, uuid: string): void => {
    updateUserMutation.mutate({ uuid, portfolio: value })
  }

  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: any,
    sorter: SorterResult<UserTableType> | SorterResult<UserTableType>[]
  ): void => {
    const roles = filters.roles

    if (!Array.isArray(sorter)) {
      setParamQueryModel({
        ...paramQueryModel,
        page: pagination.current || 1,
        per_page: pagination.pageSize || 20,
        orderBy: sorter.order ? `${sorter?.field}` : undefined,
        orderDirection: sorter.order === 'ascend' ? 'asc' : 'desc',
        'whereHas[roles][uuid]': roles,
      })
    }
  }

  const onSearch = (value: string): void => {
    setParamQueryModel({ ...paramQueryModel, search: value })
  }

  const onCheckModuleHandler = (e: CheckboxChangeEvent): void => {
    if (e.target.checked) {
      setParamQueryModel({ ...paramQueryModel, whereNotNull: 'moodle_user_id' })
    } else {
      setParamQueryModel({ ...paramQueryModel, whereNotNull: undefined })
    }
  }

  return (
    <Card
      title='My Account'
      extra={
        <Space align='center'>
          <Checkbox onChange={onCheckModuleHandler}>Has Moodle</Checkbox>
          <Search
            placeholder='input search text'
            allowClear
            enterButton='Search'
            onSearch={onSearch}
          />
          <Link to='add'>
            <Button icon={<PlusOutlined />}>Add User</Button>
          </Link>
        </Space>
      }>
      <Table
        rowKey='uuid'
        scroll={{ x: 'max-content' }}
        loading={isLoading}
        columns={getColumns(onPublishUserHandler, deleteUserMutation, filterRoles)}
        dataSource={data?.data.items || []}
        className='table-striped-rows'
        onChange={handleTableChange}
        pagination={{
          showSizeChanger: true,
          current: paramQueryModel.page,
          pageSize: paramQueryModel.per_page,
          total: data?.data.total,
          showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
        }}
      />
    </Card>
  )
}
