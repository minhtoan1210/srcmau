import { useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

import { Button, Card, Space, Table, TableColumnsType, TablePaginationConfig } from 'antd'
import Search from 'antd/lib/input/Search'
import { SorterResult } from 'antd/lib/table/interface'

import { PackageType, QueryParamsType } from 'types'

import { EditFilled, EyeOutlined, PlusOutlined } from '@ant-design/icons'

import ConfirmDelete from 'components/ConfirmDeleteButton'

import { deletePackages, getPackages } from 'services/packageServices'

const getColumns = (
  onDeleteHandler: (id?: string) => void,
  isDeleting: boolean
): TableColumnsType<PackageType> => [
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
    title: 'Downloads',
    dataIndex: 'downloads',
  },
  {
    title: 'Action',
    dataIndex: '',
    width: 180,
    fixed: 'right',
    align: 'center',
    render: (_value, record) => {
      const confirmDelete = 'Are you sure you want to delete this package '
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

export default function UserListPage(): JSX.Element {
  const [paramQueryModel, setParamQueryModel] = useState<QueryParamsType>({
    page: 1,
    per_page: 20,
    orderBy: undefined,
    orderDirection: 'desc',
    search: '',
    'searchIn[]': ['name'],
  })

  const { data, isLoading, refetch } = useQuery(['getPackages', paramQueryModel], () =>
    getPackages(paramQueryModel)
  )

  const deletePackagesMutation = useMutation(deletePackages, {
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
      deletePackagesMutation.mutate(id)
    }
  }

  const handleTableChange = (
    pagination: TablePaginationConfig,
    _filters: any,
    sorter: SorterResult<PackageType> | SorterResult<PackageType>[]
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
      title='Packages'
      extra={
        <Space align='center'>
          <Search
            placeholder='input search text'
            allowClear
            enterButton='Search'
            onSearch={onSearch}
          />
          <Link to='add'>
            <Button icon={<PlusOutlined />}>Add Package</Button>
          </Link>
        </Space>
      }>
      <Table
        loading={isLoading}
        rowKey='uuid'
        scroll={{ x: 'max-content' }}
        className='table-striped-rows'
        columns={getColumns(onDeleteHandler, deletePackagesMutation.isLoading)}
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
