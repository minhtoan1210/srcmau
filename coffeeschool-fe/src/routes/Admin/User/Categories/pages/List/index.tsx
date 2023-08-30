import { useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

import { Button, Card, Space, Table, TableColumnsType, TablePaginationConfig } from 'antd'
import Search from 'antd/lib/input/Search'
import { SorterResult } from 'antd/lib/table/interface'

import { CategoryType, QueryParamsType } from 'types'

import { CheckCircleTwoTone, EditFilled, EyeOutlined, PlusOutlined } from '@ant-design/icons'

import ConfirmDelete from 'components/ConfirmDeleteButton'

import { deleteCategories, getCategories, publishCategory } from 'services/userServices'

const getColumns = (
  onDeleteHandler: (id?: string) => void,
  publishCategory: (value: boolean, uuid: string | undefined) => void
): TableColumnsType<CategoryType> => [
  {
    title: 'Name',
    dataIndex: 'name',
    sorter: true,
    width: 300,
  },
  {
    title: 'Entity',
    dataIndex: 'entity',
    sorter: true,
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
          onClick={() => publishCategory(!value, record.uuid)}
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
      const confirmDelete = 'Are you sure you want to delete this user '
      return (
        <>
          <Link to={`view/${record.uuid}`}>
            <Button type='primary' icon={<EyeOutlined />} />
          </Link>
          <Link style={{ marginLeft: 8 }} to={`edit/${record.uuid}`}>
            <Button type='primary' icon={<EditFilled />} />
          </Link>
          <ConfirmDelete
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
    'searchIn[]': ['name'],
  })

  const { data, isLoading, refetch } = useQuery(['getCategories', paramQueryModel], () =>
    getCategories(paramQueryModel)
  )

  const deleteMutation = useMutation(deleteCategories, {
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

  const publishCategoryMutation = useMutation(publishCategory, {
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

  const onPublishCategoryHandler = (value: boolean, uuid: string | undefined): void => {
    publishCategoryMutation.mutate({ uuid, publish: value })
  }

  const onDeleteHandler = (id?: string): void => {
    if (id) {
      deleteMutation.mutate(id)
    }
  }

  const handleTableChange = (
    pagination: TablePaginationConfig,
    _filters: any,
    sorter: SorterResult<CategoryType> | SorterResult<CategoryType>[]
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
      title='Categories'
      extra={
        <Space align='center'>
          <Search
            placeholder='input search text'
            allowClear
            enterButton='Search'
            onSearch={onSearch}
          />
          <Link to='add'>
            <Button icon={<PlusOutlined />}>Add Categories</Button>
          </Link>
        </Space>
      }>
      <Table
        rowKey='uuid'
        scroll={{ x: 'max-content' }}
        columns={getColumns(onDeleteHandler, onPublishCategoryHandler)}
        className='table-striped-rows'
        dataSource={data?.data.items || []}
        onChange={handleTableChange}
        loading={isLoading}
        pagination={{
          showSizeChanger: true,
          current: paramQueryModel.page,
          pageSize: paramQueryModel.per_page,
          total: data?.data.total || 0,
          showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
        }}
      />
    </Card>
  )
}
