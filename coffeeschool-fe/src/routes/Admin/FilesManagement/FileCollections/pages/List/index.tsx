import { useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

import { Button, Card, Space, Table, TableColumnsType, TablePaginationConfig } from 'antd'
import Search from 'antd/lib/input/Search'
import { SorterResult } from 'antd/lib/table/interface'

import { FileCollectionTableType, QueryParamsType } from 'types'

import { EditFilled, PlusOutlined } from '@ant-design/icons'

import ConfirmDelete from 'components/ConfirmDeleteButton'

import { deleteFileCollection, getFileCollections } from 'services/userServices'

const getColumns = (
  onDeleteHandler: (id?: string) => void,
  isDeleting: boolean
): TableColumnsType<FileCollectionTableType> => [
  {
    title: 'Name',
    dataIndex: 'name',
    sorter: true,
    width: 300,
  },
  {
    title: 'Action',
    dataIndex: '',
    width: 180,
    fixed: 'right',
    align: 'center',
    render: (_value, record) => {
      const confirmDelete = 'Are you sure you want to delete this file collection'
      return (
        <>
          <Link to={`edit/${record.uuid}`}>
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

export default function FileCollectionsListPage(): JSX.Element {
  const [paramQueryModel, setParamQueryModel] = useState<QueryParamsType>({
    page: 1,
    per_page: 20,
    orderBy: undefined,
    orderDirection: 'desc',
    search: '',
    'searchIn[]': ['name'],
  })

  const { data, isLoading, refetch } = useQuery(['getFileCollections', paramQueryModel], () =>
    getFileCollections(paramQueryModel)
  )

  const deleteFileCollectionMutation = useMutation(deleteFileCollection, {
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

  const onDeleteHandler = (id?: string): void => {
    if (id) {
      deleteFileCollectionMutation.mutate(id)
    }
  }

  const handleTableChange = (
    pagination: TablePaginationConfig,
    _filters: any,
    sorter: SorterResult<FileCollectionTableType> | SorterResult<FileCollectionTableType>[]
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
      title='Files'
      extra={
        <Space align='center'>
          <Search
            placeholder='input search text'
            allowClear
            enterButton='Search'
            onSearch={onSearch}
          />
          <Link to='add'>
            <Button icon={<PlusOutlined />}>Add File Collection</Button>
          </Link>
        </Space>
      }>
      <Table
        className='table-striped-rows'
        loading={isLoading}
        rowKey='uuid'
        scroll={{ x: 'max-content' }}
        columns={getColumns(onDeleteHandler, deleteFileCollectionMutation.isLoading)}
        dataSource={data?.data.items}
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
