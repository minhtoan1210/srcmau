import { useState } from 'react'
import { UseMutationResult, useMutation, useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

import { Button, Card, Space, Table, TableColumnsType, TablePaginationConfig } from 'antd'
import Search from 'antd/lib/input/Search'
import { SorterResult } from 'antd/lib/table/interface'

import { forEach } from 'lodash'

import { QueryParamsType, TitleAuthType, TitleType } from 'types'

import { CheckCircleTwoTone, EditFilled, PlusOutlined } from '@ant-design/icons'

import ConfirmDelete from 'components/ConfirmDeleteButton'

import { deleteTitle, getTitles, updateTitle } from 'services/titleServices'

const getColumns = (
  updateTitleMutation: UseMutationResult<any, unknown, any, unknown>,
  deleteTitleMutation: UseMutationResult<any, unknown, string, unknown>
): TableColumnsType<TitleType> => [
  {
    title: 'Name',
    dataIndex: 'name',
    width:300,
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
          onClick={() => updateTitleMutation.mutate({ ...record, is_published: !value })}
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
      const confirmDelete = 'Are you sure you want to delete this title'

      return (
        <>
          <Link style={{ marginLeft: 8 }} to={`edit/${record.uuid}`}>
            <Button type='primary' icon={<EditFilled />} />
          </Link>
          <ConfirmDelete
            style={{ marginLeft: 8 }}
            title='Delete'
            message={`${confirmDelete} ${record.name}`}
            onClick={() => deleteTitleMutation.mutate(record.uuid)}
            useTitle={false}
            isLoading={deleteTitleMutation.isLoading}
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

  const { data, isLoading, refetch } = useQuery(['getTitles', paramQueryModel], () =>
    getTitles(paramQueryModel)
  )

  const updateTitleMutation = useMutation(updateTitle, {
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

  const deleteTitleMutation = useMutation(deleteTitle, {
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

  const handleTableChange = (
    pagination: TablePaginationConfig,
    _filters: any,
    sorter: SorterResult<TitleType> | SorterResult<TitleType>[]
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
      title='Titles'
      extra={
        <Space align='center'>
          <Search
            placeholder='input search text'
            allowClear
            enterButton='Search'
            onSearch={onSearch}
          />
          <Link to='add'>
            <Button icon={<PlusOutlined />}>Add Titles</Button>
          </Link>
        </Space>
      }>
      <Table
        loading={isLoading}
        rowKey='uuid'
        scroll={{ x: 'max-content' }}
        className='table-striped-rows'
        columns={getColumns(updateTitleMutation, deleteTitleMutation)}
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
