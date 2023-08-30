import { useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

import { Button, Card, Space, Table, TableColumnsType, TablePaginationConfig } from 'antd'
import Search from 'antd/lib/input/Search'
import { SorterResult } from 'antd/lib/table/interface'

import { HobbyType, IconType, QueryParamsType } from 'types'

import { CheckCircleTwoTone, EditFilled, EyeOutlined, PlusOutlined } from '@ant-design/icons'

import ConfirmDelete from 'components/ConfirmDeleteButton'

import { deleteHobbies, getHobbies, publishHobby } from 'services/hobbiesServices'

const getColumns = (
  onDeleteHandler: (id?: string) => void,
  isDeleting: boolean,
  publishHobby: (value: boolean, uuid: string | undefined) => void
): TableColumnsType<HobbyType> => [
  {
    title: 'Name',
    dataIndex: 'name',
    sorter: true,
    width: 300,
  },
  {
    title: 'Description',
    dataIndex: 'description',
    sorter: true,
    width: 400,
  },
  {
    title: 'Icon',
    dataIndex: 'icon',
    width: 80,
    align: 'center',
    render(value: IconType) {
      return (
        <span>
          <img width={20} src={`/assets/${value.file_name}`} />
        </span>
      )
    },
  },
  {
    title: 'Publish',
    dataIndex: 'is_published',
    width: 80,
    sorter: true,
    align: 'center',
    render: (value, record) => {
      return (
        <CheckCircleTwoTone
          onClick={() => publishHobby(!value, record.uuid)}
          style={{ cursor: 'pointer' }}
          twoToneColor={value ? '#52c41a' : 'red'}
        />
      )
    },
  },
  {
    title: 'Action',
    dataIndex: '',
    width: 180,
    fixed: 'right',
    align: 'center',
    render: (_value, record) => {
      const confirmDelete = 'Are you sure you want to delete this hobby '
      return (
        <>
          <Link to={`view/${record.uuid}`}>
            <Button type='primary' icon={<EyeOutlined />} />
          </Link>
          <Link style={{ marginLeft: 8 }} to={`edit/${record.uuid}`}>
            <Button type='primary' icon={<EditFilled />} />
          </Link>
          <ConfirmDelete
            loading={isDeleting}
            style={{ marginLeft: 8 }}
            title='Delete'
            message={`${confirmDelete} ${record.name}`}
            onClick={() => onDeleteHandler(record.uuid)}
            useTitle={false}
            isLoading={false}
          />
        </>
      )
    },
  },
]

export default function FileListPage(): JSX.Element {
  const [paramQueryModel, setParamQueryModel] = useState<QueryParamsType>({
    page: 1,
    per_page: 20,
    orderBy: undefined,
    orderDirection: 'desc',
    search: '',
    'searchIn[]': ['name', 'email'],
  })

  const { data, isLoading, refetch } = useQuery(['getHobbies', paramQueryModel], () =>
    getHobbies(paramQueryModel)
  )

  const deleteHobbyMutation = useMutation(deleteHobbies, {
    onSuccess: () => {
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

  const publishHobbyMutation = useMutation(publishHobby, {
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

  const onPublishHobbyHandler = (value: boolean, uuid: string | undefined): void => {
    publishHobbyMutation.mutate({ uuid, publish: value })
  }

  const onDeleteHandler = (id?: string): void => {
    if (id) {
      deleteHobbyMutation.mutate(id)
    }
  }

  const handleTableChange = (
    pagination: TablePaginationConfig,
    _filters: any,
    sorter: SorterResult<HobbyType> | SorterResult<HobbyType>[]
  ): void => {
    if (!Array.isArray(sorter)) {
      setParamQueryModel({
        ...paramQueryModel,
        page: pagination.current || 1,
        per_page: pagination.pageSize || 20,
        orderBy: sorter.order ? `${sorter?.field}` : undefined,
        orderDirection: sorter.order === 'ascend' ? 'asc' : 'desc',
      })
    }
  }

  const onSearch = (value: string): void => {
    setParamQueryModel({ ...paramQueryModel, search: value })
  }

  return (
    <Card
      title='Hobbies'
      extra={
        <Space align='center'>
          <Search
            placeholder='input search text'
            allowClear
            enterButton='Search'
            onSearch={onSearch}
          />
          <Link to='add'>
            <Button icon={<PlusOutlined />}>Add Hobbies</Button>
          </Link>
        </Space>
      }>
      <Table
        loading={isLoading}
        rowKey='uuid'
        scroll={{ x: 'max-content' }}
        className='table-striped-rows'
        columns={getColumns(onDeleteHandler, deleteHobbyMutation.isLoading, onPublishHobbyHandler)}
        dataSource={data?.data.items || []}
        onChange={handleTableChange}
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
